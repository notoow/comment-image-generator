# Platform-by-platform audit — 2026-11-04

This supersedes the older estimated layouts where noted below. The scope is a
single desktop-web comment/reply, with generator-controlled outer padding and
image dimensions. It does not claim that every platform feature or browser font
is reproduced, or that every theme/width is pixel-identical.

## Direct source comparison

| Platform | Actual source inspected | Differences corrected / retained measurements |
| --- | --- | --- |
| YouTube | [Public video](https://www.youtube.com/watch?v=jNQXAC9IVRw) | Previously measured 36px avatar, 16px gap, 18px reaction icons, borderless 40px menu button with original 24px SVG. Retained expander and focused-grip fix. |
| Instagram | [Public post](https://www.instagram.com/p/DfPQchkG1tg/) | Current inspected post uses a **separate author/date header**, 600 14/18 author, 32px avatar, **12px** avatar/body gap. Removed the older inline-author/body arrangement and footer date. Retained original 12px heart. This updates the previous 13px / 18px-gap reference. Zero likes omit the likes label. |
| TikTok | [Public video](https://www.tiktok.com/@7485926283646583825/video/7651784993462832404) | Current web sidebar: **32px** avatar, **8px** gap, author 500 13/16.9, header 21px, body 478 15/22.5 with 6px gap, date/reply footer after 6px. Heart/count are **horizontal at the bottom right**, not a vertical column beside the body. Added original horizontal menu and heart vectors (48-unit viewBox; displayed 14/20px). The earlier 40px screenshot reference is superseded for this client. |
| Reddit | [Current public thread](https://www.reddit.com/r/blenderhelp/comments/1xnmz2y/how_can_i_link_all_bones_into_a_mesh_without_them/) | 32px avatar with 4px top offset; header 36px and author 700 12/16; body begins 40px from avatar left and below the header. Replaced upvote, downvote, reply, award, share and overflow with original 20-unit filled vectors displayed at 16px. Button padding and vote cells replace arbitrary icon gaps. |
| X | [NASA thread and public reply](https://x.com/NASA/status/2117633046002225363) | 40px avatar, **8px** gap, 15/20 text, 2px header/body gap, 12px action-row margin. Replaced all six action vectors and overflow from the actual reply; action SVGs measure **18.75px**. Preserve name space before truncating handle/date. |
| Facebook | [Public page with visible comments](https://www.facebook.com/facebook/) | Confirmed 32px avatar, 6px gap, 18px bubble radius, #f0f2f5 light bubble, 600 12px author, 12px inner horizontal inset. Replaced the reconstructed blue thumb with the original gradient reaction SVG; count precedes the icon. Kept the reaction badge inside the available width. The source session was logged out: available footer actions differ from signed-in comments. |
| Bilibili | [Public video](https://www.bilibili.com/video/BV15NaG63Emz/) | Shadow-DOM inspection: **48px** avatar, 12px gap, 30px author header, 4px content gap, **16/26px** body; footer 13/19.5, 20px action gaps, 16px original thumb-up/down and **vertical** overflow vectors. Removed the 40px avatar, generic thumbs and horizontal menu. Optional level/badge/image attachments are not part of the current editor model. |
| Weibo | [Public post with comments](https://weibo.com/7950798797/RpPc4cQbO) | 30px avatar, 10px gap, content offset -2px, **13/22px** inline name/body, footer 1px top margin. Removed fake vertical separators/text report control. Copied the actual like vector and converted the displayed `woo` report/translate/repost/comment glyph outlines to SVG. Controls align right in 32px cells. |
| Xiaohongshu | [Public note](https://www.xiaohongshu.com/explore/6a8cdaf1000000001702eedb) | 40px avatar, 12px gap; author **14/18px**, 20px header, body **14/19.6px**, 4px body gap, 12/16 date with 8px top margin. Added actual overflow; replaced heart/reply with original sprite vectors at 16px. Reduced excessive reaction spacing. |
| Futaba / 2chan | [Actual home-appliance board](https://dat.2chan.net/48/futaba.htm) | Actual reply table: **ellipsis** marker, #f0e0d6 reply cell, #800000 text, 16px body, 1px/8px cell padding, blockquote margin **16px 40px**. Added reply ordinal, red title, Name label and green nickname; removed the invented `del` label. No avatar. Reply ordinal and No. are separate fields. Japanese fallback font depends on the machine. |
| 5ch | [Actual thread](https://asahi.5ch.io/test/read.cgi/newsplus/1793794012) | Current 5ch destination redirects from .net to .io. No avatar or invented disclosure triangle. Header **12/19.2px**, date **10.8px**, right-side **12px ID**, body **16/25.6px**, row padding **8px 3.2px**. Added the visible account-tool labels and separate editable author ID. |
| DC Inside | [Actual thread](https://gall.dcinside.com/board/view/?id=dcbest&no=475173) | Reconfirmed 152px nickname column, 33px gap, body 13/20, row padding 9px 3px 7px, date 12px. Corrected nickname from 12px to **13px**. No avatar. |

The native source paths are bundled in `native-icons.js`; Facebook's original
reaction is `assets/facebook-like.svg`. The editor chrome still uses Lucide.
Source vectors are scoped by platform; one common heart/thumb is no longer used
for the inspected clients above.

## Screenshot comparison follow-up — 2026-11-05

Baidu, Threads and Douyin blocked direct DOM inspection during the first pass.
They have now been compared with actual desktop comment screenshots found through
image search. See [capture comparison](capture-comparison.md) for accepted sources,
versions, corrections and limits. `capture-icons.js` contains their screenshot-traced
outlines, explicitly distinguished from the source DOM vectors in `native-icons.js`.
The app now identifies these as screenshot comparisons. They remain **not DOM-measured**.

## Narrow-width behavior

Source sites size comments inside their own page/sidebar and may enforce minimum
page widths. A 240px exported card is not necessarily an original mobile client.
The generator therefore needs explicit adaptations for widths smaller than the
source container:

- Long names truncate only in headers that have fixed menu slots (TikTok, X,
  Xiaohongshu); comment text reflows rather than stretching.
- X action gaps compact so ordinary counts keep all six actions on one line.
- Reddit hides secondary award/share actions in small cards, compacts padding,
  and keeps essential voting/reply/menu controls. Its source has viewport-based
  visibility rules; the generator uses card width instead.
- Reconstructed Threads/Douyin action gaps compact at small widths.
- Futaba blockquote inset shrinks only when the original 40px margins would
  leave an unusable column. DC's narrow two-row adaptation now also allows the
  date to wrap. Neither is claimed as a measured mobile breakpoint.
- Facebook reaction badges no longer extend outside the bubble/card.
- Extreme custom font/outer-padding combinations may wrap action groups. These
  are generator settings beyond the original clients' normal metrics.

## Verification

`tests/platform-layout.html` runs against the shipped renderer in a browser:

- 15 platforms × 5 widths (240, 261, 320, 480, 960) × 2 themes = 150 cases.
  Long handles, unbroken Latin text, Korean, explicit newlines, compound emoji
  and large reaction counts are included. Descendant bounds are checked, not
  just root scroll width.
- 15 additional cases: 240px, 32px font and 64px horizontal outer padding.
- 9 action-alignment cases: X/Reddit/Threads at 240/261/320px with ordinary
  reaction counts; all action icon centers must share a row. This caught a
  remaining X wrap at 240px and Reddit's detached overflow button. **174 total
  geometry/alignment checks pass.**
- Found and fixed large-font overflow in Reddit's vote group and DC's date.
- 30 light PNGs and 30 dark/zero-reaction PNGs at 261/650px. PNG dimensions are
  checked at 2×. The native vectors render into exported PNGs.
- Actual editor: TikTok platform switch, text editing, automatic height,
  keyboard edge resizing and PNG download were exercised.
- Final public-image inspection caught a TikTok export-only overlap: the
  flex/auto-margin heart moved below its measured DOM position in raster output.
  Replaced that footer with explicit grid columns and added SVG width/height
  attributes. The PNG check now samples the **measured heart rectangle** and
  fails if it contains no icon pixels. This checks the rendered image, rather
  than relying only on DOM bounds. Oversized custom text uses a stacked footer.

Run a local static server and open `/tests/platform-layout.html`. Source DOM
measurements, PNGs and contact sheets from this audit are ignored local evidence
under `.artifacts/platform-audit/`; no account/session information is shipped.
The checks validate geometry/export behavior and the listed source corrections;
they are **not an all-platform source-versus-output pixel-diff test**. TikTokFont
and TwitterChirp are not bundled; system font substitution can change glyph
widths. Dark variants were export-tested, not all independently source-measured.
