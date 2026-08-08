# Aman Sharma — Portfolio: Production Hardening Notes

This is the same design, content, layout, and interactions as the original
single-file `aman-sharma-product-portfolio.html`, restructured into a
production-ready static site. Nothing visual changed — every rule below was
either a mechanical extraction or an invisible fix.

## File structure

```
index.html              # HTML only — no inline CSS/JS
css/styles.css           # All styles, deduplicated
js/main.js                # Both interaction scripts, combined + commented
assets/aman-sharma-portrait.jpg    # Hero photo (original quality, fallback)
assets/aman-sharma-portrait.webp   # Hero photo (WebP, ~50% smaller, primary)
```

Deploy by uploading this folder as-is (Netlify, Vercel, GitHub Pages, S3 —
no build step required).

## What changed, and why

**Performance**
- The hero photo was a base64 JPEG embedded directly in the HTML (~82 KB of
  text just for one image, and it could never be cached separately from the
  page). It's now an external file, plus a WebP copy (61 KB → 30 KB) served
  via `<picture>` with the original JPEG as the universal fallback — pixel-
  identical, just smaller and independently cacheable.
- Added `width`/`height` on the `<img>` to prevent layout shift, and
  `fetchpriority="high"` + a `<link rel="preload">` on the WebP, since this
  image is the page's LCP (largest contentful paint) element.
- CSS and JS are now external files instead of inline, so browsers cache
  them across visits — a repeat visit now only re-downloads `index.html`
  (~9 KB gzipped) instead of the full ~146 KB page every time.
- Removed 94 dead CSS rules left over from earlier design iterations
  (an old hero layout, an old "network links" style, an old profile-photo
  ring, etc.) that no longer matched anything in the markup. This cut the
  stylesheet by ~29% with zero visual effect — verified by checking every
  removed rule's selector never matched a class/id actually present in the
  HTML or ever added by the JavaScript.

**Accessibility (WCAG)**
- Every major `<section>` now has `aria-labelledby` pointing at its heading,
  so screen-reader users get a real landmark menu (previously only 2 of 9
  sections were labelled).
- Added `datetime` attributes to the two work-history `<time>` elements.
- Upgraded `rel="noopener"` to `rel="noopener noreferrer"` on all 24
  external links for stronger tab-nabbing/referrer protection.
- Heading hierarchy, `alt` text, `aria-hidden` on decorative icons/SVG paths,
  the skip-link, and the reduced-motion handling were already correct in
  the original and were left untouched.

**Cross-browser**
- Added the `-webkit-backdrop-filter` prefix alongside the standard
  `backdrop-filter` on the nav bar's blur effect (needed by older Safari).

**Code quality**
- Consolidated four separate `<style>` blocks (some overriding earlier
  ones with `!important`, in the pattern of iterative design revisions)
  into one organized stylesheet with section comments, in their original
  cascade order — so the computed styles are unchanged, but the file is
  readable and traceable.
- Combined the two inline `<script>` tags into one commented, formatted
  `main.js`, loaded with `defer` (equivalent timing to the original
  end-of-body placement). Logic is byte-for-byte the same, just formatted.

## Verified, not assumed

- Every visible text string in `index.html` was diffed against the original
  file and confirmed identical (content unchanged).
- Every CSS rule that was removed was checked against the full set of
  classes/IDs that appear in the HTML *and* the two classes toggled by
  JavaScript (`is-active`) — nothing reachable was deleted.
- HTML tag nesting was checked for balance; CSS brace count was checked for
  balance; `main.js` was checked with `node -c` for syntax validity.

## Optional next steps (not applied, since they'd change output/behavior)

- Minifying `styles.css` / `main.js` for production (kept readable here
  since this is a hand-off deliverable — most hosts like Netlify apply
  gzip/Brotli automatically regardless).
- Self-hosting the Google Font instead of the Google Fonts CDN, if you want
  to remove the third-party request entirely.
