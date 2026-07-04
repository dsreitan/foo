import { useState } from "react";
import { Badge, Divider, Filter, NavLink, NavLinkGroup, Text } from "kobber";
import {
  Avatar,
  Pane,
  PaneGroup,
  ProgressBar,
  StatCard,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "kobber-lab";
import { students } from "../lib";
import * as styles from "./pages.css";

const documents = [
  {
    id: "plan",
    title: "Ukeplan.md",
    body: "Mandag: introduksjon til brøk. Onsdag: stasjonsarbeid med pizzabiter. Fredag: innlevering av lekse og kort quiz.",
  },
  {
    id: "oppgaver",
    title: "Oppgaver.md",
    body: "1) Skriv tre likeverdige brøker for 1/2. 2) Plasser 3/4 på tallinja. 3) Forklar med egne ord hva nevneren gjør.",
  },
  {
    id: "prove",
    title: "Prøve.md",
    body: "Kapittelprøve i brøk — 45 minutter, hjelpemidler tillatt. Vurderingskriterier ligger i vedlegget.",
  },
];

const activity = [
  { name: "Noah Johansen", what: "leverte leksen" },
  { name: "Maja Nilsen", what: "stilte et spørsmål i kommentarfeltet" },
  { name: "Olivia Olsen", what: "startet på oppgave 2" },
];

/**
 * Workspace after Material 3's canonical layouts: fixed panes (explorer,
 * details) around a flexible document pane. Drag the boundaries — or use
 * arrow keys on them — to resize; panes stack on compact windows.
 */
export function WorkspacePage() {
  const [showExplorer, setShowExplorer] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const inProgress = students.filter((s) => s.progress > 0 && s.progress < 100);

  return (
    <main className={styles.main}>
      <div className={styles.spread}>
        <Text variant="heading" size="medium" as="h1">
          Arbeidsflate: Matematikk 5
        </Text>
        <div className={styles.row}>
          <Filter selected={showExplorer} onClick={() => setShowExplorer(!showExplorer)}>
            Utforsker
          </Filter>
          <Filter selected={showDetails} onClick={() => setShowDetails(!showDetails)}>
            Detaljer
          </Filter>
        </div>
      </div>

      <PaneGroup aria-label="Arbeidsflate">
        {showExplorer && (
          <Pane
            defaultSize={240}
            minSize={190}
            maxSize={360}
            handle="end"
            label="Utforsker"
            surface
          >
            <NavLinkGroup label="Utforsker" className={styles.explorer}>
              <NavLink href="#/arbeidsflate" active>
                Ukeplan.md
              </NavLink>
              <NavLink href="#/arbeidsflate">Oppgaver.md</NavLink>
              <NavLink href="#/arbeidsflate">Prøve.md</NavLink>
              <NavLink href="#/arbeidsflate" color="subtle">
                Vedlegg
              </NavLink>
            </NavLinkGroup>
            <Divider />
            <NavLinkGroup label="Snarveier" className={styles.explorer}>
              <NavLink href="#/lekser">Lekseoversikt</NavLink>
              <NavLink href="#/innhold">Innholdsbibliotek</NavLink>
              <NavLink href="#/video">Videoer</NavLink>
            </NavLinkGroup>
          </Pane>
        )}

        <Pane label="Dokumenter">
          <Tabs defaultValue="plan">
            <TabList label="Åpne dokumenter">
              {documents.map((doc) => (
                <Tab key={doc.id} value={doc.id}>
                  {doc.title}
                </Tab>
              ))}
            </TabList>
            {documents.map((doc) => (
              <TabPanel key={doc.id} value={doc.id}>
                <div className={styles.hero}>
                  <Text variant="title" as="h2">
                    {doc.title}
                  </Text>
                  <Text as="p">{doc.body}</Text>
                  <Badge tone="b">Sist endret i dag</Badge>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </Pane>

        {showDetails && (
          <Pane
            defaultSize={280}
            minSize={230}
            maxSize={420}
            handle="start"
            label="Detaljer"
            surface
          >
            <Text variant="title" size="small" as="h2">
              Nøkkeltall
            </Text>
            <StatCard label="Aktive elever" value={inProgress.length + 1} />
            <StatCard label="Ubesvarte spørsmål" value={2} />
            <Divider />
            <Text variant="title" size="small" as="h2">
              Fremdrift
            </Text>
            {inProgress.slice(0, 3).map((student) => (
              <ProgressBar
                key={student.id}
                value={student.progress}
                label={`Fremdrift ${student.name}`}
              />
            ))}
            <Divider />
            <Text variant="title" size="small" as="h2">
              Siste aktivitet
            </Text>
            {activity.map((item) => (
              <div key={item.name} className={styles.row}>
                <Avatar name={item.name} size="small" />
                <Text as="p" variant="label" size="small">
                  {item.name} {item.what}
                </Text>
              </div>
            ))}
          </Pane>
        )}
      </PaneGroup>
    </main>
  );
}
