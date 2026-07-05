# Kobber i React — komponentbibliotek, demo og designsystem-feedback

React-implementasjon av Gyldendals [Kobber-designsystem](https://kobber.gyldendal.no/),
bygget utelukkende fra [`@gyldendal/kobber-tokens`](https://www.npmjs.com/package/@gyldendal/kobber-tokens)
og [Figma-filen](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek)
(kun lesing). PoC med produksjonsambisjoner: 33 komponenter, 12
dokumenterte komponentforslag, 112 tester, WCAG-feiet, SSR-verifisert.

**Live demo:** <https://dsreitan.github.io/foo/> — galleri med alle
komponenter (`#/komponenter`), åtte komposerte eksempelsider (nettbutikk,
dashbord, lekseoversikt, arbeidsflate …), Lab-siden med forslagene
(`#/lab`), og en prerendret utgave av komponentsiden (`statisk.html`).

## Til Kobber-teamet: start her

Vi har konsumert hvert eneste token programmatisk og lest Figma-filen
via API — funnene er skrevet som vennlig, tallfestet feedback:

1. **[`docs/design-system-review.md`](docs/design-system-review.md)** —
   hoveddokumentet: arkitekturnivået, sammenlignet med Material 3,
   Carbon, Polaris, Spectrum, Primer og Atlassian, pluss hvordan en
   KI-agent helst konsumerer et designsystem. Ni funn, fem prioriterte
   anbefalinger.
2. [`docs/upstream-findings.md`](docs/upstream-findings.md) — de
   konkrete funnene, klare til å limes inn i issues (token-drift som
   bryter WCAG på primærknappen, fokusfargen, kontrastfeiing av 41 par).
3. [`docs/token-modes.md`](docs/token-modes.md) — anbefalinger for
   variabel-modes (mørk modus, barnemodus, temaer).
4. [`docs/responsive-tokens.md`](docs/responsive-tokens.md) — hvordan
   uttrykke flytende `clamp()`-verdier i tokens og Figma.
5. [`docs/proposals/`](docs/proposals/) — 12 komponentforslag
   (motivasjon, anatomi, foreslåtte tokens, UU, animasjonsspek) med
   kjørbare demoer under «Lab» i demoen.

Måleskriptene er i repoet og kan kjøres på nytt:
`packages/kobber/scripts/contrast-report.mjs` (WCAG-kontrast på alle
fargepar) og `apps/demo/scripts/axe-audit.mjs` (axe over alle sider).

## Layout

```
packages/
  kobber/        # biblioteket — speiler Kobber-Figmaen, ingenting annet
  kobber-lab/    # komponentFORSLAG til Kobber-teamet (bygget på Kobber-tokens)
apps/
  demo/          # galleri + eksempelsider; bygger også prerendret statisk.html
docs/
  components/    # per-komponent bruk & UU-ansvar
  proposals/     # forslagsdokumentene bak kobber-lab
  *.md           # feedback-dokumentene over + adoption.md + a11y-audit.md
CLAUDE.md        # arbeidsregler og guardrails (også for KI-agenter)
TODO.md          # gjenstående roadmap
```

`kobber` konsumeres som kildepakke (`exports` peker på `src/`) — demoen
og testene kjører alltid mot siste kode uten byggesteg. Import:

```ts
import { Button, Filter } from "kobber"; // forslag fra "kobber-lab"
import { tokens, typography } from "kobber/styles";
```

## Kom i gang (pnpm + Vite+ `vp`)

```bash
pnpm install
pnpm run dev        # demo på localhost
pnpm exec vp test   # vitest — 112 tester, inkl. SSR + hydrering
pnpm exec vp lint   # oxlint
pnpm exec vp fmt    # oxfmt
pnpm run typecheck  # tsgo (TypeScript 7 native preview)
pnpm run build      # demo + prerender av statisk.html
```

Verifisert på **React 18.3 og 19** (peer deps `^18.3 || ^19`). Hver push
til `main` kjører lint/test/typecheck/build og deployer demoen til
GitHub Pages.

## Kvalitetsgarantier

- **Tokens-only**: ingen råverdier i komponentfiler; alt går gjennom
  `styles/tokens.ts` (eneste importør av `@gyldendal/kobber-tokens`).
- **UU**: WAI-ARIA APG-mønstre per komponent (test-låst), axe-feiet på
  alle sider i desktop + mobil, kontrastmålt (se `docs/a11y-audit.md`;
  eneste gjenstående funn er upstream token-drift).
- **SSR/SSG**: hver komponent renderToString + hydreres uten feil
  (`tests/ssr.test.tsx` i begge pakker); demoen prerendrer
  komponentsiden som bevis.
- **Router-vennlig**: lenkekomponenter tar `as={Link}`
  (react-router/TanStack/Next), skjemakontroller er `forwardRef`
  (se `docs/components/router-links.md`).

## Videre

- [`CLAUDE.md`](CLAUDE.md) — arbeidsreglene: guardrails, komponent-
  oppskriften, workflow for nye komponenter. Les denne før du endrer noe.
- [`docs/adoption.md`](docs/adoption.md) — planen for flytting inn i et
  konsument-monorepo + backloggen for bred gjenbruk (publiseringsbygg,
  kodesnutter i galleriet, komplette komponentdocs).
- [`TODO.md`](TODO.md) — gjenstående komponenter og fundamenter
  (DAM-fonter/-ikoner, theming, Slider …).
