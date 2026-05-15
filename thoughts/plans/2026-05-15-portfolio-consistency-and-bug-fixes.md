# Portfolio Consistency & Bug-Fix Implementation Plan

## Overview

Sweep the Next.js portfolio in `packages/portfolio/` to fix bugs, eliminate hardcoded styling, and lift recurring patterns (section wrapper, tech chip, outlined CTA button, data fetching) into shared primitives. The result is a smaller, more consistent codebase where adding a new section or tweaking the theme is a one-line change rather than a multi-file copy-paste.

All paths below are relative to [packages/portfolio/](packages/portfolio/) unless noted.

## Current State Analysis

The portfolio is a single-page Next.js 16 app with seven sections (Hero, About, Jobs, Blog, Projects, Hobbies, Contact) on [app/page.tsx](packages/portfolio/app/page.tsx). Content lives as markdown in `content/` and is served via four `/api/*` routes consumed by client-side `useEffect` + `fetch` in each section. Theme is MUI 7 with a custom `accent` palette and a light/dark toggle persisted to localStorage ([theme/ThemeContext.tsx:19](packages/portfolio/theme/ThemeContext.tsx#L19)).

### Confirmed bugs

- **OG image path mismatch** — [app/layout.tsx:31](packages/portfolio/app/layout.tsx#L31) references `/og.png` but the file is at `/public/static/og.png`. The Open Graph image is broken for every share.
- **Broken globals.css gradient** — [app/globals.css:29-35](packages/portfolio/app/globals.css#L29-L35) sets `background: linear-gradient(..., rgb(var(--foreground-rgb)), rgb(var(--background-rgb)))` against CSS variables that are never defined. The whole rule no-ops; the body relies on the MUI theme background underneath.
- **`viewport` deprecated location** — viewport sits inside `metadata` ([app/layout.tsx:19-23](packages/portfolio/app/layout.tsx#L19-L23)). Next.js 14+ requires a separate `export const viewport` and logs a console warning otherwise.
- **API error responses leak internals** — every route returns `details: error.message` ([app/api/posts/route.ts:13](packages/portfolio/app/api/posts/route.ts#L13) and siblings). Should be silenced in production.
- **Server `console.log` on every request** — [lib/content.ts:34](packages/portfolio/lib/content.ts#L34) logs the content-dir resolution on each call. Spam in CloudWatch.
- **4.8 MB unused asset** — `public/me.png` is shipped with the Lambda but the app only imports `/me.jpg` (112 KB). Pure bloat.
- **Silent fetch failures** — Blog/Jobs/Projects/Hobbies each call `fetch(...).then(res => res.json()).then(setState)` with no `.catch`. A 500 leaves the section blank with no signal.
- **Nav uses two scroll mechanisms** — `useScrollTrigger` ([Nav.tsx:20-23](packages/portfolio/components/Nav.tsx#L20-L23)) plus a manually attached `scroll` listener ([Nav.tsx:76](packages/portfolio/components/Nav.tsx#L76)) with no debounce. Two listeners running on every scroll event.
- **Empty SVG `<text>` element** — [Nav.tsx:262-270](packages/portfolio/components/Nav.tsx#L262-L270) renders a `<text>` with no children inside the Hexagon. Vestigial.
- **Embla `any` type** — [Projects.tsx:46](packages/portfolio/components/sections/Projects.tsx#L46) types `onSelect`'s arg as `any`. Should be `EmblaCarouselType`.
- **Hero `pt` regression** — `pt: { xs: 4, md: 8, lg: 4 }` ([Hero.tsx:155](packages/portfolio/components/sections/Hero.tsx#L155)) jumps up at `md` then back down at `lg`. Almost certainly a typo for `lg: 8` or `lg: 12`.
- **Hero "Hi, my name is..." hidden under Nav on md** — [app/page.tsx:23](packages/portfolio/app/page.tsx#L23) sets `mt: { xs: '70px', md: 0, lg: '-40px' }` on `<main>`. On md the Nav AppBar is `position: fixed` and 80px tall ([Nav.tsx:231](packages/portfolio/components/Nav.tsx#L231)), so the first 80px of Hero is occluded. xs gets a 70px offset; lg gets a negative offset relying on the 2-column grid pushing content down — but md falls through the crack. Hero's `minHeight: 100vh` + `alignItems: center` can't recover because the single-column md content (intro stack + 500px tech-icon block) exceeds 100vh, so `pt` becomes the de-facto top.
- **Hash-link scrolling lands under Nav** — clicking Experience / Projects / Interests / Contact in the Nav uses `element.scrollIntoView({ behavior: 'smooth' })` ([Nav.tsx:100, 110](packages/portfolio/components/Nav.tsx#L100)), which puts the section's top edge at viewport 0 — under the fixed Nav. No `scroll-margin-top` on the sections.
- **`100vw` overflow on mobile** — [Hero.tsx:298](packages/portfolio/components/sections/Hero.tsx#L298) uses `maxWidth: { xs: '100vw' }`. Combined with the scrollbar this causes a 1-frame horizontal scroll on some browsers; should be `100%`.
- **Duplicate `See More` button** — Jobs renders the exact same outlined button twice ([Jobs.tsx:297-318](packages/portfolio/components/sections/Jobs.tsx#L297-L318) and [Jobs.tsx:337-358](packages/portfolio/components/sections/Jobs.tsx#L337-L358)) for the with-tech / no-tech branches.

### Systemic inconsistencies

- **Hardcoded section backgrounds** — five separate components inline `mode === 'light' ? '#f8f9fa' : 'background.paper'` / `'#ffffff' : 'background.default'` etc. ([About.tsx:14](packages/portfolio/components/sections/About.tsx#L14), [Jobs.tsx:38](packages/portfolio/components/sections/Jobs.tsx#L38), [Blog.tsx:34](packages/portfolio/components/sections/Blog.tsx#L34), [Projects.tsx:68](packages/portfolio/components/sections/Projects.tsx#L68), [Hobbies.tsx:29](packages/portfolio/components/sections/Hobbies.tsx#L29), [Contact.tsx:15](packages/portfolio/components/sections/Contact.tsx#L15)). Three colours, four variations.
- **Hardcoded shadows** — `'0 2px 8px rgba(0, 0, 0, 0.08)'`, `'0 4px 16px rgba(0, 0, 0, 0.12)'`, `'0 8px 32px rgba(0, 0, 0, 0.12)'` are pasted across Jobs/Projects/JobModal. Same colour regardless of dark mode.
- **Chip styling duplicated four ways** — Jobs, Projects, Blog, JobModal each define a `<Chip>` with the same `accent.light` background, monospace font, height ~28px, but vary the responsive font-size (`'0.75rem'` vs `{ xs: '0.7rem', sm: '0.75rem' }` vs `{ xs: '0.7rem', md: '0.75rem' }`).
- **Outlined button styling duplicated four+ ways** — Hero LinkedIn ([Hero.tsx:243-259](packages/portfolio/components/sections/Hero.tsx#L243-L259)), Hero Resume ([Hero.tsx:260-277](packages/portfolio/components/sections/Hero.tsx#L260-L277)), Contact Email ([Contact.tsx:33-48](packages/portfolio/components/sections/Contact.tsx#L33-L48)), Jobs "See More" (twice), and the JobModal Close button all carry an identical `borderColor / color / hover` block.
- **Hardcoded font-sizes** — `fontSize: '12px'`, `'14px'`, `'0.75rem'` litter Blog, Hobbies, and Projects instead of using `body2` / `caption`.
- **Inconsistent section vertical rhythm** — every section uses `py: { xs: 8, md: 12 }` *except* Jobs which uses `pt: 0` to butt up against About. The two-section group is intentional but the magic `pt: 0` is unsignalled.
- **Inconsistent card border-radius** — theme defines `24px` for `MuiCard` but Projects overrides to `borderRadius: { xs: 6, md: 8 }` ([Projects.tsx:205](packages/portfolio/components/sections/Projects.tsx#L205)) and Jobs uses `borderRadius: 8` on its inner Box ([Jobs.tsx:126](packages/portfolio/components/sections/Jobs.tsx#L126)). MUI `borderRadius: 8` = 64 px, not pixels — so these are actually huge radii. Probably a misunderstanding.

### Content data inconsistencies

- **Hobby `date: '3'`** — hobbies use string-encoded integers (`'0'`, `'1'`, `'3'`) as a sort key ([content/hobbies/chess/index.md](packages/portfolio/content/hobbies/chess/index.md), etc.). The field is called `date` but is not a date. Sort is `Number(a.date) - Number(b.date)` ([lib/content.ts:240](packages/portfolio/lib/content.ts#L240)).
- **Unused hobby frontmatter** — every hobby has `type:` (`'Problem Solver'`, etc.) and `cover:` fields that are never read; the UI uses the `images[]` array assembled from disk listing.
- **Inconsistent project date format** — some are `'2021-03-01'` (YYYY-MM-DD), some are `'2024-01-01'`; one job is `'2023-07-01'`. All work with `new Date()` but quoting them as strings is unnecessary and inconsistent.
- **Project layout differs from others** — `content/projects/*.md` (flat files), but jobs, posts, and hobbies are `content/<type>/<slug>/index.md` (folder-per-item). Hobbies in particular need the folder for sibling images.

### Accessibility & SEO gaps

- Theme-toggle `aria-label="toggle theme"` is non-actionable. Should describe the destination state.
- Social media icon buttons in [Footer.tsx:40-54](packages/portfolio/components/Footer.tsx#L40-L54) have no `aria-label` — screen readers announce nothing.
- Scroll-cue SVG ([Hero.tsx:371-386](packages/portfolio/components/sections/Hero.tsx#L371-L386)) is decorative but not `aria-hidden`.
- `dangerouslySetInnerHTML` on Blog/Hobbies/JobModal renders untrusted-shaped HTML from `marked`. Even if all current content is author-written, sanitising is cheap insurance.
- Missing canonical URL, JSON-LD `Person`, and `robots` meta.

### Key Discoveries

- Light-mode primary is `#0A75BCFF` — a hex8 with full-opacity `FF` appended ([theme/theme.ts:158](packages/portfolio/theme/theme.ts#L158)). Functionally fine but unusual; flag it as a minor cleanup.
- The Hero tech-icon layout runs an iterative pack on `useEffect` with a window-resize handler that has no debounce ([Hero.tsx:137-143](packages/portfolio/components/sections/Hero.tsx#L137-L143)). Cheap on modern machines but easy to add `requestAnimationFrame`.
- The theme's `MuiCard` style override applies a 2px border that the Blog and Hobby PostCards explicitly try to disable via `boxShadow: 'none'` and `'&:hover': { borderColor: 'divider', ... }`. The override is fighting the theme — easier to introduce an "elevation" variant.
- `next.config.ts` is unread but should be checked for image-domain config when we audit images.

## Desired End State

A portfolio where:

1. **No section component contains a hardcoded colour, shadow, or breakpoint value.** Every visual decision routes through theme tokens or shared primitives.
2. **The seven sections share a single `<Section>` wrapper** that handles `id`, padding, alt-background, and the optional "merge with previous" behaviour currently faked by Jobs' `pt: 0`.
3. **Tech chips, outlined CTA buttons, and section titles each have exactly one implementation** — used by Hero, About, Jobs, Blog, Projects, Hobbies, Contact, and the JobModal.
4. **Content is rendered server-side.** The four `/api/*` routes are deleted; sections become async server components that read `lib/content.ts` directly. No client `fetch`, no loading flashes.
5. **Markdown HTML is sanitised** before injection via DOMPurify (server-side).
6. **All bugs above are fixed** and verifiable: `og.png` resolves, viewport warning is gone, content frontmatter is normalised, fetch errors no longer crash silently (now N/A because server-rendered), shadows adapt to dark mode.
7. **Accessibility:** every icon-only button has a descriptive `aria-label`, the scroll-cue is `aria-hidden`, and a JSON-LD `Person` block plus canonical URL ship in `<head>`.
8. **Lint, typecheck, and build pass.** Visual regression: each section, light and dark, mobile and desktop, matches the current layout (no intentional redesign — only cleanup).

### Verification

- `npm run lint` clean
- `npx tsc --noEmit` clean
- `npm run build` succeeds
- Manual: load `/` in light and dark on mobile (≤ 600 px) and desktop; every section renders with the same look as before. Spot-check the OG image at `<host>/og.png`. Confirm no console warnings on load.

## What We're NOT Doing

- **No redesign.** Colours, typography, and section order stay the same. We are unifying, not restyling.
- **No new sections, no removed sections.** Same seven blocks.
- **No animation overhaul.** Existing transitions stay.
- **No new dependencies beyond DOMPurify + `isomorphic-dompurify` (or `dompurify` with `jsdom` for SSR).** Specifically not adding a UI library or replacing MUI.
- **No CMS migration.** Markdown stays in `content/`.
- **No automated test suite added.** The codebase has none today; adding one is its own project.
- **No SST/infra changes.** Pure app-level work.
- **No Husky/Prettier/ESLint config changes** unless required to make a fix land.

## Implementation Approach

Six phases, ordered so that each phase produces a buildable, shippable diff:

1. Critical bug fixes (low risk, high value, no design impact).
2. Theme extensions (the foundation everything else builds on).
3. Shared primitives (`<Section>`, `<TechChip>`, `<OutlinedCTAButton>`, `<SectionTitle>`).
4. Migrate sections to server components + apply primitives.
5. Sanitize markdown + accessibility + SEO additions.
6. Content normalisation + final cleanup.

Phases 1–3 are pure refactor with strong unit-of-work boundaries; phases 4–6 are where visible behaviour changes. After each phase the app must build and render identically.

---

## Phase 1: Critical bug fixes & infra cleanup

### Overview
Land the easy, no-design-impact fixes first so the diff for later phases stays focused.

### Changes Required

#### 1. Fix OG image path
**File**: [app/layout.tsx](packages/portfolio/app/layout.tsx)
**Change**: The metadata references `/og.png` but the file lives at `public/static/og.png`. Either move the file to `public/og.png` or update the URL. Move the file — the `/static/` directory is a convention from older Next.js versions and isn't needed.

```bash
mv public/static/og.png public/og.png
```
No change to `layout.tsx` needed once moved. Confirm with `curl -I http://localhost:3000/og.png` returning 200.

#### 2. Move `viewport` to its own export
**File**: [app/layout.tsx](packages/portfolio/app/layout.tsx)
**Change**: Per Next.js 14+ App Router. Remove `viewport` from the `metadata` object and add:

```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};
```

Import `Viewport` from `next`.

#### 3. Clean broken globals.css gradient
**File**: [app/globals.css](packages/portfolio/app/globals.css)
**Change**: Delete the `body { background: linear-gradient(...); ... }` rule. The MUI theme already paints `background.default` via CssBaseline. Also remove the duplicate `scroll-behavior: smooth` on `html` (theme MuiCssBaseline already sets it) and the unused `@media (prefers-color-scheme: dark)` block — the toggle is manual.

After cleanup, globals.css should contain only the `* { box-sizing }` reset, the `html, body { max-width: 100vw; overflow-x: hidden; margin: 0; padding: 0; width: 100% }` rules, and the `a { color: inherit; text-decoration: none }` rule.

#### 4. Remove inline font-family on `<body>`
**File**: [app/layout.tsx:54-58](packages/portfolio/app/layout.tsx#L54-L58)
**Change**: Drop the `style={{ fontFamily: ... }}`. The theme typography already references `var(--font-inter)`.

#### 5. Delete unused 4.8MB asset
```bash
rm public/me.png
```
The app uses `me.jpg` everywhere. Confirm with `grep -r "me\.png" app components` returning nothing.

#### 6. Silence API error details + remove server console.log
**Files**: [lib/content.ts:34](packages/portfolio/lib/content.ts#L34), [app/api/*/route.ts](packages/portfolio/app/api/) (all four)

In `lib/content.ts`, guard the resolution log:
```typescript
if (process.env.NODE_ENV !== 'production') {
  console.log(`[Content] Using content directory: ${dirPath}`);
}
```

In each API route, drop the `details:` field from the 500 response (note: these routes are deleted entirely in Phase 4, so this is a stopgap to avoid leaking error messages until then):
```typescript
return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
```

#### 7. Fix Nav double-scroll-listener overlap
**File**: [Nav.tsx:25-80](packages/portfolio/components/Nav.tsx#L25-L80)
**Change**: The component already has `useScrollTrigger` for the glass effect. The hand-rolled scroll listener exists for `activeSection` tracking — keep it but wrap the body in `requestAnimationFrame` to coalesce:

```typescript
useEffect(() => {
  let raf = 0;
  const handleScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      // ...existing body...
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

#### 8. Fix Hero `pt` regression & `100vw` overflow
**File**: [Hero.tsx:155, 298](packages/portfolio/components/sections/Hero.tsx)
**Change**:
- Line 155: `pt: { xs: 4, md: 8, lg: 4 }` → `pt: { xs: 4, md: 8 }` (drop the lg key; let md cascade).
- Line 298: `maxWidth: { xs: '100vw', sm: '100%', md: 'none' }` → `maxWidth: { xs: '100%', md: 'none' }`.

#### 8a. Fix Hero/Nav overlap on md + hash-scroll landing
**Files**: [app/page.tsx:23](packages/portfolio/app/page.tsx#L23), [components/sections/Hero.tsx](packages/portfolio/components/sections/Hero.tsx), all section components (`scroll-margin-top`)

The root cause is `<main>` having `mt: 0` on md while the fixed Nav occupies the top 80px. Two coordinated changes:

**(a)** In `app/page.tsx`, set `<main>` top margin to clear the Nav at every breakpoint:
```tsx
mt: { xs: '70px', md: '80px', lg: '40px' },
```
The lg value drops from `-40px` to `40px`. The previous `-40px` was a hack to counter the lg 2-column grid pushing visible content too far down; with the Hero `pt` regression fix above plus a real top margin, the `40px` (positive) keeps the Hero centerline sensible. **Verify by eye** during manual testing — if lg looks too low, tune the lg value down to `0` or `20px`, but never negative.

**(b)** Add `scroll-margin-top` to each section so hash links land below the Nav. Since Phase 3 introduces a shared `<Section>` wrapper, the cleanest place is inside that component (Phase 3 change — for Phase 1, add it inline on the seven section roots OR add a single CSS rule to `globals.css`):

```css
/* app/globals.css */
section[id] {
  scroll-margin-top: 80px;
}
```

This is a one-line, one-file fix that covers hash-link scrolling for every section regardless of where the Nav lives. The Phase 3 `<Section>` wrapper internalizes this via `scrollMarginTop` in `sx`, at which point the CSS rule in `globals.css` can be removed (or left as defensive belt-and-braces).

#### 9. Remove empty SVG `<text>` in Nav Hexagon
**File**: [Nav.tsx:255-271](packages/portfolio/components/Nav.tsx#L255-L271)
**Change**: Delete the entire inner `<svg>...<text/></svg>` block — it renders nothing.

#### 10. Type Embla `onSelect` properly
**File**: [Projects.tsx:46](packages/portfolio/components/sections/Projects.tsx#L46)
**Change**:
```typescript
import type { EmblaCarouselType } from 'embla-carousel';
const onSelect = useCallback((api: EmblaCarouselType) => { ... }, []);
```

### Success Criteria

#### Automated Verification:
- [x] `npm run lint` passes with no new warnings *(10 pre-existing errors remain, none introduced by Phase 1; added `.open-next/**` to eslint globalIgnores so source-level signal is visible)*
- [x] `npx tsc --noEmit` passes
- [x] `npm run build` succeeds
- [x] `grep -r "me\.png" packages/portfolio/app packages/portfolio/components` returns no matches
- [x] `grep "viewport" packages/portfolio/app/layout.tsx` shows the new export, not the metadata key
- [x] `ls packages/portfolio/public/og.png` exists

#### Manual Verification:
- [ ] `npm run dev`; load `/`; no console warnings, no "viewport metadata is deprecated" log
- [ ] `curl -I http://localhost:3000/og.png` returns 200
- [ ] Light mode and dark mode background colours are visually unchanged (the broken gradient was a no-op anyway)
- [ ] Scroll the page — Nav glass effect and active-section highlighting still work
- [ ] Hero section still has expected top padding on desktop (no jump up at the lg breakpoint)
- [ ] No horizontal scroll on a 375 px viewport
- [ ] Project carousel still works (Embla type change is internal)
- [ ] **"Hi, my name is..." is fully visible on md (~768 px width) — not clipped by the Nav**
- [ ] On xs, sm, md, lg: the Hero's top text starts at least ~12 px below the bottom edge of the Nav
- [ ] Click each Nav item (Experience, Projects, Interests, Contact) — the section title lands clearly below the Nav, not behind it

**Implementation Note**: After this phase, pause for manual confirmation before proceeding.

---

## Phase 2: Theme extensions

### Overview
Add the tokens that later phases will use to replace hardcoded colour, spacing, and shadow values. No component changes yet; just expand the theme surface.

### Changes Required

#### 1. Custom palette tokens
**File**: [theme/theme.ts](packages/portfolio/theme/theme.ts)
**Change**: Extend the `Palette` module augmentation to include `background.subtle` (the alternating `#f8f9fa`-style band) and a typed `accent`. Add `surface.elevated` for cards.

```typescript
declare module '@mui/material/styles' {
  interface TypeBackground {
    subtle: string;       // alt-band: f8f9fa in light, 112240 in dark
    elevated: string;     // cards: ffffff in light, 1a2f4f in dark
  }
  interface Palette {
    accent: { main: string; light: string; dark: string };
  }
  interface PaletteOptions {
    accent?: { main: string; light: string; dark: string };
  }
}
```

Add to each theme:
```typescript
// dark
background: {
  default: '#0a182e',
  paper: '#112240',
  subtle: '#112240',
  elevated: '#1a2f4f',
},

// light
background: {
  default: '#ffffff',
  paper: '#ffffff',
  subtle: '#f8f9fa',
  elevated: '#ffffff',
},
```

Also clean the stray hex8 `'#0A75BCFF'` → `'#0A75BC'`.

#### 2. Mode-aware shadow tokens
**File**: [theme/theme.ts](packages/portfolio/theme/theme.ts)
**Change**: Define a `shadows` helper and surface two named shadows under the `theme.customShadows` augmentation. (Or simpler: keep using `theme.shadows[N]` from MUI's built-in shadows after we add a mode-aware override.)

Simplest path: add a `customShadows` field via module augmentation.
```typescript
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: { card: string; cardHover: string; modal: string };
  }
  interface ThemeOptions {
    customShadows?: { card?: string; cardHover?: string; modal?: string };
  }
}

const shadowColor = (mode: 'dark' | 'light', alpha: number) =>
  mode === 'dark'
    ? `rgba(0, 0, 0, ${alpha * 2})`  // darker bg → stronger shadow
    : `rgba(15, 23, 42, ${alpha})`;

// In each theme:
customShadows: {
  card: `0 2px 8px ${shadowColor(mode, 0.08)}`,
  cardHover: `0 4px 16px ${shadowColor(mode, 0.12)}`,
  modal: `0 8px 32px ${shadowColor(mode, 0.12)}`,
},
```

#### 3. Caption-mono typography variant
**File**: [theme/theme.ts](packages/portfolio/theme/theme.ts)
**Change**: The `'ui-monospace, ...'` stack is inlined 6+ times. Add a typography variant.

```typescript
declare module '@mui/material/styles' {
  interface TypographyVariants {
    captionMono: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    captionMono?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    captionMono: true;
  }
}

// in typography:
captionMono: {
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: '0.01em',
},
```

#### 4. Card override revisited
**File**: [theme/theme.ts:109-122](packages/portfolio/theme/theme.ts#L109-L122)
**Change**: The current `MuiCard` override forces a 2px border + 24px radius on every Card. Blog and Hobby cards specifically opt out via `boxShadow: 'none'`. The override is fighting the theme — make it explicit:

```typescript
MuiCard: {
  defaultProps: { elevation: 0 },
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      borderRadius: 24,
      backgroundColor: theme.palette.background.elevated,
      border: ownerState.variant === 'outlined'
        ? `2px solid ${theme.palette.mode === 'dark' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`
        : 'none',
      boxShadow: ownerState.elevation === 0 ? 'none' : theme.customShadows.card,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
},
```

Now `<Card>` = clean. `<Card variant="outlined">` = bordered (the current default behaviour). `<Card elevation={1}>` = shadowed.

### Success Criteria

#### Automated Verification:
- [x] `npm run lint` passes *(same 10 pre-existing errors as Phase 1, no new issues introduced; one stray "Theme unused import" warning cleared)*
- [x] `npx tsc --noEmit` passes (theme augmentations type-check)
- [x] `npm run build` succeeds

#### Manual Verification:
- [ ] Load `/` light and dark; **expect Blog and Hobby cards to lose their borders** (Phase 3 will reintroduce the desired appearance via explicit variants). The site builds and renders; small visual regressions in those two sections are OK at this checkpoint.
- [ ] All other sections look identical to before.

**Implementation Note**: After this phase, pause for confirmation. The Blog/Hobby card regression is intentional and is fixed in Phase 3.

---

## Phase 3: Shared primitives

### Overview
Extract the four cross-cutting patterns into single-implementation components. Components are dropped into `components/ui/` (new directory).

### Changes Required

#### 1. `<Section>` wrapper
**New file**: [components/ui/Section.tsx](packages/portfolio/components/ui/Section.tsx)

```typescript
import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

type BackgroundVariant = 'default' | 'subtle';

interface SectionProps {
  id: string;
  children: ReactNode;
  background?: BackgroundVariant;
  maxWidth?: ContainerProps['maxWidth'];
  noTopPadding?: boolean;       // for the Jobs "merge with About" case
  containerSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export function Section({
  id,
  children,
  background = 'default',
  maxWidth = 'lg',
  noTopPadding = false,
  containerSx,
  sx,
}: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        pt: noTopPadding ? 0 : { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        backgroundColor: background === 'subtle' ? 'background.subtle' : 'background.default',
        scrollMarginTop: { xs: '70px', md: '80px' },
        ...sx,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, ...containerSx }}
      >
        {children}
      </Container>
    </Box>
  );
}
```

#### 2. `<SectionTitle>`
**New file**: [components/ui/SectionTitle.tsx](packages/portfolio/components/ui/SectionTitle.tsx)

```typescript
import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

interface SectionTitleProps extends Omit<TypographyProps, 'children'> {
  children: ReactNode;
}

export function SectionTitle({ children, sx, ...rest }: SectionTitleProps) {
  return (
    <Typography variant="h2" sx={{ mb: 6, textAlign: 'center', ...sx }} {...rest}>
      {children}
    </Typography>
  );
}
```

#### 3. `<TechChip>`
**New file**: [components/ui/TechChip.tsx](packages/portfolio/components/ui/TechChip.tsx)

```typescript
import { Chip, ChipProps } from '@mui/material';

interface TechChipProps extends Omit<ChipProps, 'label'> {
  label: string;
}

export function TechChip({ sx, ...rest }: TechChipProps) {
  return (
    <Chip
      size="small"
      sx={{
        backgroundColor: 'accent.light',
        color: 'primary.main',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontSize: { xs: '0.7rem', sm: '0.75rem' },
        height: { xs: '24px', sm: '28px' },
        fontWeight: 500,
        ...sx,
      }}
      {...rest}
    />
  );
}
```

#### 4. `<OutlinedCTAButton>`
**New file**: [components/ui/OutlinedCTAButton.tsx](packages/portfolio/components/ui/OutlinedCTAButton.tsx)

```typescript
import { Button, ButtonProps } from '@mui/material';

export function OutlinedCTAButton({ sx, ...rest }: ButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
          borderColor: 'primary.dark',
          backgroundColor: 'primary.main',
          color: 'background.default',
        },
        ...sx,
      }}
      {...rest}
    />
  );
}
```

#### 5. Barrel export
**New file**: [components/ui/index.ts](packages/portfolio/components/ui/index.ts)

```typescript
export { Section } from './Section';
export { SectionTitle } from './SectionTitle';
export { TechChip } from './TechChip';
export { OutlinedCTAButton } from './OutlinedCTAButton';
```

### Success Criteria

#### Automated Verification:
- [x] `npx tsc --noEmit` passes (all four components compile against their props)
- [x] `npm run lint` passes (same baseline, no new issues)
- [x] `npm run build` succeeds — no usages yet, but the new files compile

#### Manual Verification:
- [x] None — no UI change. This phase only adds files.

**Implementation Note**: After this phase, pause for confirmation.

---

## Phase 4: Migrate sections to server components + apply primitives

### Overview
The biggest phase. Convert each section to either an async server component (Jobs, Blog, Projects, Hobbies — read content directly, no API) or a leaner client component (Hero, About, Contact — interactive but no data). Apply the Phase 3 primitives along the way. Delete the four `app/api/*` routes.

### Changes Required

#### 1. Delete the API routes
```bash
rm -rf app/api
```
Also drop the `useEffect` + `useState<Post[]>([])` pattern from each section.

#### 2. About
**File**: [components/sections/About.tsx](packages/portfolio/components/sections/About.tsx)

About has no client interactivity. Remove `'use client'`, drop `useTheme`, switch to `<Section>`. Final shape:

```typescript
import { Avatar, Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Section } from '@/components/ui';

export default function About() {
  return (
    <Section id="about" background="subtle" sx={{ userSelect: 'none' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Avatar
            sx={{
              width: { xs: 180, md: 250 },
              height: { xs: 180, md: 250 },
              position: 'relative',
              zIndex: 10,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          >
            <Image
              src="/me.jpg"
              alt="Martin Sagat"
              fill
              sizes="(max-width: 600px) 180px, 250px"
              style={{ objectFit: 'cover' }}
              draggable={false}
              priority
            />
          </Avatar>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h2" sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
            About Me
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: { xs: 'center', md: 'left' } }}>
            I&apos;m a Senior Software Engineer specializing in scalable web and mobile applications.
            I blend cloud and modern web expertise with hands-on AI integration to build efficient,
            maintainable systems that enhance user experiences and drive business impact. I&apos;m also
            passionate about crafting clean, intuitive UI/UX that elevates every product I work on.
          </Typography>
        </Box>
      </Stack>
    </Section>
  );
}
```

#### 3. Jobs (server component)
**File**: [components/sections/Jobs.tsx](packages/portfolio/components/sections/Jobs.tsx)

Split into:
- `Jobs.tsx` — async server component fetching jobs via `getJobs()` and rendering the timeline.
- `JobTimelineItem.tsx` — new client component that owns the modal-open state.

`Jobs.tsx` becomes:
```typescript
import { Box, Stack } from '@mui/material';
import { getJobs } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';
import { JobTimelineItem } from './JobTimelineItem';

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <Section id="jobs" background="subtle" noTopPadding>
      <SectionTitle>Where I&apos;ve Worked</SectionTitle>
      <Box
        sx={{
          position: 'relative',
          maxWidth: { xs: '100%', md: '800px' },
          mx: { xs: 0, md: 'auto' },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: { xs: '24px', md: '10%' },
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'divider',
            transform: { xs: 'none', md: 'translateX(-1px)' },
          },
        }}
      >
        <Stack spacing={4}>
          {jobs.map((job, i) => (
            <JobTimelineItem key={i} job={job} />
          ))}
        </Stack>
      </Box>
    </Section>
  );
}
```

`JobTimelineItem.tsx` is the existing `TimelineItem` lifted into its own file with `'use client'`. Inside it:
- Replace inline `backgroundColor: theme.palette.mode === 'dark' ? '#1a2f4f' : 'background.paper'` with `'background.elevated'`.
- Replace inline shadow strings with `theme.customShadows.card` / `cardHover`.
- Collapse the two `See More` button branches into one block: render the tech footer conditionally, render the button always once. Use `<OutlinedCTAButton>` instead of the duplicated `Button` blocks.
- Use `<TechChip>` for each tech tag.
- Replace the monospace `Typography` for date with `variant="captionMono"`.

#### 4. Blog (server component)
**File**: [components/sections/Blog.tsx](packages/portfolio/components/sections/Blog.tsx)

```typescript
import { Box } from '@mui/material';
import { getPosts } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';
import { PostCard } from './PostCard';

export default async function Blog() {
  const posts = await getPosts(3);
  return (
    <Section id="blog">
      <SectionTitle>Latest Articles</SectionTitle>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {posts.map((post, i) => <PostCard key={i} post={post} />)}
      </Box>
    </Section>
  );
}
```

`PostCard.tsx` lifted into a separate file (server component — no client state needed). Inside:
- Replace `fontSize: '12px'` with `variant="captionMono"`.
- Replace `fontSize: '14px'` with `variant="body2"`.
- Use `<TechChip>` for tags.
- Sanitize `htmlContent` (Phase 5 — leave a `// TODO sanitize` for now and complete in Phase 5).

#### 5. Projects
**File**: [components/sections/Projects.tsx](packages/portfolio/components/sections/Projects.tsx)

Projects uses Embla, which is a client component. Split into:
- `Projects.tsx` — async server component fetching projects, passing them to a `ProjectsCarousel` client child.
- `ProjectsCarousel.tsx` — `'use client'`, owns the carousel.

`Projects.tsx`:
```typescript
import { getProjects } from '@/lib/content';
import { Section, SectionTitle } from '@/components/ui';
import { ProjectsCarousel } from './ProjectsCarousel';
import { Typography } from '@mui/material';

export default async function Projects() {
  const projects = (await getProjects()).slice(0, 9);
  return (
    <Section id="projects" background="subtle" maxWidth="xl">
      <SectionTitle>Noteworthy Projects</SectionTitle>
      <ProjectsCarousel projects={projects} />
      <Typography
        variant="body2"
        sx={{ mt: 6, textAlign: 'center', fontStyle: 'italic', color: 'text.secondary', userSelect: 'none' }}
      >
        Due to rights and confidentiality agreements, certain commercial projects are not featured.
      </Typography>
    </Section>
  );
}
```

Inside `ProjectsCarousel.tsx`:
- Use `theme.breakpoints.up('sm')` and `up('md')` instead of raw media queries (replace lines 104-109).
- Replace `borderRadius: { xs: 6, md: 8 }` on the inner card with reliance on theme default (delete the override; the card already inherits 24px).
- Use `theme.customShadows.card` / `cardHover`.
- Use `<TechChip>` for tech tags.

#### 6. Hobbies (server component)
**File**: [components/sections/Hobbies.tsx](packages/portfolio/components/sections/Hobbies.tsx)

Hobbies have no interactivity → fully server. Drop `'use client'`, `useEffect`, `useTheme`, `useState`. Use `<Section>`. Sanitize `htmlContent` (Phase 5).

#### 7. Contact
**File**: [components/sections/Contact.tsx](packages/portfolio/components/sections/Contact.tsx)

No interactivity → server component. Use `<Section>`, `<OutlinedCTAButton>`.

#### 8. Hero
**File**: [components/sections/Hero.tsx](packages/portfolio/components/sections/Hero.tsx)

Hero stays client (uses `useEffect` for tech-icon layout + window resize). Replace:
- Hardcoded `backgroundColor: mode === 'light' ? '#ffffff' : 'transparent'` → drop entirely (default is `background.default`).
- Both LinkedIn and Resume `<Button variant="outlined">` blocks → `<OutlinedCTAButton>`.
- Add `aria-hidden="true"` to the scroll-cue SVG wrapper.
- Wrap the resize listener body in `requestAnimationFrame` (mirror Phase 1's Nav pattern).

#### 9. `app/page.tsx`
**File**: [app/page.tsx](packages/portfolio/app/page.tsx)
Now that the children are mostly server components, the `page.tsx` already works as a server component — no change needed.

### Success Criteria

#### Automated Verification:
- [x] `npx tsc --noEmit` passes
- [x] `npm run lint` passes — down from 16 → 8 baseline issues (5 errors / 3 warnings, all pre-existing in Hero / ProjectsCarousel / ThemeContext — none introduced by Phase 4)
- [x] `npm run build` succeeds — `/` is now fully static-prerendered (no dynamic `/api/*` routes)
- [x] `ls packages/portfolio/app/api 2>/dev/null` returns nothing (directory deleted)
- [x] `grep -rn "fetch('/api/" packages/portfolio/components` returns no matches
- [x] `grep -rn "'#f8f9fa'\\|'#ffffff'\\|'#1a2f4f'" packages/portfolio/components` returns at most the Nav glassmorphism rules (only Nav's rgba overlays remain — intentional)
- [x] `grep -rn "rgba(0, 0, 0, 0.0[68]\\|0.12)" packages/portfolio/components` — only Nav glassmorphism remains; all card/modal shadows go via `theme.customShadows`
- [x] `grep -rn "fontSize: '12px'\\|fontSize: '14px'" packages/portfolio/components` returns no matches

#### Manual Verification:
- [ ] `/` loads with **no flash of empty content**. Server-rendered HTML contains the jobs/posts/projects/hobbies on first paint (verify with View Source).
- [ ] Each section visually matches its previous appearance, light and dark, mobile (375 px) and desktop.
- [ ] Project carousel still scrolls, arrows enable/disable correctly.
- [ ] Job modal still opens and closes.
- [ ] Theme toggle still works.
- [ ] No console errors.

**Implementation Note**: After this phase, pause for confirmation.

---

## Phase 5: Markdown sanitization, accessibility, SEO

### Overview
Layer safety, accessibility, and discoverability over the now-clean component tree.

### Changes Required

#### 1. Sanitize markdown HTML
**Files**: [lib/content.ts](packages/portfolio/lib/content.ts), `package.json`

Add dependency: `npm install isomorphic-dompurify --workspace packages/portfolio`.

In `lib/content.ts`, after `const htmlContent = marked(content);` in each loader:
```typescript
import DOMPurify from 'isomorphic-dompurify';
// ...
const htmlContent = DOMPurify.sanitize(marked(content) as string);
```

(Note: `marked` returns `string | Promise<string>` depending on overload; the current code uses the sync overload — preserve that.)

#### 2. Accessibility on icon-only buttons
**Files**: [Footer.tsx](packages/portfolio/components/Footer.tsx), [Nav.tsx](packages/portfolio/components/Nav.tsx), [Projects.tsx](packages/portfolio/components/sections/Projects.tsx) (carousel arrows)

Footer social icons: add `aria-label={`Visit ${social.name}`}`.

Nav theme toggle (both copies): `aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}`.

Projects carousel arrow buttons: `aria-label="Previous projects"` / `aria-label="Next projects"`.

Hero scroll-cue Box: `aria-hidden="true"` on the wrapper `<Box>`.

#### 3. Decorative SVG / drag indicator
**Files**: [Hero.tsx](packages/portfolio/components/sections/Hero.tsx), [Hexagon.tsx](packages/portfolio/components/Hexagon.tsx)

In Hero, change `<Image alt={tech.name}>` (tech-icon images) to `<Image alt={`${getTechDisplayName(tech.name)} logo`}>`. In Hexagon, the inner `<Image alt="Hexagon content">` is decorative when used as the home logo — accept an optional `alt` prop and default it to `''` with `role="presentation"`.

#### 4. Job logo alt text
**Files**: [Jobs.tsx](packages/portfolio/components/sections/Jobs.tsx) (now `JobTimelineItem.tsx`), [JobModal.tsx](packages/portfolio/components/sections/JobModal.tsx)

Change `alt={job.company}` → `alt={`${job.company} logo`}`.

#### 5. JSON-LD `Person` + canonical URL + robots
**File**: [app/layout.tsx](packages/portfolio/app/layout.tsx)

Add to metadata:
```typescript
alternates: { canonical: '/' },
robots: { index: true, follow: true },
```

Inside the `<body>` (before `<ThemeProvider>`), add a JSON-LD `<script>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Martin Sagat',
      url: 'https://martinsagat.com',
      jobTitle: 'Senior Software Engineer',
      sameAs: [
        'https://github.com/martinsagat',
        'https://www.linkedin.com/in/martinsagat',
        'https://twitter.com/martinsagat',
      ],
    }),
  }}
/>
```

### Success Criteria

#### Automated Verification:
- [x] `npm run lint` passes (8 baseline, unchanged)
- [x] `npx tsc --noEmit` passes
- [x] `npm run build` succeeds
- [x] `cat packages/portfolio/package.json | grep isomorphic-dompurify` matches (`^3.13.0`)
- [x] `grep -rn "dangerouslySetInnerHTML" packages/portfolio/components packages/portfolio/lib | wc -l` = 3 (PostCard, Hobbies, JobModal — all sanitized at source); plus 1 in `app/layout.tsx` (JSON-LD)
- [x] `grep -n "aria-label" packages/portfolio/components/Footer.tsx packages/portfolio/components/Nav.tsx` shows the new labels (Visit ${social.name}, Switch to light/dark theme)
- [x] `grep -n "application/ld+json" packages/portfolio/app/layout.tsx` matches

#### Manual Verification:
- [ ] Right-click → View Source on `/`; confirm the `Person` JSON-LD script is in the HTML
- [ ] Run Chrome Lighthouse accessibility audit; score should improve over baseline
- [ ] Verify VoiceOver / NVDA announces the social and theme-toggle buttons clearly
- [ ] Markdown rendering looks unchanged in Blog / Hobby cards / Job modal (DOMPurify allowlist permits all the tags `marked` outputs by default)
- [ ] OG preview test: paste `https://localhost:3000` into the Twitter/Facebook debuggers (or `npm run build && npx serve`)

**Implementation Note**: After this phase, pause for confirmation.

---

## Phase 6: Content normalisation & final cleanup

### Overview
Normalise the markdown frontmatter to remove the `date: '3'` quirk, drop unused fields, and standardise on directory-per-item layout. Also delete leftovers from earlier phases.

### Changes Required

#### 1. Normalise hobby frontmatter
**Files**: [content/hobbies/*/index.md](packages/portfolio/content/hobbies/)

Replace each hobby's frontmatter:
```yaml
---
title: 'Chess'
order: 3
---
```
- Drop the unused `type:` (Problem Solver / Critical Thinker / Team Player) — these are not surfaced in the UI today.
- Drop the unused `cover:` — the UI reads from the on-disk `images[]` array, not this field.
- Rename `date:` to `order:` and store an unquoted integer.

Update [lib/content.ts:227-241](packages/portfolio/lib/content.ts#L227-L241):
```typescript
return {
  title: data.title || hobbyDir,
  content,
  htmlContent,
  images,
  order: typeof data.order === 'number' ? data.order : 0,
} as Hobby & { order: number };
// ...
.sort((a, b) => a.order - b.order)
.map(({ order, ...hobby }) => hobby);
```

#### 2. Standardise project date format
**Files**: [content/projects/*.md](packages/portfolio/content/projects/)

Already mostly YYYY-MM-DD, but unquote them (gray-matter parses ISO strings fine without quotes):
```yaml
---
date: 2024-01-01
title: ...
---
```
The `getProjects()` loader's `data.date || '2024-01-01'` fallback can stay.

#### 3. Move projects to directory-per-item layout (optional but recommended)
If we want consistency across all four content types: each project becomes `content/projects/<slug>/index.md`. The current flat layout works; this is a tidy-up only. **Defer if low value** — the rest of the plan works without it. Mark as out-of-scope for this PR and leave a note in the README.

Decision: **skip the move**; leave a `content/README.md` documenting why projects are flat and others are foldered (projects don't carry images).

#### 4. Add content/README.md
**New file**: [content/README.md](packages/portfolio/content/README.md)

Brief doc explaining:
- Each content type's frontmatter schema
- Why hobbies/jobs/posts use directories (sibling images) and projects use flat files
- How to add a new entry of each type

#### 5. Final sweep
- Delete trailing blank lines in [Footer.tsx](packages/portfolio/components/Footer.tsx), [theme/theme.ts](packages/portfolio/theme/theme.ts), [theme/ThemeContext.tsx](packages/portfolio/theme/ThemeContext.tsx), [components/ThemeProvider.tsx](packages/portfolio/components/ThemeProvider.tsx).
- `grep -rn "useTheme" packages/portfolio/components/sections` — confirm only Hero needs it (mode-dependent SVG); other usages should be gone after Phase 4.
- `grep -rn "TODO" packages/portfolio` — clear any markers left from earlier phases.

### Success Criteria

#### Automated Verification:
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` succeeds
- [ ] `grep -rn "type: 'Problem Solver'\\|type: 'Critical Thinker'\\|type: 'Team Player'" packages/portfolio/content` returns no matches
- [ ] `grep -rn "cover: '\\./" packages/portfolio/content/hobbies` returns no matches
- [ ] `grep -rn "date: '[0-9]'" packages/portfolio/content/hobbies` returns no matches (no string-int hack)
- [ ] `grep -rn "TODO" packages/portfolio/components packages/portfolio/lib` returns no matches

#### Manual Verification:
- [ ] Hobbies render in the same order as before (Climbing → Hockey → Chess based on `order: 0, 1, 3`)
- [ ] Project dates display unchanged in the carousel
- [ ] `content/README.md` accurately reflects the directory structure
- [ ] No regressions on first paint, light, dark, mobile, desktop

**Implementation Note**: This is the final phase. After confirmation, the diff is ready for review/merge.

---

## Testing Strategy

This codebase has no automated test suite. We rely on `tsc`, `eslint`, and `next build` as the automated gate, plus manual visual verification at each phase checkpoint.

### Manual Testing Steps (per phase)

1. `npm run dev` and load `http://localhost:3000`.
2. Open DevTools. Verify zero console errors and zero React/Next warnings.
3. Toggle the theme. Both modes render every section without colour leaks.
4. Resize the viewport: 1440 → 1024 → 768 → 600 → 375. No horizontal scroll, no overlapping content, no images cropped unexpectedly.
5. View source on the rendered HTML. After Phase 4, Jobs/Blog/Projects/Hobbies entries must be present in the HTML (server-rendered).
6. Click every CTA: LinkedIn, Resume (both Nav and Hero), Email, See More on each job, Project carousel arrows, theme toggle, social media icons in footer. All work.
7. Open the job modal, scroll through content, close it. No layout shift on the page beneath.
8. Run Chrome Lighthouse on `/` (desktop preset). Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.

### Visual regression checklist

| Section | Light desktop | Dark desktop | Light mobile | Dark mobile |
|---|---|---|---|---|
| Hero | ☐ | ☐ | ☐ | ☐ |
| About | ☐ | ☐ | ☐ | ☐ |
| Jobs | ☐ | ☐ | ☐ | ☐ |
| Blog | ☐ | ☐ | ☐ | ☐ |
| Projects | ☐ | ☐ | ☐ | ☐ |
| Hobbies | ☐ | ☐ | ☐ | ☐ |
| Contact | ☐ | ☐ | ☐ | ☐ |
| Nav (scrolled / un-scrolled) | ☐ | ☐ | ☐ | ☐ |
| Job Modal | ☐ | ☐ | ☐ | ☐ |

## Performance Considerations

- **Server-side rendering** of Blog/Jobs/Projects/Hobbies removes four client `fetch` round-trips per page load. First contentful paint should improve measurably (the previous flow rendered an empty container, then hydrated, then fetched, then re-rendered).
- **DOMPurify** adds ~12 KB minified+gzipped to the server bundle (not the client). Negligible.
- **Dropped 4.8 MB `me.png`** reduces Lambda cold-start asset size.
- **`requestAnimationFrame`-coalesced scroll listener** in Nav drops a measurable number of `setState` calls per scroll event on slow devices.
- No measurable regression expected.

## Migration Notes

- API routes `/api/posts`, `/api/jobs`, `/api/projects`, `/api/hobbies` are deleted in Phase 4. If anything outside this repo references them, it will 404. **Confirmed**: no external references — the routes are only called by the now-replaced client sections inside this same app.
- Hobby `order` schema change in Phase 6: handle gracefully — if `data.order` is undefined for a (theoretical) future content file, fallback is `0`, sorting is stable, so existing hobbies stay in place.
- Theme augmentation in Phase 2 is additive — no existing component code breaks during the phase, only new tokens become available.

## References

- Audit findings (this conversation, no separate file).
- Theme conventions: [theme/theme.ts](packages/portfolio/theme/theme.ts)
- Content schema: [lib/content.ts](packages/portfolio/lib/content.ts)
- Section composition: [app/page.tsx](packages/portfolio/app/page.tsx)
- MUI palette augmentation docs: https://mui.com/material-ui/customization/palette/#adding-new-colors
- Next.js viewport export: https://nextjs.org/docs/app/api-reference/functions/generate-viewport
