# YouTube detail corrections — 2026-11-04

The preceding layout omitted the right-side menu and comment expander. Avatar
generation also used a grayscale-only palette. Those omissions were not covered
by the earlier checks and are corrected in this change.

## Reference

The user's attached screenshot shows the vertical menu, colored silhouette and
initial avatars, and the Korean expander labels. Direct inspection of the public
YouTube page https://www.youtube.com/watch?v=jNQXAC9IVRw confirmed:

- Menu button: 40×40px; original filled 24×24 SVG, placed at top -12px relative
  to the comment row. Header reserves 32px at right.
- Original SVG path:
  `M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z`.
- Comment expander: `max-number-of-lines="4"` and
  `--ytd-expander-max-lines: 4` on original comment elements.
- Labels: `자세히 알아보기` / `간략히`, Roboto 500 14/20px,
  4px top margin. The inspected dark version uses #aaa text.

## Result and checks

- Theme controls moved into the preview header. Browser checks found zero theme
  buttons inside Design and both buttons above the canvas.
- YouTube uses an interactive DOM preview so clicking the expander actually
  changes the text and image geometry. The selected state is also used for PNGs.
- At 650px, eight explicit text lines produced 650×258 collapsed and 650×338
  expanded images. Clicking again restored the collapsed state. Short two-line
  text hid the button and exported at 650×194.
- PNG sizes were 1300×516, 1300×676, and 1300×388 respectively. Inspected pixels
  confirmed the dark menu dots at the expected right-side position.
- Blue initials (#005c98) and a custom pink (#e91e63) matched exact RGB values in
  exported PNGs. Color, initials and expander state survived reload. Changing the
  username did not change avatar color/style/initials; avatar generation retained
  the username.
- The visible menu opens local editor actions (edit text, copy text); it does not
  send reports or otherwise operate on YouTube. The editor popup is not exported.
- A scaled preview and a resize followed by expander clicks were checked. At a
  381px viewport there was no page horizontal overflow. The theme still worked
  from the preview header while Design was selected. No browser errors reported.

Native SVGs now keep their inline dimensions in interactive previews, avoiding
the editor's global 16px icon rule. Evidence is local in
`.artifacts/youtube-detail-proof/`. This is a verification of these specific
corrections, not a claim of complete parity for every YouTube feature/platform.
