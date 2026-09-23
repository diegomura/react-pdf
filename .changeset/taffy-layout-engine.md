---
'@react-pdf/layout': minor
---

Replace the Yoga layout engine with Taffy (`taffy-layout`).

Layout defaults are kept Yoga-compatible (column direction, `align-content: flex-start`, items shrink to 0), so most documents render identically. Notable changes: long texts in row containers no longer overlap, `flex: 1` items inside auto-height columns get their content height instead of collapsing, and images/SVGs without an explicit size inside rows take their intrinsic size instead of the full row width. `position: static` is treated as `relative`. The WASM module is shipped as a separate `.wasm` asset that bundlers must be able to resolve via `new URL(..., import.meta.url)`.
