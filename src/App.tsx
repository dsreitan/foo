import { useState } from 'react'
import { Badge, Button, Filter } from './components'
import * as styles from './App.css'

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

function App() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Kobber komponenter</h1>
        <p className={styles.subtitle}>
          React-komponentbibliotek basert på Kobber-designsystemet i Figma.
          Bygget med Vite og vanilla-extract.
        </p>
      </header>

      {components.map((component) => (
        <section key={component.name} className={styles.card}>
          <h2 className={styles.componentName}>{component.name}</h2>
          <p>{component.description}</p>
          <div className={styles.demoRow}>{component.demo}</div>
        </section>
      ))}
    </main>
  )
}

export default App
