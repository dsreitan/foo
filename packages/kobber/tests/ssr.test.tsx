/**
 * Prerender smoke test: every component must render with react-dom/server
 * (no window/document at render time) and hydrate the resulting static
 * HTML without mismatches. Add every new component to the matrix.
 */
import { act, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import {
  AccordionGroup,
  AccordionItem,
  AlertAccordion,
  AlertBanner,
  AlertLabel,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Checkbox,
  Collapsible,
  ContentCard,
  ContextualNavigationBar,
  Counter,
  Divider,
  Dropdown,
  DropdownItem,
  Filter,
  InfoCard,
  List,
  ListItem,
  Logo,
  MenuItem,
  NavLink,
  NavLinkGroup,
  NavigationBar,
  NavigationCard,
  Popover,
  ProductCard,
  ProfileCard,
  QuoteModule,
  Radiobutton,
  Search,
  Switch,
  Text,
  TextArea,
  TextInput,
  TextLink,
  TextModule,
} from "../src";

const noop = () => {};
const image = <div style={{ height: "100%" }} />;

const cases: [string, ReactElement][] = [
  [
    "Accordion",
    <AccordionGroup>
      <AccordionItem title="Hva er Kobber?">Gyldendals designsystem.</AccordionItem>
    </AccordionGroup>,
  ],
  ["AlertLabel", <AlertLabel severity="success">Lagret</AlertLabel>],
  [
    "AlertBanner",
    <AlertBanner severity="informative" onDismiss={noop}>
      Ny versjon
    </AlertBanner>,
  ],
  [
    "AlertAccordion",
    <AlertAccordion severity="warning" title="3 oppgaver mangler svar">
      Detaljer
    </AlertAccordion>,
  ],
  [
    "Badge",
    <Badge color="brand" tone="b">
      Nyhet
    </Badge>,
  ],
  [
    "Breadcrumb",
    <Breadcrumb>
      <BreadcrumbItem href="#/">Hjem</BreadcrumbItem>
      <BreadcrumbItem>Matematikk</BreadcrumbItem>
    </Breadcrumb>,
  ],
  ["Button", <Button onClick={noop}>Lagre</Button>],
  [
    "ButtonGroup",
    <ButtonGroup>
      <Button>Lagre</Button>
      <Button variant="brand-tertiary-a">Avbryt</Button>
    </ButtonGroup>,
  ],
  ["Checkbox", <Checkbox label="Godta vilkår" defaultChecked />],
  ["Collapsible", <Collapsible collapsedHeight={72}>Lang tekst</Collapsible>],
  [
    "ContentCard",
    <ContentCard title="Nye læreplaner" meta={<Badge>Artikkel</Badge>} image={image}>
      Ingress
    </ContentCard>,
  ],
  [
    "ContextualNavigationBar",
    <ContextualNavigationBar actions={<Button>Ny</Button>}>
      <MenuItem href="#/" active>
        Oversikt
      </MenuItem>
      <MenuItem href="#/">Oppgaver</MenuItem>
    </ContextualNavigationBar>,
  ],
  ["Counter", <Counter color="brand-a">3</Counter>],
  ["Divider", <Divider />],
  [
    "Dropdown",
    <Dropdown label="Læremidler">
      <DropdownItem onClick={noop}>Grunnskole</DropdownItem>
    </Dropdown>,
  ],
  [
    "Filter",
    <Filter selected count={10} onClick={noop}>
      Norsk
    </Filter>,
  ],
  [
    "InfoCard",
    <InfoCard title="Sigrid Undset" image={image}>
      Forfatter
    </InfoCard>,
  ],
  [
    "List",
    <List>
      <ListItem>Utforskende oppgaver</ListItem>
    </List>,
  ],
  ["Logo", <Logo alt="Gyldendal" />],
  ["MenuItem", <MenuItem href="#/">Oversikt</MenuItem>],
  [
    "NavLinkGroup",
    <NavLinkGroup label="Meny">
      <NavLink href="#/" active>
        Læremidler
      </NavLink>
    </NavLinkGroup>,
  ],
  [
    "NavigationBar",
    <NavigationBar logo={<Logo />} onSearchClick={noop} onProfileClick={noop}>
      <Dropdown label="Læremidler">
        <DropdownItem onClick={noop}>Grunnskole</DropdownItem>
      </Dropdown>
    </NavigationBar>,
  ],
  ["NavigationCard", <NavigationCard href="#/" title="Grunnskole" image={image} />],
  ["Popover", <Popover trigger={<Button>Vis detaljer</Button>}>Innhold</Popover>],
  ["ProductCard", <ProductCard href="#/" title="Matematikk 5" subtitle="Grunnbok" image={image} />],
  [
    "ProfileCard",
    <ProfileCard title="Ola Nordmann" image={image}>
      Redaktør
    </ProfileCard>,
  ],
  [
    "QuoteModule",
    <QuoteModule attribution="Sigrid Undset" image={image}>
      Å lese er å leve dobbelt.
    </QuoteModule>,
  ],
  ["Radiobutton", <Radiobutton name="ssr" label="Bokmål" defaultChecked />],
  ["Search", <Search onChange={noop} />],
  ["Switch", <Switch label="Varsler" defaultChecked />],
  [
    "Text",
    <Text variant="heading" size="medium" as="h1">
      Overskrift
    </Text>,
  ],
  ["TextArea", <TextArea label="Melding" />],
  ["TextInput", <TextInput label="Navn" />],
  ["TextLink", <TextLink href="#/">Les mer</TextLink>],
  [
    "TextModule",
    <TextModule color="brand-b" aria-label="Om">
      <Text variant="title">Om</Text>
    </TextModule>,
  ],
];

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("prerendered static HTML", () => {
  it.each(cases)("%s server-renders and hydrates without mismatch", async (_name, element) => {
    const html = renderToString(element);
    expect(html.length).toBeGreaterThan(0);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const errors: unknown[][] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args));
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, element);
    });
    await act(async () => root.unmount());
    spy.mockRestore();
    container.remove();
    expect(errors).toEqual([]);
  });
});
