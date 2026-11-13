const FEE = 0.08;
const HOUSE = "support.tkhub@gmail.com";
const KEY = "tkhub-portal-v1";

function db() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function save(d) {
  localStorage.setItem(KEY, JSON.stringify(d));
}
function session() {
  return db().session || null;
}
function code6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
async function hash(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function b32(bytes) {
  const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0,
    v = 0,
    o = "";
  for (const b of bytes) {
    v = (v << 8) | b;
    bits += 8;
    while (bits >= 5) {
      o += a[(v >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  return o;
}
function b32dec(s) {
  const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  s = s.toUpperCase().replace(/=+$/, "");
  let bits = 0,
    v = 0;
  const out = [];
  for (const c of s) {
    const i = a.indexOf(c);
    if (i < 0) continue;
    v = (v << 5) | i;
    bits += 5;
    if (bits >= 8) {
      out.push((v >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}
async function totpNow(secret) {
  const key = b32dec(secret);
  const ctr = Math.floor(Date.now() / 30000);
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setUint32(4, ctr);
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, buf));
  const o = sig[sig.length - 1] & 15;
  const bin = ((sig[o] & 127) << 24) | (sig[o + 1] << 16) | (sig[o + 2] << 8) | sig[o + 3];
  return String(bin % 1000000).padStart(6, "0");
}

window.TKPortal = {
  session,
  HOUSE,
  async signup(email, password, name) {
    const d = db();
    d.users = d.users || {};
    email = email.trim().toLowerCase();
    if (d.users[email]) throw new Error("Account exists. Sign in.");
    if (!password || password.length < 8) throw new Error("Password must be 8+.");
    d.users[email] = { email, name: name || email.split("@")[0], hash: await hash(password), phone: "", totp: "", created: Date.now() };
    d.session = email;
    d.orders = d.orders || {};
    d.messages = d.messages || {};
    d.payments = d.payments || {};
    d.requests = d.requests || {};
    d.vault = d.vault || {};
    d.orders[email] = [];
    d.messages[email] = [];
    d.payments[email] = [];
    d.requests[email] = [];
    d.vault[email] = [
      { id: crypto.randomUUID(), kind: "doc", title: "Website spec", body: "Unlocks after the $250 deposit.", price: 25000, unlocked: false },
      { id: crypto.randomUUID(), kind: "app", title: "App spec", body: "Unlocks after the $500 deposit.", price: 50000, unlocked: false },
      { id: crypto.randomUUID(), kind: "site", title: "Dental IT checklist", body: "MB2 floor kit.", price: 15000, unlocked: false },
    ];
    save(d);
    return email;
  },
  async login(email, password) {
    const d = db();
    email = email.trim().toLowerCase();
    const u = (d.users || {})[email];
    if (!u || u.hash !== (await hash(password))) throw new Error("Email or password is wrong.");
    d.session = email;
    save(d);
    return email;
  },
  magicStart(email) {
    const d = db();
    email = email.trim().toLowerCase();
    if (!email) throw new Error("Email required.");
    d.users = d.users || {};
    if (!d.users[email]) d.users[email] = { email, name: email.split("@")[0], hash: "", phone: "", totp: "", created: Date.now() };
    const token = crypto.randomUUID();
    d.magic = d.magic || {};
    d.magic[token] = { email, exp: Date.now() + 15 * 60 * 1000 };
    save(d);
    const link = location.origin + "/tkhub-preview/site-2026-11-13g/login/?magic=" + token;
    return { link, mailto: `mailto:${email}?subject=${encodeURIComponent("TK Hub sign-in link")}&body=${encodeURIComponent("Open this to sign in (15 min): " + link)}` };
  },
  magicConsume(token) {
    const d = db();
    const row = (d.magic || {})[token];
    if (!row || row.exp < Date.now()) throw new Error("Magic link expired.");
    d.session = row.email;
    delete d.magic[token];
    save(d);
    return row.email;
  },
  emailCodeStart(email) {
    const d = db();
    email = email.trim().toLowerCase();
    if (!email) throw new Error("Email required.");
    d.users = d.users || {};
    if (!d.users[email]) d.users[email] = { email, name: email.split("@")[0], hash: "", phone: "", totp: "", created: Date.now() };
    const code = code6();
    d.ecodes = d.ecodes || {};
    d.ecodes[email] = { code, exp: Date.now() + 10 * 60 * 1000 };
    save(d);
    return { code, mailto: `mailto:${email}?subject=${encodeURIComponent("TK Hub code")}&body=${encodeURIComponent("Your code: " + code)}` };
  },
  emailCodeVerify(email, code) {
    const d = db();
    email = email.trim().toLowerCase();
    const row = (d.ecodes || {})[email];
    if (!row || row.exp < Date.now() || row.code !== String(code).trim()) throw new Error("Code is wrong or expired.");
    d.session = email;
    delete d.ecodes[email];
    save(d);
    return email;
  },
  phoneCodeStart(phone) {
    const d = db();
    phone = phone.replace(/\D/g, "");
    if (phone.length < 7) throw new Error("Phone required.");
    const code = code6();
    d.pcodes = d.pcodes || {};
    d.pcodes[phone] = { code, exp: Date.now() + 10 * 60 * 1000 };
    save(d);
    return { code, phone };
  },
  phoneCodeVerify(phone, code) {
    const d = db();
    phone = phone.replace(/\D/g, "");
    const row = (d.pcodes || {})[phone];
    if (!row || row.exp < Date.now() || row.code !== String(code).trim()) throw new Error("Code is wrong or expired.");
    const email = "p" + phone + "@phone.tkhub.app";
    d.users = d.users || {};
    if (!d.users[email]) d.users[email] = { email, name: phone, hash: "", phone, totp: "", created: Date.now() };
    d.session = email;
    delete d.pcodes[phone];
    save(d);
    return email;
  },
  async totpSetup() {
    const e = session();
    if (!e) throw new Error("Sign in first.");
    const d = db();
    const bytes = crypto.getRandomValues(new Uint8Array(20));
    const secret = b32(bytes);
    d.users[e].totp = secret;
    save(d);
    const uri = `otpauth://totp/TKHub:${encodeURIComponent(e)}?secret=${secret}&issuer=TKHub`;
    return { secret, uri };
  },
  async totpVerify(code) {
    const e = session();
    if (!e) throw new Error("Sign in with password first, then MFA.");
    const d = db();
    const secret = d.users[e].totp;
    if (!secret) throw new Error("Enable authenticator first.");
    const now = await totpNow(secret);
    if (String(code).trim() !== now) throw new Error("Authenticator code is wrong.");
    d.mfa = d.mfa || {};
    d.mfa[e] = true;
    save(d);
    return true;
  },
  logout() {
    const d = db();
    d.session = null;
    save(d);
  },
  me() {
    const d = db();
    const e = d.session;
    return e ? d.users[e] : null;
  },
  dump() {
    const e = session();
    if (!e) return null;
    const d = db();
    return {
      user: d.users[e],
      orders: d.orders[e] || [],
      messages: d.messages[e] || [],
      payments: d.payments[e] || [],
      requests: d.requests[e] || [],
      vault: d.vault[e] || [],
    };
  },
  addOrder(row) {
    const e = session();
    if (!e) return;
    const d = db();
    d.orders[e] = d.orders[e] || [];
    d.messages[e] = d.messages[e] || [];
    d.orders[e].unshift(row);
    d.messages[e].unshift({ id: crypto.randomUUID(), kind: "confirmation", subject: "Order received", body: row.job, at: Date.now() });
    save(d);
  },
  addMessage(subject, body, audio) {
    const e = session();
    const d = db();
    d.messages[e] = d.messages[e] || [];
    d.messages[e].unshift({ id: crypto.randomUUID(), kind: "client", subject, body, audio: audio || "", at: Date.now() });
    save(d);
    return `mailto:${HOUSE}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  },
  addPayment(method, amount) {
    const e = session();
    const d = db();
    d.payments[e] = d.payments[e] || [];
    const fee = Math.round(amount * 100 * FEE);
    const total = Math.round(amount * 100) + fee;
    d.payments[e].unshift({ id: crypto.randomUUID(), method, amount_cents: total, fee_cents: fee, status: "pending", at: Date.now() });
    save(d);
    const body = `${method} $${amount.toFixed(2)} + 8% fee $${(fee / 100).toFixed(2)} = $${(total / 100).toFixed(2)}`;
    return `mailto:${HOUSE}?subject=${encodeURIComponent("TK Hub payment")}&body=${encodeURIComponent(body)}`;
  },
  unlock(id) {
    const e = session();
    const d = db();
    const paid = (d.payments[e] || []).some((p) => p.amount_cents >= 15000);
    if (!paid) throw new Error("Pay a deposit first.");
    d.vault[e] = d.vault[e].map((v) => (v.id === id ? { ...v, unlocked: true } : v));
    save(d);
  },
  addRequest(kind, body) {
    const e = session();
    if (!e) return `mailto:${HOUSE}?subject=${encodeURIComponent("TK Hub " + kind)}&body=${encodeURIComponent(body)}`;
    const d = db();
    d.requests[e] = d.requests[e] || [];
    d.messages[e] = d.messages[e] || [];
    d.requests[e].unshift({ id: crypto.randomUUID(), kind, body, at: Date.now() });
    d.messages[e].unshift({ id: crypto.randomUUID(), kind: "request", subject: "Request — " + kind, body, at: Date.now() });
    save(d);
    return `mailto:${HOUSE}?subject=${encodeURIComponent("TK Hub " + kind)}&body=${encodeURIComponent(body)}`;
  },
};
