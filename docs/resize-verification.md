# Direct resize verification — 2026-11-04

The eight handles belong to the comment image, not the gray preview stage. The
four sides adjust one dimension, corners adjust both. Width is constrained to
240–1600 layout pixels. Height cannot crop comment content; added height is split
above/below it. Auto height removes the explicit height again.

While captured pointer events update the dimensions, a native DOM preview reflows
immediately without resampling text or avatars. On release the normal 2× PNG
preview is regenerated. The export is built separately, so handles, size tooltip
and the dashed original bounds do not appear in PNGs. Escape/pointer cancellation
restore the original dimensions. Arrow keys also work; Shift changes 10px.

Checks performed:

- Geometry: all eight directions, fixed axis, minimum/maximum width and height,
  zoom conversion, and output-area limits checked with Node assertions.
- Chrome actual mouse drags: right/left, bottom/top and all four corners changed
  the dimensions in the expected directions. For example, 960×194 → 840×194 →
  880×194 → 880×274 → 880×294 → 920×324 → 890×304 → 910×324 → 930×344.
- Export of the resulting 930×344 image measured 1860×688 pixels. Its perimeter
  had no editor selection outline. Width and height survived page reload.
- All 15 platform previews rendered at 720×320 without horizontal overflow.
- At 240px width a requested 64px height grew to the content minimum, and Auto
  height cleared the explicit setting.
- Responsive zoom regression: a scaled preview originally used transformed screen
  bounds for content height. Measurement now uses untransformed computed layout
  height. After correction, a 720×320 image became 671×320 through a horizontal
  drag, then 671×369 through a vertical drag at ~0.411× preview zoom.

Evidence is local under `.artifacts/resize-proof/`. This validates the resize
interaction and output geometry, not source-site pixel parity.
