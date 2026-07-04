# kobber-lab — forslag til Kobber-teamet

Komponenter vi trenger i produktene våre som ikke finnes i Kobber ennå.
Alt er bygget på Kobber-tokens og følger bibliotekets mønstre, slik at et
forslag kan flyttes inn i designsystemet uten omskriving.

Hvert forslag har et dokument i `docs/proposals/<navn>.md` med motivasjon,
anatomi, foreslåtte tokens, tilgjengelighet og animasjonsforslag.
Demoer ligger under «Lab» i demo-appen.

Ingenting her er offisielt Kobber — pakken er et prioriteringsunderlag.
Når Kobber-teamet designer komponenten i Figma, implementeres den i
`packages/kobber` og fjernes herfra.

## Flere kandidater (fra MUI og shadcn/ui)

Komponenter begge de store bibliotekene har, som Kobber mangler og
produktene våre kommer til å trenge — ikke implementert her ennå:

- **Select** — stylet nedtrekksvalg for skjema (Dropdown er en meny,
  ikke et skjemafelt).
- **Pagination** — sidenavigasjon for søkeresultater og lange lister.
- **Data table** — sorterbar tabell med Kobber-typografi; i dag styler
  hver app sin egen (se elevoversikten i demoen).
- **Drawer/Sheet** — skuff fra sidekanten for filtre og detaljer på
  mobil.
- **Stepper** — flytstegindikator for innleverings- og kjøpsløp.
- **Command palette** — hurtigsøk på tvers (jf. VS Code Ctrl+K); bygger
  på Dialog + Search.
- **Empty state** — standardisert tom-tilstand med illustrasjonsslot
  fra DAM.
