import {
  Button,
  ButtonGroup,
  ContentCard,
  NavigationCard,
  QuoteModule,
  Text,
  TextLink,
} from "kobber";
import { img } from "../lib";
import * as styles from "./pages.css";

const areas = [
  { title: "Komponenter", href: "#/komponenter", seed: "komponenter" },
  { title: "Søk", href: "#/sok", seed: "sok" },
  { title: "Nettbutikk", href: "#/butikk", seed: "butikk" },
  { title: "Dashbord", href: "#/dashbord", seed: "dashbord" },
  { title: "Presentasjon", href: "#/presentasjon", seed: "presentasjon" },
  { title: "Elever", href: "#/elever", seed: "elever" },
];

export function Landing() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Text variant="display" size="medium" as="h1">
          Kobber i praksis
        </Text>
        <Text variant="lead">
          Et React-komponentbibliotek bygget på Gyldendals Kobber-designsystem. Utforsk
          komponentene, eller se dem satt sammen til hele sider.
        </Text>
        <ButtonGroup>
          <Button onClick={() => (location.hash = "#/komponenter")}>Se komponentene</Button>
          <Button variant="brand-secondary-b" onClick={() => (location.hash = "#/butikk")}>
            Se eksempelsider
          </Button>
        </ButtonGroup>
      </div>

      <div className={styles.grid.three}>
        {areas.map((area) => (
          <NavigationCard
            key={area.href}
            href={area.href}
            title={area.title}
            overlay="overlay-dark"
            image={<img src={img(area.seed, 600, 300)} alt="" className={styles.coverImage} />}
          />
        ))}
      </div>

      <QuoteModule
        attribution="Kobber-teamet"
        image={<img src={img("kobber-team", 400, 400)} alt="" className={styles.coverImage} />}
      >
        Byggeklossene brukes til å skape solide, sammenhengende og universelt tilgjengelige
        produkter.
      </QuoteModule>

      <div className={styles.grid.three}>
        <ContentCard
          headingLevel={2}
          title="Slik bidrar du"
          image={<img src={img("bidra", 560, 300)} alt="" className={styles.coverImage} />}
        >
          Komponentbehov meldes til Kobber-teamet og prioriteres fortløpende.{" "}
          <TextLink href="#/komponenter">Se status</TextLink>
        </ContentCard>
        <ContentCard
          headingLevel={2}
          title="Tokens først"
          image={<img src={img("tokens", 560, 300)} alt="" className={styles.coverImage} />}
        >
          All stil kommer fra designtokens — ingen rå verdier i komponentkode.
        </ContentCard>
        <ContentCard
          headingLevel={2}
          title="Universell utforming"
          image={<img src={img("uu", 560, 300)} alt="" className={styles.coverImage} />}
        >
          Komponentene følger WAI-ARIA APG-mønstre med norsk som standardspråk.
        </ContentCard>
      </div>
    </main>
  );
}
