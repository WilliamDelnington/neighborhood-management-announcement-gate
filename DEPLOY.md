# Publish the announcement gate

Build from the current source with `npm ci && npm run build && npm run lint`.
The build checks that the map's background worker is bundled and referenced.
Do not publish only index.html or the main JavaScript file: the map uses lazy
chunks, CSS, and the generated `maplibre-gl-worker-*.js` asset.

On the current VPS, publish the complete `dist/assets/` folder to
`/var/www/congthongtin-announcement-gate/assets/` before replacing index.html.
Retain previous hashed assets so an already-open browser tab can still load its
map chunk. Keep a copy of the previous index.html for rollback.

The production API URL comes from `.env.production`. The API must include
`GET /api/neighborhoods/public` (with geometry) and `GET /api/pois/public`.
Deploy and health-check the backend before publishing a frontend that needs
new API routes.

The background uses OpenFreeMap by default, with automatic OSM raster failover.
`VITE_MAP_STYLE_URL` can select another MapLibre style at build time. The map
also provides a Google overview fallback if WebGL or the map bundle fails.

The backend's optional `ANNOUNCEMENT_GATE_POI_TYPES` setting controls the subset
of public category chips. Supported keys are restaurant, cafe, gas, school,
market, clinic, pharmacy, bus, atm, hair_salon, park. A blank setting uses the
full curated set. This is independent of internal business-directory categories.
Only verified, non-household POI records inside the ward appear publicly.

After publishing, confirm that the live page and its hashed assets return 200
with the correct content types, that the worker is JavaScript rather than the
SPA fallback HTML, and that neighborhood boundaries and selected POI markers
render. Check a mobile viewport and a category with no verified records too.
