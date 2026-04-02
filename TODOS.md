# TODOS — Space Race Web

## Pre-implementation
- [ ] **Update design doc to match eng review decisions** — The data model (line 89) still says waypoint arrays but should be bezier control points. The share mechanic (line 153) conflates OG route with canvas capture but should describe two separate systems: `/api/og` renders styled HTML cards via @vercel/og Satori, and client-side `canvas.toBlob()` for direct screenshot sharing. Timeline estimate should be updated to 3-4 weeks (review added Zod schemas, full test coverage, instancing, KTX2, URL state sync). Source: eng review Issues #4, #5, outside voice findings #3, #4, #5.

## Post-v1 enhancements
- [ ] **2D CSS/SVG animated timeline as WebGL fallback** — Replace the static screenshot gallery fallback with an interactive 2D timeline that preserves the core scrub-through-time interaction without WebGL. Shows design range in portfolio (both 3D and 2D). Significant work (~1 week). Depends on: core 3D app shipping first. Source: outside voice finding #7.
