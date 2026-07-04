# Forslag: Dialog (modal)

## Motivasjon

Produktene trenger bekreftelser og fokuserte oppgaver (slett innlevering,
del ressurs). I dag finnes ingen Kobber-modal; team bygger egne.

## Anatomi og foreslåtte tokens

Native `<dialog>`-element. Flate og skygge gjenbruker popover-tokens
(`popover/background`, `popover/border/radius`, `popover/effect/shadow`).
Backdrop: `aubergine-1000-20`. Nye tokens som trengs:
`dialog/size/*`, `dialog/backdrop/color`.

## Tilgjengelighet

Fokusfelle, fokus-retur og Escape kommer gratis fra `<dialog>`/`showModal`.
Tittel er en `<h2>`; lukkeknapp med overstyrbar norsk etikett.

## Animasjonsforslag

Inn: fade + 8px løft, 240 ms, easing `cubic-bezier(0.2, 0, 0, 1)`.
Backdrop: ren fade, samme varighet. `prefers-reduced-motion`: ingen animasjon.
