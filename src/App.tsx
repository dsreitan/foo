import { Button } from './components'
import * as styles from './App.css'

interface ComponentDemo {
  name: string
  description: string
  demo: React.ReactNode
}

const components: ComponentDemo[] = [
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
