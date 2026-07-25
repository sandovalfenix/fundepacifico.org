# Design QA

## Scope

- Reference: `https://higherlifefoundation.org/` and the downloaded source in `origen/`.
- Implementation: `http://127.0.0.1:5173/`.
- Areas checked: hero, header, navigation, responsive typography, mobile menu, animation structure, and viewport behavior.
- Standing rule: every section-level change must be verified on mobile at `390 x 844` as well as the relevant desktop/reference breakpoint before it is marked passed.

## Visual Comparisons

### Desktop

- Viewport: 1900 x 1030 CSS pixels.
- Reference capture: `scratch/qa-source-live-wide.png`.
- Implementation capture: `scratch/qa-local-desktop-final.png`.
- Side-by-side comparison: `scratch/qa-comparison-desktop-final.png`.
- Result: hero geometry, navigation spacing, headline width, font sizing, line breaks, label placement, and CTA position match the reference.
- Expected variance: the background video can show a different frame because both pages play it independently. The live reference also displayed a cookie banner during QA.

### Mobile

- Viewport: 390 x 844 CSS pixels.
- Reference capture: `scratch/qa-source-mobile.png`.
- Implementation capture: `scratch/qa-local-mobile-final.png`.
- Side-by-side comparison: `scratch/qa-comparison-mobile-final.png`.
- Result: header height, logo, actions, headline position, five-line wrap, CTA, and hero framing match the reference.

### Mobile Menu

- Viewport: 390 x 844 CSS pixels.
- Reference capture: `scratch/qa-source-mobile-menu-open.png`.
- Implementation capture: `scratch/qa-local-mobile-menu-open-final.png`.
- Side-by-side comparison: `scratch/qa-comparison-mobile-menu-open-final.png`.
- Result: menu offset, accordion spacing, active close icon, clipping, and full-height panel match the reference.

## Functional Checks

- Desktop dropdown opens from the primary navigation.
- Mobile menu opens and closes, locks page scrolling, and exposes the correct accessible state.
- Headline re-splits after resize and font readiness using measured line positions, matching the original site's behavior.
- Hero media parallax matches the original `parallax="hero"` behavior from `origen/`: the media layer moves from `translate3d(0px, 0%, 0px)` at the top to `translate3d(0px, 40%, 0px)` as the hero leaves the viewport.
- The mobile menu button is omitted from the desktop DOM at the original breakpoint.
- Responsive breakpoint check passes at 390, 768, 1024, 1025, and 1440 px. Mobile/tablet keeps the desktop menu hidden and uses the hamburger through 1024 px; desktop returns at 1025 px.
- Session 3 scroll behavior matches the original: the fixed header translates fully out of the viewport while scrolling down into the gallery and media banner, then returns when scrolling upward.
- Media banner parallax matches the original mobile scroll dynamics: the section keeps `height: 100vh`, `overflow: clip`, and the video translates at roughly one third of the section's viewport offset while entering and leaving the screen.
- "What we do" desktop scroll session matches the original `desktopView_root__zLZeZ` behavior: the section is `600vh` at five items, active state advances every `100vh`, only the active side progress bar fills, and the active image uses the original clip reveal while previous images collapse to `inset(0px 0px 100%)`.
- "What we do" mobile responsive check passes at `390 x 844`: the local page renders the original `mobileView_root__mHRYK` five-card structure, hides `desktopView_root__zLZeZ`, loads the mobile images as they enter the viewport, and has no positive horizontal overflow.
- Session 5 `statsBanner_root__dzRS_` scroll behavior matches the original bundle: four `100vh` slides remain visible in natural flow, the sticky content swaps statistics at each slide's `0.5` progress point, the active item fades/translates between `12px` offsets, the progress bar uses `(slideIndex + slideProgress) / (numSlides - 1)`, and each slide image now uses the original `parallax="more"` style motion from `-30%` to center to `+30%`.
- Session 5 mobile responsive check passes at `390 x 844`: the sticky wrapper remains `844px` high while the section scrolls, the image wrappers use viewport height instead of the captured `919px` inline height, active statistics advance `400,000 -> 40 Million -> 2.4 Million -> 16 Million`, the progress bar advances, and there is no positive horizontal overflow.
- Session 5 mobile blank-space regression fixed: the stats image parallax now uses the original `parallax="more"` percentage math with the correct `111%` image cushion, so the image covers the full `390 x 844` viewport at the top, middle, and bottom of each slide instead of exposing the following white CTA background.
- Session 5 text transition check passes: the active stats text now fades/translates with `350ms` easing and a `150ms` entry delay, matching the original GSAP-style change instead of swapping instantly at the scroll threshold.
- Session 5 to 6 image-size regression fixed: the stats banner now restores the original `picture` split, using vertical `1560 x 2988` assets through `1024px` and the desktop `5760 x 3240` Sanity assets from `origen/` above `1025px`. Desktop QA at `1920 x 1033` reports all four `currentSrc` values as the horizontal JPGs and the final stats/CTA seam at `y=522`; mobile QA at `390 x 844` reports the final `currentSrc` as the vertical AVIF and the element immediately above the CTA as `IMG`, with no blank gap.
- Final CTA follow-up: removed the `Location Details` module from the Home closing CTA, including the live timezone updater tied to `.locations_location__StD1t`; desktop and `390 x 844` render directly from `statsBanner_root__dzRS_` to `callToAction_root__si_1l` to the footer.
- Footer follow-up: replaced the simplified Tailwind footer with the original `footer_*` structure from `origen_styles.css`, including menu columns, mobile accordions, newsletter, office contact blocks, and social links.
- Footer visual follow-up: the footer now renders the original white Higherlife SVG mark, the newsletter CTA reads `Join Our Community` with the arrow icon, the removed `Subscribe` button is absent from rendered markup, and the closing CTA restores the original bottom border before the blue footer.
- Footer desktop spacing follow-up: the menu links now render as direct desktop links instead of being compressed inside the mobile accordion wrapper, restoring the original measured footer height (`949px` at `1920 x 1080`) and top menu block height (`336px`).
- Footer column alignment follow-up: the logo link now occupies the original grid cell (`1 / 4`) instead of auto-sizing the first column; desktop menu and office columns now share the same x positions (`963px` and `1436px` at `1920 x 1080`).
- Footer typography/line follow-up: desktop footer titles are explicitly locked to the original `12rem / 14rem / 700` uppercase style, and the office separator line is locked to `1rem` with `hsla(0, 0%, 100%, 0.062745098)`.
- Bottom-of-page nav follow-up: the fixed navbar now reappears at the footer/page end instead of staying translated out of view while scrolling down.
- Bottom-of-page nav color follow-up: at the final footer position, desktop nav links switch back to the original black text state so the menu labels remain visible on the white navbar.
- Production build completes successfully.
- Fresh desktop and mobile browser sessions report no application errors.

