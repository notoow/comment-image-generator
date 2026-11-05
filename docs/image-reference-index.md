# Screenshot references inspected — 2026-11-04

Image search supplements direct source inspection. Search descriptions are not
authoritative: inspect the actual image before deciding which client it shows.
These sources establish reference differences; they do not establish pixel parity.
Research captures stay in ignored `.artifacts/image-references/`, not shipped assets.

| Platform | Source page | Observed evidence | Limits |
| --- | --- | --- | --- |
| TikTok | https://www.annahar.com/factcheck/232115/ | Desktop browser, 40px top-level avatar, text starts about 52px from avatar left; author, body, date/reply are separate lines; reply expansion below; nested avatars are smaller. | Image cropped on right: cannot establish heart position or right gutter. Browser scaling/DPR unknown. |
| Douyin | https://blog.csdn.net/leyang0910/article/details/140246167 | Desktop dark video overlay. Author, body, date/region on separate lines. Reply, share, heart/count and broken-heart are in a horizontal action row BELOW body. Nested replies indented. | 2024 capture; exact CSS sizes and current layout require DOM confirmation. Must not reuse TikTok footer. |
| Baidu Tieba | https://greasyfork.org/en/scripts/26316-tieba%E7%99%BE%E5%BA%A6%E8%B4%B4%E5%90%A7%E6%A5%BC%E4%B8%AD%E6%A5%BC-%E5%9B%9E%E5%A4%8D%E6%A5%BC-%E7%9A%84%E6%A5%BC%E4%B8%BB%E6%A0%87%E8%AF%86 | Desktop nested-reply panel: gray background; small avatars; inline blue name and body; date/reply aligned right below. | Userscript adds an OP badge: do NOT copy that badge as native. “来自Android客户端” identifies the POST origin, not the browser displaying it. Screenshot is from 2019. |
| Reddit | https://www.money.it/reddit-cos-e-come-funziona-guida-completa | Current-family desktop dark UI: avatar/header, indented body, horizontal vote/reply/award/share row and thread connectors. | Small screenshot; some names redacted. Not a source for precise dimensions. Original DOM already inspected separately. |
| 5ch | https://note.com/c3974/n/n97e5b8a3e2e6 | Desktop default screenshot: number/name first line, date next line, ID aligned right; body below, no avatar. | Article also contains userscript-modified screenshots. Only the original/default image is a reference. Archive UI may differ from a live thread. |
| Futaba / 2chan | https://gyo.tc/1VeWg | Search found archived original thread page. | Search thumbnails largely show the posting form. Not yet sufficient evidence for reply padding, colors or responsive rules. Do not equate 2chan with 5ch. |

Rejected reference: `tieba-web-2022.png` is a mobile screenshot, despite its filename.
It must not guide the desktop renderer.

## Acceptance before marking a platform matched

1. Identify exact client, theme, capture date and reference width.
2. Verify icon outlines from original DOM/assets, not generic substitutes.
3. Measure avatar, columns, text metrics, action gaps and outer gutters.
4. Compare the same content at matching width; verify long text, explicit newlines,
   zero reactions, large counts, narrow widths and transparency separately.
5. Verify downloaded PNG dimensions and visual output. Different file hashes are
   not evidence of visual fidelity. Screenshot-only estimates remain unverified.


## Follow-up — 2026-11-05

[Detailed comparison and changes](capture-comparison.md) supersede the earlier
incomplete status for Threads, Douyin and Tieba. Accepted sources:

- Threads: [Sendible](https://www.sendible.com/insights/social-media-for-car-dealerships),
  visible May 28, 2025 reply thread; light desktop layout and action outlines.
- Douyin: [CSDN](https://blog.csdn.net/leyang0910/article/details/140246167),
  dark desktop video comment sidebar, with reply/share/heart/broken-heart row.
- Tieba: [3DM](https://www.3dmgame.com/original/3743567.html),
  April 15, 2022 desktop floor and expanded nested replies. This is a different,
  verified desktop image from the rejected mobile image above.

Rejected this pass: a 10100 image showing a Douyin share-recipient popup (not a
comment panel); Sprout's 2023 Threads capture as the primary guide because its
separate reaction summary predates the accepted 2025 layout; app-only screenshots.
The sources establish screenshot-relative shapes/structure, not current DOM metrics.
