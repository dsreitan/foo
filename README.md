# Kobber-referanse — audit, anbefalinger og komponentforslag

Referansedokumentasjon for Gyldendals
[Kobber-designsystem](https://kobber.gyldendal.no/), basert på en
React/vanilla-extract-PoC bygget fra
[`@gyldendal/kobber-tokens`](https://www.npmjs.com/package/@gyldendal/kobber-tokens)
og [Figma-filen](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek)
(kun lesing).

**PoC-koden skal ikke overføres til produksjon.** Dokumentasjonen,
målingene og issue-klare akseptansekriterier skal brukes i de ekte
Kobber-repoene. Referansen omfatter 33 komponentfamilier, 12
komponentforslag, 112 tester og en kuratert kontrastmatrise på 41 par.

**Arkivert referansedemo:** <https://dsreitan.github.io/foo/> — visuelt
bevismateriale, ikke en produksjons- eller distribusjonskanal.

## Til Kobber-teamet: start her

PoC-en konsumerte de publiserte tokenene programmatisk og leste
Figma-filen via API. Start med handoff-planen:

1. **[`docs/token-quality-roadmap.md`](docs/token-quality-roadmap.md)** —
   prioriterte, issue-klare feil og forbedringer med
   akseptansekriterier og testopplegg. Her ligger også de nye
   formatfeilene: CSS-navnekollisjon og tapte nullverdier.
2. **[`docs/design-system-review.md`](docs/design-system-review.md)** —
   hoveddokumentet: arkitekturnivået, sammenlignet med Material 3,
   Carbon, Polaris, Spectrum, Primer og Atlassian, pluss hvordan en
   KI-agent helst konsumerer et designsystem. Ni funn, fem prioriterte
   anbefalinger.
3. [`docs/upstream-findings.md`](docs/upstream-findings.md) — de
   konkrete funnene, klare til å limes inn i issues (token-drift som
   bryter WCAG på primærknappen, generatorfeil og 41 kuraterte
   kontrastpar).
4. [`docs/token-modes.md`](docs/token-modes.md) — anbefalinger for
   variabel-modes (mørk modus, barnemodus, temaer).
5. [`docs/responsive-tokens.md`](docs/responsive-tokens.md) — hvordan
   uttrykke flytende `clamp()`-verdier i tokens og Figma.
6. [`docs/proposals/`](docs/proposals/) — 12 komponentforslag
   (motivasjon, anatomi, foreslåtte tokens, UU, animasjonsspek) med
   kjørbare demoer under «Lab» i demoen.

Pakkeanalysen ble re-verifisert mot npm 13.0.0 den 2026-07-20.
Figma-observasjoner er fra 2026-07-04 og må sjekkes igjen før
verdiendringer. Historiske måleskript ligger i:
`packages/kobber/scripts/contrast-report.mjs` (WCAG-kontrast på alle
kuraterte par) og `apps/demo/scripts/axe-audit.mjs` (axe; eksternt
Playwright/axe-oppsett kreves).

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
import { Button, Filter } from "kobber";
import { Dialog } from "kobber-lab"; // forslag, ikke en Kobber-komponent
import { tokens, typography } from "kobber/styles";
```

`packages/` og `apps/demo/` er referanseartefakter. Importeksempelet
over forklarer testoppsettet; det er ikke en adopsjonsanbefaling.

## Reprodusere PoC-evidens (valgfritt)

```bash
pnpm install
pnpm run dev        # demo på localhost
pnpm exec vp test   # vitest — 112 tester, inkl. SSR + hydrering
pnpm exec vp lint   # oxlint
pnpm exec vp fmt    # oxfmt
pnpm run typecheck  # tsgo (TypeScript 7 native preview)
pnpm run build      # demo + prerender av statisk.html
```

React 18.3 ble verifisert i en datert lokal kjøring. Nåværende CI
installerer React 19 og kjører lint/test/typecheck/build før den
arkiverte demoen deployes.

## Hva PoC-en faktisk validerte

- **Tokens:** hoveddelen av komponentstyling gikk gjennom
  `styles/tokens.ts`; noen dokumenterte råverdi-unntak finnes, så dette
  er ikke en upstream-garanti.
- **UU:** axe ble kjørt på 12 hash-ruter + `statisk.html` på desktop og
  bare `#/` på mobil. Kontrastmatrisen har 2 brudd av 41 kuraterte par
  på npm 13.0.0. Se begrensninger og handoff-varsler i
  `docs/a11y-audit.md`.
- **SSR/SSG**: hver komponent renderToString + hydreres uten feil
  i PoC-testene; demoen prerendrer komponentsiden som historisk bevis.
- **Router-vennlig**: lenkekomponenter tar `as={Link}`
  i referanse-API-et. Overfør kontrakten, ikke implementasjonen.

## Videre

- [`CLAUDE.md`](CLAUDE.md) — arbeidsreglene: guardrails, komponent-
  oppskriften, workflow for nye komponenter. Les denne før du endrer noe.
- [`docs/adoption.md`](docs/adoption.md) — dokument-handoff: hva som
  skal og ikke skal overføres til de ekte repoene.
- [`TODO.md`](TODO.md) — historisk dekningsmatrise og upstream-gap, ikke
  en aktiv kode-roadmap.
