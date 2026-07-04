import { useState } from "react";
import { Badge, Divider, Filter, NavLink, NavLinkGroup, Text } from "kobber";
import { Avatar, ProgressBar, StatCard, Tab, TabList, TabPanel, Tabs } from "kobber-lab";
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

/** Workspace with toggleable panels on both sides of an editor, VS Code-style:
 * explorer on the left, tabbed documents in the middle, info widgets on the right. */
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

      <div className={styles.workspace}>
        {showExplorer && (
          <div className={styles.workspacePanel}>
            <div className={styles.widget}>
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
            </div>
          </div>
        )}

        <div className={styles.workspaceCenter}>
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
        </div>

        {showDetails && (
          <div className={styles.workspacePanel}>
            <div className={styles.widget}>
              <Text variant="title" size="small" as="h2">
                Nøkkeltall
              </Text>
              <StatCard label="Aktive elever" value={inProgress.length + 1} />
              <StatCard label="Ubesvarte spørsmål" value={2} />
            </div>
            <div className={styles.widget}>
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
            </div>
            <div className={styles.widget}>
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
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