## Findings

- P1: none.
- P2: none.
- P3: background video frame timing differs between independent captures; this does not affect styling or layout fidelity.

## History

- Restored the original headline splitting behavior instead of fixed manual line breaks.
- Restored the original hero media parallax curve from the downloaded bundle.
- Removed local CSS overrides that changed the reference typography and wrapping.
- Restored the original mobile navigation button, menu offsets, clipping, and transition behavior.
- Matched the original desktop/mobile rendering breakpoint.
- Session 3: restored the original scroll-hide navigation behavior so the gallery and following media sections are not covered by the header.
- Responsive follow-up: hid the desktop navigation menu through the original 1024 px breakpoint so it cannot interfere with the mobile/tablet header.
- Media banner follow-up: restored the original scroll-driven video parallax for `mediaBanner_root__iR8_Z` using measured source behavior from the live site and `origen/` CSS.
- "What we do" follow-up: restored the source scroll math, side progress behavior, click jump targets, image z-index stack, opacity states, and clip-path reveal from the downloaded original bundle.
- Responsive rule follow-up: added the original mobile `mobileView_*` rendering for "What we do" and made mobile viewport verification mandatory for every following section.
- Session 5 follow-up: replaced the approximate impact-banner progress/activation with the original `ScrollTrigger` math from `origen`, kept all slides visible instead of hiding inactive slides, restored the image parallax pass-through, removed fixed slide-image wrapper heights, and verified desktop plus `390 x 844` mobile.
- Session 5 blank-space/parallax follow-up: restored the original Image provider formula for `parallax="more"`: `(.5 - ((rect.top + rect.height) / (viewport + rect.height))) * 60`, kept the stats-banner image cushion at the original `111%`, and verified desktop plus mobile remain covered by the slide image.
- Session 5 text-transition follow-up: restored the original fade/translate timing for statistics changes; mobile QA captured intermediate opacity states during the `400,000 -> 40 Million` handoff.
- Session 5 image-size follow-up: restored the missing desktop `srcSet` images (`bb96b0cd...`, `4562c458...`, `5861455a...`, `71922df...`) so desktop no longer upscales/crops the mobile portrait photos at the section 5 to 6 transition.
- Session 5 parallax regression follow-up: after restoring desktop assets, the parallax no longer depends on asset overflow in pixels. Desktop `1920 x 1033` now reports visible last-slide movement from roughly `-30px` to `214px`, and mobile `390 x 844` keeps the AVIF source, visible parallax, and `IMG` immediately above the CTA.
- Location Details exclusion: the Home no longer renders `locations_root__Nhiyt`, and the backing data no longer marks the closing CTA as `type: "location"` or labels the removed block as `Location Details`.
- Footer responsive check passes at desktop and `390 x 844`: the closing CTA appears before `<footer class="footer_root__SOTzw">`, no rendered `<div class="locations_root__Nhiyt">` markup is present, the SVG logo and `Join Our Community` CTA render, and `Subscribe` is absent.
- Footer desktop/mobile split follow-up: desktop shows 15 direct footer links and hides accordion content; mobile hides the direct desktop links, keeps four accordion panels available, preserves the `1091px` mobile footer height, and has no horizontal overflow.
- Footer alignment responsive check: mobile keeps logo/menu/offices aligned to the same `12px` content edge at `390 x 844`, with desktop-only direct links hidden and no horizontal overflow.
- Bottom-of-page responsive check: at desktop and `390 x 844`, scrolling to the final page position leaves the navbar visible with `transform: translate(0px, 0px)`.
- Footer-end navbar menu check: at `1880 x 1070`, the desktop menu remains `display: flex` and all five labels render in `rgb(26, 26, 26)` at the final scroll position; mobile keeps the desktop menu hidden and has no overflow.

final result: passed
