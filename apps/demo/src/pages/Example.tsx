import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  Filter,
  NavigationBar,
  Text,
  TextInput,
} from "kobber";
import * as styles from "./Example.css";

const books = [
  {
    title: "Matematikk 5",
    category: { label: "Grunnskole", color: "brand", tone: "b" },
    description: "Utforskende matematikk for mellomtrinnet, med differensierte oppgaver.",
  },
  {
    title: "Norsk rettskrivning",
    category: { label: "Rettsdata", color: "rettsdata", tone: "a" },
    description: "Oppslagsverk for korrekt og konsekvent språk i juridiske tekster.",
  },
  {
    title: "Naturfag 8–10",
    category: { label: "Ungdomsskole", color: "neutral", tone: "b" },
    description: "Praktisk naturfag med forsøk, feltarbeid og digitale simuleringer.",
  },
] as const;

const filters = ["Grunnskole", "Videregående", "Høyere utdanning"] as const;

/**
 * Composed example page: every component in the library used together
 * the way a product page would.
 */
export function Example() {
  const [active, setActive] = useState<string[]>(["Grunnskole"]);

  const toggle = (name: string) =>
    setActive((current) =>
      current.includes(name) ? current.filter((f) => f !== name) : [...current, name],
    );

  return (
    <>
      <NavigationBar
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

      <main className={styles.main}>
        <div className={styles.intro}>
          <Text variant="heading" size="large" as="h1">
            Læremidler
          </Text>
          <Text variant="lead" as="p">
            Solide, sammenhengende og universelt tilgjengelige læremidler for skolen og høyere
            utdanning.
          </Text>
        </div>

        <div className={styles.filterRow}>
          {filters.map((name) => (
            <Filter
              key={name}
              selected={active.includes(name)}
              count={name.length}
              onClick={() => toggle(name)}
            >
              {name}
            </Filter>
          ))}
        </div>

        <div className={styles.cardGrid}>
          {books.map((book) => (
            <article key={book.title} className={styles.card}>
              <Badge color={book.category.color} tone={book.category.tone} statusCircle>
                {book.category.label}
              </Badge>
              <Text variant="title" as="h2">
                {book.title}
              </Text>
              <Text as="p" className={styles.cardBody}>
                {book.description}
              </Text>
              <Button variant="brand-secondary-b" onClick={() => console.log(book.title)}>
                Les mer
              </Button>
            </article>
          ))}
        </div>

        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <TextInput label="E-post" type="email" placeholder="navn@gyldendal.no" />
          <Button variant="success-a" type="submit">
            Meld meg på nyhetsbrev
          </Button>
        </form>
      </main>
    </>
  );
}
