import { useState } from "react";
import {
  AlertAccordion,
  AlertBanner,
  AlertLabel,
  Badge,
  Button,
  Checkbox,
  Counter,
  Dropdown,
  DropdownItem,
  Filter,
  NavigationBar,
  Radiobutton,
  Search,
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
        logo={<span>Gyldendal</span>}
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

export function Gallery() {
  return (
    <>
      {components.map((component) => (
        <section key={component.name} className={styles.card}>
          <h2 className={styles.componentName}>{component.name}</h2>
          <p>{component.description}</p>
          <div className={styles.demoRow}>{component.demo}</div>
        </section>
      ))}
    </>
  );
}
