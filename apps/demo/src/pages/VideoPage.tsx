import { Badge, Button, ContentCard, List, ListItem, Text, TextArea, TextLink } from "kobber";
import { Avatar, Tab, TabList, TabPanel, Tabs } from "kobber-lab";
import { img } from "../lib";
import * as styles from "./pages.css";

const comments = [
  { name: "Maja Nilsen", text: "Endelig skjønte jeg likeverdige brøker, takk!" },
  { name: "Elias Kristiansen", text: "Kan du lage en video om brøk på tallinja også?" },
];

const transcript = [
  "00:00 Velkommen — hva skal vi lære i dag?",
  "01:12 Hva er en brøk? Teller og nevner",
  "04:30 Likeverdige brøker med pizzabiter",
  "08:05 Brøk større enn 1",
  "10:40 Oppsummering og oppgaver",
];

const related = ["Brøk på tallinja", "Fra brøk til desimaltall", "Regn med brøk"];

/** Video page with a multi-tab panel under the player, YouTube-style. */
export function VideoPage() {
  return (
    <main className={styles.main}>
      <div className={styles.withSidebar}>
        <div className={styles.workspaceCenter}>
          <img
            src={img("brok-video", 960, 540)}
            alt="Videoens forsidebilde: pizzabiter delt i brøker"
            className={styles.videoFrame}
          />
          <Text variant="heading" size="medium" as="h1">
            Brøk for 5. trinn: likeverdige brøker
          </Text>
          <div className={styles.spread}>
            <div className={styles.row}>
              <Avatar name="Kari Bakken" size="large" src={img("kari", 96, 96)} alt="" />
              <div>
                <Text as="p" variant="label" size="medium">
                  Kari Bakken
                </Text>
                <Text as="p" variant="label" size="small">
                  Matematikk 5–7
                </Text>
              </div>
            </div>
            <div className={styles.row}>
              <Badge color="brand" tone="b">
                12 min
              </Badge>
              <Button variant="brand-secondary-b">Legg i spilleliste</Button>
              <Button>Del med klassen</Button>
            </div>
          </div>

          <Tabs defaultValue="oversikt">
            <TabList label="Om videoen">
              <Tab value="oversikt">Oversikt</Tab>
              <Tab value="kommentarer">Kommentarer ({comments.length})</Tab>
              <Tab value="transkript">Transkript</Tab>
            </TabList>
            <TabPanel value="oversikt">
              <div className={styles.hero}>
                <Text as="p">
                  Vi utforsker likeverdige brøker med pizzabiter og tallinjer. Videoen passer som
                  introduksjon til kapittel 3 og har oppgaver underveis.
                </Text>
                <Text as="p">
                  Passer for 5. trinn · Kompetansemål: representere brøk på ulike måter. Se også{" "}
                  <TextLink href="#/innhold">kapittelet i innholdsbiblioteket</TextLink>.
                </Text>
              </div>
            </TabPanel>
            <TabPanel value="kommentarer">
              <div className={styles.hero}>
                {comments.map((comment) => (
                  <div
                    key={comment.name}
                    className={styles.row}
                    style={{ alignItems: "flex-start" }}
                  >
                    <Avatar name={comment.name} />
                    <div>
                      <Text as="p" variant="label" size="medium">
                        {comment.name}
                      </Text>
                      <Text as="p">{comment.text}</Text>
                    </div>
                  </div>
                ))}
                <TextArea label="Skriv en kommentar" placeholder="Del et spørsmål eller tips" />
                <Button variant="brand-secondary-b">Publiser</Button>
              </div>
            </TabPanel>
            <TabPanel value="transkript">
              <List>
                {transcript.map((line) => (
                  <ListItem key={line}>{line}</ListItem>
                ))}
              </List>
            </TabPanel>
          </Tabs>
        </div>

        <aside className={styles.sidebar} aria-label="Relaterte videoer">
          <Text variant="title" size="small" as="h2">
            Relatert
          </Text>
          {related.map((title) => (
            <ContentCard
              key={title}
              variant="subtle"
              title={title}
              image={<img src={img(title, 400, 225)} alt="" className={styles.coverImage} />}
            >
              Video · Matematikk 5
            </ContentCard>
          ))}
        </aside>
      </div>
    </main>
  );
}
