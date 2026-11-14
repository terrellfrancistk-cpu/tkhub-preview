/**
 * Gateway sign-in shim for the web host.
 *
 * The host injects its own copy of this bootstrap at the start of <head> and
 * asks its auth API for a token immediately. That request fails CORS on every
 * page, including pages that never call the gateway. This file is a blocking
 * script before <head>, so it runs first, sets the install flag, and the host
 * copy returns without fetching.
 *
 * The token is requested only when something actually calls the gateway host,
 * and a failed request resolves to null instead of an unhandled rejection.
 */
(function (scope) {
  if (scope.__rorkToolkitAuthInstalled) return;
  scope.__rorkToolkitAuthInstalled = true;

  var nativeFetch = scope.fetch.bind(scope);
  var NativeWebSocket = scope.WebSocket;
  var authBase = "https://api.rork.com";
  var toolkitBase = new scope.URL("https://toolkit.rork.com/", scope.location.href);
  var toolkitPath = toolkitBase.pathname.replace(/\/$/, "");
  var token = null;
  var expiresAt = 0;
  var pending = null;

  function isToolkitUrl(value) {
    try {
      var url = new scope.URL(
        typeof value === "string" || value instanceof scope.URL ? value : value.url,
        scope.location.href,
      );
      var path = url.pathname.replace(/\/$/, "");
      var secure =
        toolkitBase.protocol === "https:"
          ? url.protocol === "https:" || url.protocol === "wss:"
          : url.protocol === "http:" || url.protocol === "ws:";
      return (
        secure &&
        url.host === toolkitBase.host &&
        (path === toolkitPath || path.indexOf(toolkitPath + "/") === 0)
      );
    } catch (error) {
      return false;
    }
  }

  function remember(payload) {
    if (!payload || typeof payload.token !== "string") return null;
    var parsedExpiry = Date.parse(payload.expires_at);
    expiresAt = Number.isFinite(parsedExpiry)
      ? parsedExpiry
      : Date.now() + Number(payload.expires_in || 600) * 1000;
    token = payload.token;
    return token;
  }

  function getToken() {
    if (token && expiresAt > Date.now() + 60000) return Promise.resolve(token);
    if (pending) return pending;
    pending = nativeFetch(authBase + "/toolkit/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "web" }),
      credentials: "omit",
    })
      .then(function (response) {
        if (!response.ok) return null;
        return response.json().catch(function () {
          return null;
        });
      })
      .then(remember)
      .catch(function () {
        return null;
      })
      .finally(function () {
        pending = null;
      });
    return pending;
  }

  scope.__rorkToolkitAuthReady = Promise.resolve(null);
  scope.__rorkGetToolkitToken = getToken;
  scope.__rorkLoadToolkitModule = function (src) {
    return import(src);
  };

  scope.fetch = function (input, init) {
    if (!isToolkitUrl(input)) return nativeFetch(input, init);
    return getToken().then(function (delegated) {
      if (!delegated) return nativeFetch(input, init);
      var request = input instanceof scope.Request ? input : null;
      var headers = new scope.Headers(
        init && init.headers !== undefined ? init.headers : request ? request.headers : undefined,
      );
      headers.set("Authorization", "Bearer " + delegated);
      var nextInit = Object.assign({}, init || {}, { headers: headers });
      return request ? nativeFetch(new scope.Request(request, nextInit)) : nativeFetch(input, nextInit);
    });
  };

  function replaceProtocols(protocols) {
    if (!token) return protocols;
    function replace(protocol) {
      if (typeof protocol !== "string") return protocol;
      if (protocol.indexOf("rork-toolkit-auth.") === 0) return "rork-toolkit-auth." + token;
      if (protocol.indexOf("ai-gateway-auth.") === 0) return "ai-gateway-auth." + token;
      return protocol;
    }
    return Array.isArray(protocols) ? protocols.map(replace) : replace(protocols);
  }

  function openSocket(url, protocols) {
    return protocols === undefined ? new NativeWebSocket(url) : new NativeWebSocket(url, protocols);
  }

  function ToolkitWebSocket(url, protocols) {
    if (!isToolkitUrl(url)) return openSocket(url, protocols);
    if (!token) {
      getToken().catch(function () {
        return null;
      });
      return openSocket(url, protocols);
    }
    return openSocket(url, replaceProtocols(protocols));
  }
  ToolkitWebSocket.prototype = NativeWebSocket.prototype;
  Object.setPrototypeOf(ToolkitWebSocket, NativeWebSocket);
  scope.WebSocket = ToolkitWebSocket;
})(window);
