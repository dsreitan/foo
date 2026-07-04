import {
  AccordionGroup,
  AccordionItem,
  AlertBanner,
  Badge,
  ContextualNavigationBar,
  Counter,
  Divider,
  InfoCard,
  MenuItem,
  Text,
  TextModule,
} from "kobber";
import { img, students } from "../lib";
import * as styles from "./pages.css";

const stats = [
  {
    label: "Aktive elever",
    value: students.filter((s) => s.status === "Aktiv").length,
    color: "brand-b" as const,
  },
  {
    label: "Fullført",
    value: students.filter((s) => s.status === "Fullført").length,
    color: "success" as const,
  },
  {
    label: "Ikke startet",
    value: students.filter((s) => s.status === "Ikke startet").length,
    color: "warning" as const,
  },
];

export function DashboardPage() {
  return (
    <>
      <ContextualNavigationBar label="Dashbordmeny">
        <MenuItem href="#/dashbord" active>
          Oversikt
        </MenuItem>
        <MenuItem href="#/elever">Elever</MenuItem>
        <MenuItem href="#/butikk">Ressurser</MenuItem>
      </ContextualNavigationBar>
      <main className={styles.main}>
        <Text variant="heading" size="medium" as="h1">
          Dashbord
        </Text>
        <AlertBanner severity="informative" onDismiss={() => {}}>
          Nye vurderingsverktøy er tilgjengelige for 8. trinn.
        </AlertBanner>
        <div className={styles.grid.three}>
          {stats.map((stat) => (
            <TextModule key={stat.label} color="neutral-b" aria-label={stat.label}>
              <Text variant="title" size="small" as="h2">
                {stat.label}
              </Text>
              <Counter color={stat.color}>{stat.value}</Counter>
            </TextModule>
          ))}
        </div>
        <Divider />
        <div className={styles.grid.two}>
          <InfoCard
            title="Ukens klasse: 8A"
            image={<img src={img("klasse-8a", 240, 240)} alt="" className={styles.coverImage} />}
          >
            <Text as="p" variant="label">
              Snittprogresjon 84 %{" "}
              <Badge color="brand" tone="b" size="small">
                +6 %
              </Badge>
            </Text>
          </InfoCard>
          <AccordionGroup>
            <AccordionItem title="Oppgaver til vurdering (3)">
              Kapittel 4-innleveringer fra 8B venter på vurdering.
            </AccordionItem>
            <AccordionItem title="Meldinger (1)">Foreldremøte flyttet til torsdag.</AccordionItem>
          </AccordionGroup>
        </div>
      </main>
    </>
  );
}
