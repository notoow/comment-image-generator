# Actual comment screenshot comparison — 2026-11-05

Scope: desktop-web Threads reply, Douyin video comment, Baidu Tieba floor and
nested reply. Image-search results were opened and the actual image inspected;
search captions alone were not accepted. Source captures remain in ignored local
research artifacts. No third-party avatar photos or full captures are shipped.

## Accepted sources

| Platform | Page and original image | Client/date evidence | Limits |
| --- | --- | --- | --- |
| Threads | [Sendible article](https://www.sendible.com/insights/social-media-for-car-dealerships), [image](https://www.sendible.com/hs-fs/hubfs/blog-import/2025/07-25-July/social-media-for-car-dealerships-dodge-theads-post.png?height=726&name=social-media-for-car-dealerships-dodge-theads-post.png&width=843) | Light desktop thread, Dodge post and chris_emerson94 reply, dated May 28, 2025. | Capture zoom/DPR unknown; source profile pictures and creator-liked badge are not reproduced. |
| Douyin | [CSDN article](https://blog.csdn.net/leyang0910/article/details/140246167), [image](https://i-blog.csdnimg.cn/blog_migrate/29ffd6a30080fb8805d630aca48ef676.png) | Dark desktop video sidebar: 明非是个小怪兽, AI智能体课程, 刚刚 · 安徽. | Older capture associated with 2024 article; article update/recommendation dates do not make it a 2026 client. Red annotation is excluded. |
| Baidu Tieba | [3DM article](https://www.3dmgame.com/original/3743567.html), [image](https://img.3dmgame.com/uploads/images/news/20220502/1651492825_309487.png) | Desktop thread: square avatar in pale author column, 6楼, dated April 15, 2022; expanded gray nested panel below. | Historical desktop client. Optional author badges, open/closed reply state and multiple replies are not part of the single-comment model. |

## Changes made against the captures

- **Threads:** date beside author, right-aligned horizontal menu, curved heart,
  round reply bubble with bottom-right tail, curved two-arrow repost and paper
  plane. 22px icon boxes, 24px wide-card action gaps and compact 8px gaps; 15/22px
  body. Vertical reply connector under the 36px avatar when replies are present.
- **Douyin:** separate author, body and date/optional region lines; reply, curved
  share, heart/count and broken-heart below. Replaced all four generic outlines;
  dark gray panel, approximately 60% white secondary text; 40px avatar/8px gap,
  16/24px body, 14/22px metadata, 16px icon boxes, 8px action gaps. Narrow cards
  omit reply/share labels so all four icons retain a row at 240/261px. This is a
  generator adaptation, not a measured native breakpoint.
- **Tieba floor:** 130px pale author column, framed square avatar with blue name,
  main-body minimum height and footer report triangle/举报, floor, date and reply;
  removed fake reaction counts. Outer padding remains an editor setting.
- **Tieba nested:** separate selectable 楼中楼 layout, gray panel, 32px square
  avatar, inline blue name/body, right-aligned date/reply and dotted divider.
  The nested form no longer inherits the large floor author sidebar.

The nominal CSS sizes are estimates from image ratios: Threads avatar is about
44 capture pixels (36 CSS at roughly 1.22x); Douyin avatar about60 capture pixels
(40 CSS at roughly1.5x). These are **not source CSS measurements**. Screenshot
outlines were traced from isolated icon crops into vector paths, with provenance,
source URL and crop coordinates in `capture-icons.js`. They are not described as
original site SVGs. Anti-aliasing, font fallback, client version and capture zoom
still affect exact output. Dark counterparts without matching captures are adapted.

## Verification

- Browser production renderer: **190 geometry/catalog/alignment cases pass**:
  original 174, three Douyin narrow action-row checks, ten Tieba nested checks
  (five widths × two themes), and three screenshot-icon catalog checks.
- Widths:240,261,320,480,960; long author names, unbroken strings, Korean/emoji,
  large counts; existing 32px-font/64px-padding stress cases retained.
- **64 PNG exports**:15 platforms plus Tieba nested ×261/650px ×light/dark,
  with zero reactions on dark samples. No overflow/render errors;2x dimensions.
- Four same-content fixtures exported and visually compared beside source crops:
  Threads reply, Douyin sidebar comment, Tieba floor and nested reply. Placeholder
  avatar and editor-controlled padding intentionally differ from source photos.
- Existing TikTok PNG heart-position pixel assertion retained.

Run `/tests/platform-layout.html` from a local static server to repeat checks.
These checks establish layout/export behavior and the listed screenshot-based
corrections, not all-client pixel identity.
