# Router links (`as`-prop)

All link components render a plain `<a href>` by default and accept an
`as` prop for client-side router links: **TextLink, MenuItem, NavLink,
BreadcrumbItem, NavigationCard, ProductCard**.

The rendered component's own props are typed from `as`, so `to`,
`prefetch` osv. autocompleter og typesjekkes:

```tsx
import { Link } from "react-router";          // eller @tanstack/react-router
import NextLink from "next/link";

<TextLink as={Link} to="/laeremidler">Læremidler</TextLink>
<MenuItem as={Link} to="/oversikt" active>Oversikt</MenuItem>
<NavigationCard as={NextLink} href="/omrade" title="Grunnskole" image={…} />
<BreadcrumbItem as={Link} to="/laeremidler">Læremidler</BreadcrumbItem>
```

Komponentens egne props (`active`, `overlay`, `disabled`, `className`
...) fungerer likt uansett `as`. Uten `as` er alt som før: `href` på en
vanlig `<a>`.

## Hva komponenten eier vs. ruteren

- Komponenten eier utseende og ARIA (`aria-current="page"` på aktive
  MenuItem/NavLink, landemerker, fokusring).
- Ruteren eier navigasjonen (scroll, prefetch, basename).
- `active`/`aria-current` settes fortsatt av deg — routere vet hvilken
  rute som er aktiv (f.eks. react-routers `NavLink` render-prop eller
  `useMatch`), Kobber-komponenten gjør ikke det.

## Refs (React 18)

Skjemakontrollene og Button/Filter er `forwardRef` og eksponerer sitt
native element (`<input>`, `<textarea>`, `<select>`, `<button>`), for
fokusstyring og skjemabibliotek (react-hook-form o.l.):

```tsx
const inputRef = useRef<HTMLInputElement>(null);
<TextInput ref={inputRef} label="Navn" />;
inputRef.current?.focus();
```

Gjelder: Button, Filter, TextInput, TextArea, Search, Checkbox,
Radiobutton, Switch (+ Select i kobber-lab). På React 19 flyter ref som
vanlig prop også til de øvrige komponentene som sprer `...props`.
