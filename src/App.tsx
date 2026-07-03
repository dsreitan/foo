import { useState } from 'react'
import { Button, Filter } from './components'
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
    name: 'Button',
    description: 'Primary and secondary actions.',
    demo: (
      <>
        <Button>Primær</Button>
        <Button variant="secondary">Sekundær</Button>
        <Button disabled>Deaktivert</Button>
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
