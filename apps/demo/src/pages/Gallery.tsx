import { useState } from "react";
import {
  AccordionGroup,
  AccordionItem,
  AlertAccordion,
  AlertBanner,
  AlertLabel,
  ButtonGroup,
  Collapsible,
  Divider,
  ContextualNavigationBar,
  InfoCard,
  Logo,
  MenuItem,
  NavigationCard,
  NavLink,
  NavLinkGroup,
  Popover,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  ContentCard,
  Counter,
  List,
  ListItem,
  ProductCard,
  TextLink,
  Dropdown,
  DropdownItem,
  Filter,
  NavigationBar,
  ProfileCard,
  QuoteModule,
  Radiobutton,
  Search,
  TextModule,
  Switch,
  Text,
  TextArea,
  TextInput,
} from "kobber";
import * as styles from "../App.css";

interface ComponentDemo {
  name: string;
  description: string;
  demo: React.ReactNode;
}

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

function FilterDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <Filter selected={selected} count={10} onClick={() => setSelected(!selected)}>
        Filter text
      </Filter>
      <Filter onClick={() => {}}>Uten teller</Filter>
      <Filter count={120} onClick={() => {}}>
        Mange treff
      </Filter>
      <Filter disabled count={10}>
        Deaktivert
      </Filter>
    </>
  );
}

