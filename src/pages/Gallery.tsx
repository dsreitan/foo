import { useState } from 'react'
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  Filter,
  NavigationBar,
  Text,
  TextInput,
} from '../components'
import * as styles from '../App.css'

interface ComponentDemo {
  name: string
  description: string
  demo: React.ReactNode
}

function FilterDemo() {
  const [selected, setSelected] = useState(false)
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
  )
}

const components: ComponentDemo[] = [
  {
    name: 'Navigation Bar',
    description:
      'Toppbar med logo, meny, søk og profil. Menypunkter sendes inn som children med egne props; søketrigger og profilknapp eies av navbaren og får onSearchClick/onProfileClick.',
    demo: (
      <NavigationBar
        style={{ width: '100%' }}
        logo={<span>Gyldendal</span>}
        onSearchClick={() => console.log('søk')}
        onProfileClick={() => console.log('profil')}
      >
        <Dropdown label="Læremidler">
          <DropdownItem onClick={() => console.log('grunnskole')}>Grunnskole</DropdownItem>
          <DropdownItem onClick={() => console.log('vgs')}>Videregående</DropdownItem>
        </Dropdown>
        <Dropdown label="Forfattere">
          <DropdownItem onClick={() => console.log('skjønnlitteratur')}>
            Skjønnlitteratur
          </DropdownItem>
          <DropdownItem onClick={() => console.log('sakprosa')}>Sakprosa</DropdownItem>
        </Dropdown>
        <Button variant="brand-tertiary-a" onClick={() => console.log('om oss')}>
          Om oss
        </Button>
      </NavigationBar>
    ),
  },
  {
    name: 'Dropdown',
    description:
      'Utløser med utvidbar meny (som i navigasjonsbaren). Menypunkter er children med egne onClick.',
    demo: (
      <>
        <Dropdown label="Plain">
          <DropdownItem onClick={() => console.log('a')}>Alternativ A</DropdownItem>
          <DropdownItem onClick={() => console.log('b')}>Alternativ B</DropdownItem>
          <DropdownItem onClick={() => console.log('c')}>Alternativ C</DropdownItem>
        </Dropdown>
        <Dropdown label="Filled" appearance="filled">
          <DropdownItem onClick={() => console.log('x')}>Alternativ X</DropdownItem>
          <DropdownItem onClick={() => console.log('y')}>Alternativ Y</DropdownItem>
        </Dropdown>
      </>
    ),
  },
  {
    name: 'Text input',
    description:
      'Basert på _text-input-tokens (under arbeid i Kobber). Native input-props går rett gjennom.',
    demo: (
      <>
        <TextInput label="Navn" placeholder="Skriv navnet ditt" />
        <TextInput label="E-post" type="email" placeholder="navn@gyldendal.no" />
        <TextInput label="Deaktivert" disabled placeholder="Ikke tilgjengelig" />
      </>
    ),
  },
  {
    name: 'Text',
    description:
      'Typografi fra tekst-tokens. Interaktive komponenter komponerer stilene direkte; <Text> er for innhold.',
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text variant="display" size="medium" as="span">
          Display
        </Text>
        <Text variant="heading" size="medium" as="span">
          Heading medium
        </Text>
        <Text variant="title">Title medium</Text>
        <Text>
          Body medium – standard brødtekst for løpende innhold, artikler og
          beskrivelser.
        </Text>
        <Text variant="label" size="small">
          Label small
        </Text>
      </div>
    ),
  },
  {
    name: 'Filter',
    description:
      'Brukes når man endrer hva som vises innenfor samme grensesnitt. Klikk for å veksle aktiv tilstand.',
    demo: <FilterDemo />,
  },
  {
    name: 'Badge',
    description: 'Liten status-/kategorimerkelapp med fargetema, toner og størrelser.',
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
    name: 'Button',
    description:
      'Utfører en handling. Varianter: farge (brand/neutral + UI-fargene success/warning/informative) × nivå (primary/secondary/tertiary) × tone (a/b).',
    demo: (
      <>
        <div style={{ display: 'contents' }}>
          <Button>Brand primary</Button>
          <Button variant="brand-secondary-a">Brand secondary a</Button>
          <Button variant="brand-secondary-b">Brand secondary b</Button>
          <Button variant="brand-tertiary-a">Brand tertiary</Button>
        </div>
        <div style={{ display: 'contents' }}>
          <Button variant="neutral-primary-a">Neutral primary</Button>
          <Button variant="neutral-secondary-b">Neutral secondary</Button>
          <Button variant="neutral-tertiary-a">Neutral tertiary</Button>
        </div>
        <div style={{ display: 'contents' }}>
          <Button variant="success-a">Success a</Button>
          <Button variant="success-b">Success b</Button>
          <Button variant="warning-a">Warning a</Button>
          <Button variant="warning-b">Warning b</Button>
          <Button disabled>Deaktivert</Button>
        </div>
      </>
    ),
  },
]

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
  )
}
