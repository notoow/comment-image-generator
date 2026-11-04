# Native comment layout audit — 2026-11-04

The previous renderer used one shared canvas layout and Lucide reaction symbols.
Its distinct PNG hashes did not demonstrate source-site fidelity. That verification
was insufficient and is superseded by source DOM and visual comparison.

## Directly inspected, signed-in desktop web

- YouTube: https://www.youtube.com/watch?v=jNQXAC9IVRw
  - Actual comment: Roboto 14/20px, author 500 12/18px, date 12/18px.
  - 36px avatar, 16px avatar/content gap; reaction icons use 18px viewBoxes.
  - Reaction row: 36px height, 4px top margin. Expanded reply entry is a separate row.
  - Original thumbs and chevron vector paths were read from the displayed comment DOM.
- Instagram: https://www.instagram.com/p/DfPQchkG1tg/
  - Actual comment: system font stack, 14/18px text, inline 600 13/18px author.
  - 32px avatar; body begins 50px from avatar left (18px gap).
  - 12px original heart vector at right; footer 12/16px, 12px gaps.
  - Reply expansion is a separate line, not part of the reactions footer.

## Remaining source verification

Direct visits were attempted for all 15 services. A profile, home page, login
screen, or challenge is NOT evidence for a comment layout. X works in the user's
signed-in browser; the inspected post had no public replies. Reddit and Baidu
presented verification screens in the isolated browser; Douyin a CAPTCHA.
The first Bilibili video was unavailable. The visited 2chan board was closed.
These are not recorded as verified comment templates.

Pixel-identical output across all widths and all 15 platforms is NOT yet verified.

## Additional direct inspection

- DC Inside desktop comment row, public thread 475173: no profile avatar,
  13/20px body, 152px nickname column with 33px gap, 12px right-side date;
  row padding 9px 3px 7px. Added as a separate native DOM template.
- Facebook public comments and Reddit comments became accessible in the user's
  normal signed-in browser. Their implementation and comparison are pending.
- Threads redirected to an account verification screen; no account information
  was entered or submitted. TikTok profile loaded, but the observed video link failed.

## Delivery status

Work in progress on highst/native-comment-fidelity. Not deployed. Native PNG
preview rendered for YouTube and Instagram, but the browser session failed during
PNG-download verification. No end-to-end or pixel-equivalence completion claim.
