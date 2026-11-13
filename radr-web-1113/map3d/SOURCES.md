# RADR map sources

The driving map is a MapLibre style. Android and iOS use MapLibre Native.
The web app uses maplibre-gl. Every source below is free to use in a
commercial app, needs no API key, and is named in the on-map attribution line.

No RADR account is sent with a tile request. A request does reveal the area
on screen to the host that serves it, the same way any map does.

## Vector streets, land, water, and buildings

- Host: OpenFreeMap public instance, `https://tiles.openfreemap.org/planet`
- Style glyphs: `https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf`
- Data: OpenStreetMap, under the Open Database Licence. © OpenStreetMap contributors.
- Schema and tiles: OpenMapTiles, produced for OpenFreeMap. OpenMapTiles code is BSD 3-Clause. © OpenMapTiles.
- Service: OpenFreeMap. The project software is MIT. The public tile service allows commercial use with no API key and no view cap. Attribution is required. https://openfreemap.org/
- Buildings: footprints and heights in the OpenMapTiles `building` layer (`render_height`, `render_min_height`). RADR extrudes them. The extrusion is ours; the footprints are OpenStreetMap.
- Offline packs: OpenFreeMap allows an app to save an area when each download is at most 3,000 tiles or 50 MB, uses at most 4 parallel requests, and sends a User-Agent that names the app. RADR's saved-area downloader does not bulk-fetch this service. It saves the imagery source below, inside the existing 250-tile budget. Streets the driver already viewed stay in MapLibre's own tile cache.

RADR does not use the OpenStreetMap Foundation tile servers (`tile.openstreetmap.org`). Their tile usage policy does not allow an app to use those servers as its basemap.

## Terrain and hillshade

- Host: Mapterhorn, `https://tiles.mapterhorn.com/{z}/{x}/{y}.webp`
- Encoding: Terrarium RGB, tile size 512, maximum zoom 12 in this style. Higher zooms reuse that zoom so a drive does not request a new elevation tile for every street.
- What it is: a digital elevation model. MapLibre draws a hillshade from it on every platform. On the web, maplibre-gl also raises the ground mesh (`terrain` in the style). Released MapLibre Native does not implement that mesh yet (style spec terrain support is still open). Android and iOS therefore drop the `terrain` key and keep the hillshade, the pitched camera, and the extruded buildings. That is real geometry, not a tilted picture of a flat map.
- Licence: Mapterhorn's code is BSD 3-Clause. The global coverage is Copernicus DEM GLO-30, which the European Union licenses free of charge for reproduction, distribution, public communication, and adaptation, including commercial use. Finer national lidar is mixed in where countries publish it. Credit Mapterhorn and those sources: https://mapterhorn.com/attribution
- Shown as: `Terrain © Mapterhorn`

## Satellite imagery

- Host: EOX Sentinel-2 cloudless, `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2021_3857/default/g/{z}/{y}/{x}.jpg`
- Licence: CC BY 4.0. Contains modified Copernicus Sentinel data 2021.
- Credit: Sentinel-2 cloudless by EOX IT Services GmbH (https://s2maps.eu).
- Used for the Satellite and Hybrid basemaps, and for the flat raster fallback when the GL map cannot start or the phone is offline outside MapLibre's cache. It replaces the previous ArcGIS World Imagery URL. Esri's public imagery endpoint is not used, because a commercial app needs an ArcGIS subscription for that service.

RADR does not request OpenTopoMap or memomaps transit rasters. Terrain is the hillshade above. Transit (rail, ferry) is styled from the same OpenMapTiles roads.

## Camera and report locations

Fixed camera locations are still OpenStreetMap data served by RADR's own backend, © OpenStreetMap contributors (ODbL). They are not map tiles.

## Attribution line

The map shows this line, and MapLibre's own attribution control lists the same sources:

© OpenStreetMap contributors · © OpenMapTiles · OpenFreeMap · Terrain © Mapterhorn · Imagery © EOX (Copernicus)

## Placeholder models

`models/car.glb`, `models/detector.glb`, and `models/aircraft.glb` are simple glTF 2.0 meshes with PBR metallic-roughness factors, written by `scripts/make-map-models.py`. TK Hub LLC dedicates them to the public domain under CC0 1.0. See `models/LICENSE.md`.

MapLibre's style spec has no model layer. The web map draws them with a three.js custom layer in the map's GL context. Android draws them with an OpenGL ES 3 overlay matched to the map camera, because a native model layer is not in the released SDK and a second Filament engine would compete with MapLibre for the GPU. iOS draws the same files with SceneKit. Android Auto and CarPlay stay a 2D list and do not host this map.
