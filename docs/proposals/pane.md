# Forslag: Pane / Pane Group

## Motivasjon

Arbeidsflater — planleggingsverktøy, retteverktøy, innholdsredigering —
trenger paneler ved siden av hverandre som brukeren kan endre størrelse
på (jf. VS Code). Mønsteret er direkte inspirert av Material 3 sine
**panes** og **canonical layouts** (m3.material.io: fixed/flexible
panes, list-detail og supporting pane): faste paneler rundt ett
fleksibelt, egne avrundede flater per panel, og stabling når vinduet er
kompakt (M3s window size classes ↔ vårt desktop-brekkpunkt).

Verken Kobber-Figmaen eller tokens har noe panel-/pane-konsept i dag —
derfor lab-forslag.

## Anatomi og foreslåtte tokens

`PaneGroup` (flex-rad på desktop, kolonne på kompakte vinduer) med
`Pane`-barn: `defaultSize` gir et fast panel med håndtak
(`handle="start" | "end"` — kanten som vender mot det fleksible
panelet); uten `defaultSize` fyller panelet resten. `surface` gir
M3-aktig «surface container» (avrundet flate på popover-bakgrunnen).

Gjenbrukte tokens: divider-linjen, menu-item hover/pressed på
håndtaket, cards-and-modules radius/space for flaten. Nye tokens:
`pane/size/min` (180), `pane/size/max` (480), `pane/resize/step` (16).

## Tilgjengelighet

Håndtaket følger APG **window splitter**: `role="separator"`,
`aria-orientation="vertical"`, `aria-valuenow/-min/-max` (px),
overstyrbart navn («Endre bredde på {label}»), `tabIndex=0` med
fokusring. Piltaster flytter grensen (16 px steg), Home/End går til
min/maks — full paritet med musedraging. På kompakte vinduer stables
panelene og håndtakene forsvinner (ingen død funksjonalitet på touch).
Panelstørrelser er ren presentasjon; ingen innhold skjules ved minste
bredde.

## Animasjonsforslag

Ingen på selve resizingen — direkte manipulasjon skal følge pekeren
1:1. Ev. snap-tilbake ved dobbeltklikk kan bruke `motion.duration.base`
(240 ms), av ved `prefers-reduced-motion`.
