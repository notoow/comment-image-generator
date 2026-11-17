# Localization and reply editor verification — 2026-11-17

- App UI: 22 locales, 228 messages each. `node scripts/build-i18n.mjs` validates exact key parity, nonempty translations, placeholders, and absence of untranslated Korean, then bundles catalogs for offline browser use.
- Initial translations are machine-assisted; common UI terminology was corrected. This is not a claim of professional native-language copyediting in all 22 locales.
- Language selection: explicit `?lang=` parameter, saved preference, browser language, English fallback. RTL editor layout for Arabic, Hebrew, and Persian. User-entered handles, comments and replies are not translated.
- Platform-specific Chinese/Japanese wording and proper platform names remain part of their native visual templates. Random handle output supports explicit Korean/English styles and a mixed default, independently of UI language.
- Browser checks passed in all 22 languages: initial rendering, reply creation, six profile options, default avatar random color, collapsed numeric settings, translated controls, and no runtime errors.
- Full workflow passed: legacy Korean-only preference migrates once to mixed; reply photo upload, original/mosaic/blur/initials/default/random rendering; date slider; PNG download; locale changes preserve user text; delete reply; no page overflow at 390px in Korean, English, German, Arabic, Tamil.
- All 15 platform previews rendered after localization. Replies share the original profile renderer and cloned sidebar controls; uploaded image objects stay in memory and are not serialized into localStorage.
- Padding and corner-radius controls use closed native details elements. Exact numeric controls remain available and canvas manipulation remains enabled.
- `node --test tests/random-generators.test.cjs` checks mixed-language generation, recent-base exclusion, birthday ages and nonrepeating avatar colors.

To edit translations, change `localization/<locale>.json` and rebuild the bundle with `node scripts/build-i18n.mjs`. Add new UI messages through `CommentI18n.t` with numbered placeholders, without interpolating user data into translation keys.