const components: ComponentDemo[] = [
  {
    name: "Navigation Bar",
    description:
      "Toppbar med logo, meny, søk og profil. Menypunkter sendes inn som children med egne props; søketrigger og profilknapp eies av navbaren og får onSearchClick/onProfileClick.",
    demo: (
      <NavigationBar
        style={{ width: "100%" }}
        logo={<Logo />}
        onSearchClick={() => console.log("søk")}
        onProfileClick={() => console.log("profil")}
      >
        <Dropdown label="Læremidler">
          <DropdownItem onClick={() => console.log("grunnskole")}>Grunnskole</DropdownItem>
          <DropdownItem onClick={() => console.log("vgs")}>Videregående</DropdownItem>
        </Dropdown>
        <Dropdown label="Forfattere">
          <DropdownItem onClick={() => console.log("skjønnlitteratur")}>
            Skjønnlitteratur
          </DropdownItem>
          <DropdownItem onClick={() => console.log("sakprosa")}>Sakprosa</DropdownItem>
        </Dropdown>
        <Button variant="brand-tertiary-a" onClick={() => console.log("om oss")}>
          Om oss
        </Button>
      </NavigationBar>
    ),
  },
  {
    name: "Dropdown",
    description:
      "Utløser med utvidbar meny (som i navigasjonsbaren). Menypunkter er children med egne onClick.",
    demo: (
      <>
        <Dropdown label="Plain">
          <DropdownItem onClick={() => console.log("a")}>Alternativ A</DropdownItem>
          <DropdownItem onClick={() => console.log("b")}>Alternativ B</DropdownItem>
          <DropdownItem onClick={() => console.log("c")}>Alternativ C</DropdownItem>
        </Dropdown>
        <Dropdown label="Filled" appearance="filled">
          <DropdownItem onClick={() => console.log("x")}>Alternativ X</DropdownItem>
          <DropdownItem onClick={() => console.log("y")}>Alternativ Y</DropdownItem>
        </Dropdown>
      </>
    ),
  },
  {
    name: "Contextual navigation bar",
    description:
      "Sekundær bar under hovednavigasjonen for seksjonsnivå. Basert på WIP-tokens. MenuItems som children, handlinger i actions.",
    demo: (
      <ContextualNavigationBar
        style={{ width: "100%" }}
        actions={<Button variant="brand-secondary-b">Ny oppgave</Button>}
      >
        <MenuItem href="#/" active>
          Oversikt
        </MenuItem>
        <MenuItem href="#/">Oppgaver</MenuItem>
        <MenuItem href="#/">Resultater</MenuItem>
      </ContextualNavigationBar>
    ),
  },
  {
    name: "Menu item",
    description:
      "Rad i menyer og sidenavigasjon. Lenke med href, ellers knapp; active gir aria-current og understrek.",
    demo: (
      <nav aria-label="Eksempelmeny" style={{ width: 280 }}>
        <MenuItem href="#/" active>
          Norsk
        </MenuItem>
        <MenuItem href="#/">Matematikk</MenuItem>
        <MenuItem href="#/" nested>
          Geometri
        </MenuItem>
        <MenuItem onClick={() => console.log("logg ut")}>Logg ut</MenuItem>
      </nav>
    ),
  },
  {
    name: "Popover",
    description:
      "Flytende flate forankret i utløseren; lukker på Escape (med fokus tilbake) og klikk utenfor.",
    demo: (
      <Popover trigger={<Button variant="brand-secondary-b">Vis detaljer</Button>}>
        <Text variant="label" size="medium" as="p">
          Sist endret 3. juli av Dagfinn. Delt med 4 personer.
        </Text>
      </Popover>
    ),
  },
  {
    name: "Logo",
    description: "Plassholder-ordmerke til logoen kommer fra DAM-CDN-en (se docs/dam.md).",
    demo: <Logo alt="Gyldendal" />,
  },
  {
    name: "Navigation card",
    description: "Bildekort som er én lenke inn til et område; overlay-tone etter bildets lyshet.",
    demo: (
      <div style={{ display: "flex", gap: 24, width: "100%" }}>
        <div style={{ width: 280 }}>
          <NavigationCard
            href="#/"
            title="Grunnskole"
            image={
              <div
                style={{ height: "100%", background: "linear-gradient(160deg, #f5c9d3, #f9eaed)" }}
              />
            }
          />
        </div>
        <div style={{ width: 280 }}>
          <NavigationCard
            href="#/"
            title="Videregående"
            overlay="overlay-light"
            image={
              <div
                style={{ height: "100%", background: "linear-gradient(160deg, #481125, #8a224a)" }}
              />
            }
          />
        </div>
      </div>
    ),
  },
  {
    name: "Info card",
    description:
      "Presentasjon av person eller enhet; portrettbilder skal ha meningsfull alt-tekst.",
    demo: (
      <InfoCard
        title="Sigrid Undset"
        image={
          <div
            role="img"
            aria-label="Portrett av Sigrid Undset"
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(160deg, #884d5d, #691837)",
            }}
          />
        }
      >
        <Text as="p" variant="label" size="medium">
          Forfatter · Nobelprisen i litteratur 1928
        </Text>
        <TextLink href="#/">Se forfatterside</TextLink>
      </InfoCard>
    ),
  },
  {
    name: "Quote module",
    description:
      "Sitatmodul med figure/blockquote-semantikk, valgfritt rundt bilde og attribusjon.",
    demo: (
      <QuoteModule
        attribution="Sigrid Undset, forfatter"
        image={
          <div
            role="img"
            aria-label="Portrett av Sigrid Undset"
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(160deg, #884d5d, #691837)",
            }}
          />
        }
      >
        Å lese er å leve dobbelt.
      </QuoteModule>
    ),
  },
  {
    name: "Text module",
    description:
      "Farget tekstseksjon; tekstfargen arves fra flaten slik at Text/List/TextLink følger tonen.",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        <TextModule color="brand-b" aria-label="Om læremidlene">
          <Text variant="title">Om læremidlene</Text>
          <Text>Alle læremidler følger fagfornyelsen og er universelt utformet.</Text>
        </TextModule>
        <TextModule color="brand-a" aria-label="Kontakt">
          <Text variant="title">Kontakt oss</Text>
          <Text>Kundeservice svarer alle hverdager 08–16.</Text>
        </TextModule>
      </div>
    ),
  },
  {
    name: "Profile card",
    description: "Stablet personkort: portrett over navn og detaljer.",
    demo: (
      <div style={{ width: 240 }}>
        <ProfileCard
          title="Ola Nordmann"
          image={
            <div
              role="img"
              aria-label="Portrett av Ola Nordmann"
              style={{ height: 180, background: "linear-gradient(160deg, #cfd5dd, #697684)" }}
            />
          }
        >
          <Text as="p" variant="label" size="medium">
            Redaktør, norsk skjønnlitteratur
          </Text>
        </ProfileCard>
      </div>
    ),
  },
  {
    name: "Nav link",
    description:
      "Navigasjonslenke med understrek på hover og aktiv side; grupperes i NavLinkGroup.",
    demo: (
      <NavLinkGroup label="Demo-meny">
        <NavLink href="#/" active>
          Læremidler
        </NavLink>
        <NavLink href="#/">Forfattere</NavLink>
        <NavLink href="#/" color="subtle">
          Om oss
        </NavLink>
        <NavLink href="#/" color="accent">
          Kampanje
        </NavLink>
      </NavLinkGroup>
    ),
  },
  {
    name: "Button group",
    description: "Rad med relaterte handlinger.",
    demo: (
      <ButtonGroup>
        <Button>Lagre</Button>
        <Button variant="brand-secondary-b">Forhåndsvis</Button>
        <Button variant="brand-tertiary-a">Avbryt</Button>
      </ButtonGroup>
    ),
  },
  {
    name: "Divider",
    description: "1px skillelinje, horisontal eller vertikal, i brand- og neutral-toner.",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
        <Divider />
        <Divider color="brand-a" />
        <Divider color="neutral-b" />
      </div>
    ),
  },
  {
    name: "Accordion",
    description: "Ekspanderbare rader på native <details>; grupperes i AccordionGroup.",
    demo: (
      <div style={{ width: "100%" }}>
        <AccordionGroup>
          <AccordionItem title="Hva er Kobber?">
            Gyldendals verktøykasse for design og merkevare.
          </AccordionItem>
          <AccordionItem title="Hvordan tas det i bruk?">
            Komponenter importeres fra kobber-pakken; tokens styrer all stil.
          </AccordionItem>
        </AccordionGroup>
      </div>
    ),
  },
  {
    name: "Collapsible",
    description: "«Vis mer»-klamme for langt innhold med gradient mot bakgrunnen.",
    demo: (
      <div style={{ width: 480 }}>
        <Collapsible collapsedHeight={72}>
          <Text>
            Kobber er Gyldendals verktøykasse for design og merkevare. Den består av gjenbrukbare,
            fleksible ressurser som digitale komponenter, maler, retningslinjer og kode.
            Byggeklossene brukes til å skape solide, sammenhengende og universelt tilgjengelige
            produkter, og videreutvikles fortløpende av Kobber-teamet i samarbeid med
            produktteamene.
          </Text>
        </Collapsible>
      </div>
    ),
  },
  {
    name: "Text link",
    description: "Innebygd lenke med aksent-understrek. Bruk Button for handlinger.",
    demo: (
      <p style={{ margin: 0 }}>
        Les mer om <TextLink href="#/">Kobber-designsystemet</TextLink> eller se{" "}
        <TextLink href="#/" disabled>
          arkiverte sider
        </TextLink>
        .
      </p>
    ),
  },
  {
    name: "Breadcrumb",
    description: "Stien opp hierarkiet; siste element uten href er gjeldende side.",
    demo: (
      <Breadcrumb>
        <BreadcrumbItem href="#/">Hjem</BreadcrumbItem>
        <BreadcrumbItem href="#/">Læremidler</BreadcrumbItem>
        <BreadcrumbItem>Matematikk 5</BreadcrumbItem>
      </Breadcrumb>
    ),
  },
  {
    name: "List",
    description: "Innholdslister med aksentfargede markører, ordnet og uordnet.",
    demo: (
      <div style={{ display: "flex", gap: 48 }}>
        <List>
          <ListItem>Utforskende oppgaver</ListItem>
          <ListItem>Differensiert innhold</ListItem>
          <ListItem>Digitale simuleringer</ListItem>
        </List>
        <List ordered>
          <ListItem>Les kapittelet</ListItem>
          <ListItem>Gjør oppgavene</ListItem>
          <ListItem>Lever innen fristen</ListItem>
        </List>
      </div>
    ),
  },
  {
    name: "Content card",
    description:
      "Artikkel-/innholdskort med bilde-, meta- og tittel-slots. Ikke interaktivt i seg selv.",
    demo: (
      <div style={{ display: "flex", gap: 24, width: "100%" }}>
        <div style={{ width: 280 }}>
          <ContentCard
            title="Nye læreplaner i praksis"
            meta={
              <Badge color="brand" tone="b">
                Artikkel
              </Badge>
            }
            image={
              <div
                style={{ height: "100%", background: "linear-gradient(135deg, #8a224a, #dc134f)" }}
              />
            }
          >
            Hvordan de nye læreplanene endrer klasserommet. <TextLink href="#/">Les mer</TextLink>
          </ContentCard>
        </div>
        <div style={{ flex: 1 }}>
          <ContentCard
            variant="subtle"
            title="Lesestrategier"
            image={
              <div
                style={{ height: "100%", background: "linear-gradient(135deg, #481125, #8a224a)" }}
              />
            }
          >
            Kort introduksjon til lesestrategier for mellomtrinnet.
          </ContentCard>
        </div>
      </div>
    ),
  },
  {
    name: "Product card",
    description:
      "Bok/produkt på farget flate; hele kortet er én lenke. Kun brand og neutral (temafarger er utenfor scope).",
    demo: (
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ width: 220 }}>
          <ProductCard
            href="#/"
            title="Matematikk 5"
            subtitle="Grunnbok · Bokmål"
            image={
              <div
                style={{
                  width: 120,
                  height: 170,
                  background: "#fdf9f9",
                  borderRadius: 4,
                  boxShadow: "0 2px 8px rgba(40,0,14,.2)",
                }}
              />
            }
          />
        </div>
        <div style={{ width: 220 }}>
          <ProductCard
            href="#/"
            color="neutral"
            title="Norsk 8–10"
            subtitle="Digital ressurs"
            image={
              <div
                style={{
                  width: 120,
                  height: 170,
                  background: "#f9fafb",
                  borderRadius: 4,
                  boxShadow: "0 2px 8px rgba(15,17,20,.2)",
                }}
              />
            }
          />
        </div>
      </div>
    ),
  },
  {
    name: "Alert",
    description:
      "Tre varsel-varianter: label (inline), banner (toppen av siden, kan lukkes) og accordion (ekspanderbar).",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <AlertLabel severity="success">Endringene er lagret</AlertLabel>
          <AlertLabel severity="informative">Ny versjon tilgjengelig</AlertLabel>
          <AlertLabel severity="warning">Feltet må fylles ut</AlertLabel>
        </div>
        <AlertBanner severity="informative" onDismiss={() => console.log("lukk")}>
          Vedlikehold planlagt søndag 02:00–04:00.
        </AlertBanner>
        <AlertAccordion severity="warning" title="3 oppgaver mangler svar">
          Oppgave 2, 5 og 7 er ikke besvart. Du kan levere likevel, men de teller som feil.
        </AlertAccordion>
      </div>
    ),
  },
  {
    name: "Counter",
    description: "Frittstående teller/bokstav-chip (samme kvadrat-minimum som i Filter).",
    demo: (
      <>
        <Counter>3</Counter>
        <Counter color="brand-a">12</Counter>
        <Counter color="brand-b">B</Counter>
        <Counter color="success">120</Counter>
        <Counter color="warning">!</Counter>
      </>
    ),
  },
  {
    name: "Checkbox",
    description: "Avkryssing med brand- og success-farger. Native input under panseret.",
    demo: (
      <>
        <Checkbox label="Godta vilkår" defaultChecked />
        <Checkbox label="Meld meg på nyhetsbrev" />
        <Checkbox label="Success" color="success" defaultChecked />
        <Checkbox label="Deaktivert" disabled defaultChecked />
      </>
    ),
  },
  {
    name: "Radiobutton",
    description: "Ett valg fra en gruppe. Grupperes med samme name.",
    demo: (
      <>
        <Radiobutton name="demo-radio" label="Bokmål" defaultChecked />
        <Radiobutton name="demo-radio" label="Nynorsk" />
        <Radiobutton name="demo-radio" label="Deaktivert" disabled />
      </>
    ),
  },
  {
    name: "Switch",
    description: "Av/på-bryter med role=switch.",
    demo: (
      <>
        <Switch label="Varsler" defaultChecked />
        <Switch label="Mørk modus" />
        <Switch label="Deaktivert" disabled />
      </>
    ),
  },
  {
    name: "Search",
    description: "Fullt søkefelt med hover-, fokus- og aktiv-tilstander fra search-tokens.",
    demo: <Search onChange={(e) => console.log(e.target.value)} />,
  },
  {
    name: "Text area",
    description: "Flerlinjet felt, deler stil med Text input.",
    demo: <TextArea label="Melding" placeholder="Skriv en melding" />,
  },
  {
    name: "Text input",
    description:
      "Basert på _text-input-tokens (under arbeid i Kobber). Native input-props går rett gjennom.",
    demo: (
      <>
        <TextInput label="Navn" placeholder="Skriv navnet ditt" />
        <TextInput label="E-post" type="email" placeholder="navn@gyldendal.no" />
        <TextInput label="Deaktivert" disabled placeholder="Ikke tilgjengelig" />
      </>
    ),
  },
  {
    name: "Text",
    description:
      "Typografi fra tekst-tokens. Interaktive komponenter komponerer stilene direkte; <Text> er for innhold.",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Text variant="display" size="medium" as="span">
          Display
        </Text>
        <Text variant="heading" size="medium" as="span">
          Heading medium
        </Text>
        <Text variant="title">Title medium</Text>
        <Text>Body medium – standard brødtekst for løpende innhold, artikler og beskrivelser.</Text>
        <Text variant="label" size="small">
          Label small
        </Text>
      </div>
    ),
  },
  {
    name: "Filter",
    description:
      "Brukes når man endrer hva som vises innenfor samme grensesnitt. Klikk for å veksle aktiv tilstand.",
    demo: <FilterDemo />,
  },
  {
    name: "Badge",
    description: "Liten status-/kategorimerkelapp med fargetema, toner og størrelser.",
    demo: (
      <>
        <Badge color="brand" tone="a" statusCircle>
          Brand tone-a
        </Badge>
        <Badge color="brand" tone="b">
          Brand tone-b
        </Badge>
        <Badge color="rettsdata" tone="a">
          Rettsdata tone-a
        </Badge>
        <Badge color="rettsdata" tone="b" statusCircle>
          Rettsdata tone-b
        </Badge>
        <Badge>Neutral</Badge>
        <Badge size="small" color="brand" tone="b" statusCircle>
          Small
        </Badge>
      </>
    ),
  },
  {
    name: "Button",
    description:
      "Utfører en handling. Varianter: farge (brand/neutral + UI-fargene success/warning/informative) × nivå (primary/secondary/tertiary) × tone (a/b).",
    demo: (
      <>
        <div style={{ display: "contents" }}>
          <Button>Brand primary</Button>
          <Button variant="brand-secondary-a">Brand secondary a</Button>
          <Button variant="brand-secondary-b">Brand secondary b</Button>
          <Button variant="brand-tertiary-a">Brand tertiary</Button>
        </div>
        <div style={{ display: "contents" }}>
          <Button variant="neutral-primary-a">Neutral primary</Button>
          <Button variant="neutral-secondary-b">Neutral secondary</Button>
          <Button variant="neutral-tertiary-a">Neutral tertiary</Button>
        </div>
        <div style={{ display: "contents" }}>
          <Button variant="success-a">Success a</Button>
          <Button variant="success-b">Success b</Button>
          <Button variant="warning-a">Warning a</Button>
          <Button variant="warning-b">Warning b</Button>
          <Button disabled>Deaktivert</Button>
        </div>
      </>
    ),
  },
];

export function Gallery({ hash }: { hash?: string }) {
  return (
    <div className={styles.galleryLayout}>
      <aside className={styles.aside}>
        <nav aria-label="Komponentoversikt">
          {components.map((component) => (
            <MenuItem
              key={component.name}
              href={`#${slug(component.name)}`}
              active={hash === `#${slug(component.name)}`}
            >
              {component.name}
            </MenuItem>
          ))}
        </nav>
      </aside>
      <div className={styles.sections}>
        {components.map((component) => (
          <section key={component.name} id={slug(component.name)} className={styles.card}>
            <h2 className={styles.componentName}>{component.name}</h2>
            <p>{component.description}</p>
            <div className={styles.demoRow}>{component.demo}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
