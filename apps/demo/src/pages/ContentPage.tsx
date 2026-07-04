import { useState, type MouseEvent } from "react";
import { Badge, Breadcrumb, BreadcrumbItem, List, ListItem, NavigationCard, Text } from "kobber";
import { img } from "../lib";
import * as styles from "./pages.css";

interface Chapter {
  id: string;
  title: string;
  lessons: string[];
}

interface Subject {
  id: string;
  title: string;
  chapters: Chapter[];
}

const catalog: Subject[] = [
  {
    id: "matematikk",
    title: "Matematikk 5",
    chapters: [
      {
        id: "brok",
        title: "Brøk og desimaltall",
        lessons: ["Hva er brøk?", "Likeverdige brøker", "Brøk på tallinja", "Fra brøk til desimal"],
      },
      {
        id: "geometri",
        title: "Geometri",
        lessons: ["Vinkler", "Trekanter", "Omkrets og areal"],
      },
      {
        id: "statistikk",
        title: "Statistikk",
        lessons: ["Tabeller og diagram", "Gjennomsnitt og median"],
      },
    ],
  },
  {
    id: "norsk",
    title: "Norsk 5–7",
    chapters: [
      {
        id: "lesing",
        title: "Lesestrategier",
        lessons: ["Før du leser", "Mens du leser", "Etter lesing"],
      },
      {
        id: "skriving",
        title: "Skriving",
        lessons: ["Fortelling", "Fagtekst", "Argumenterende tekst"],
      },
    ],
  },
  {
    id: "naturfag",
    title: "Naturfag 5–7",
    chapters: [
      {
        id: "energi",
        title: "Energi",
        lessons: ["Energikilder", "Strømkretser"],
      },
      {
        id: "livet",
        title: "Livet i havet",
        lessons: ["Næringskjeder", "Økosystemer langs kysten"],
      },
    ],
  },
];

/** Drill-down navigation: subject → chapter → lessons, with the
 * breadcrumb as the way back up. */
export function ContentPage() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [chapterId, setChapterId] = useState<string | null>(null);

  const subject = catalog.find((s) => s.id === subjectId);
  const chapter = subject?.chapters.find((c) => c.id === chapterId);

  const drill = (event: MouseEvent, action: () => void) => {
    event.preventDefault();
    action();
  };

  return (
    <main className={styles.main}>
      <Text variant="heading" size="medium" as="h1">
        Innhold
      </Text>

      <Breadcrumb>
        <BreadcrumbItem
          href="#/innhold"
          onClick={(event) =>
            drill(event, () => {
              setSubjectId(null);
              setChapterId(null);
            })
          }
        >
          Alle fag
        </BreadcrumbItem>
        {subject &&
          (chapter ? (
            <BreadcrumbItem
              href="#/innhold"
              onClick={(event) => drill(event, () => setChapterId(null))}
            >
              {subject.title}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>{subject.title}</BreadcrumbItem>
          ))}
        {chapter && <BreadcrumbItem>{chapter.title}</BreadcrumbItem>}
      </Breadcrumb>

      {!subject && (
        <div className={styles.grid.three}>
          {catalog.map((s) => (
            <NavigationCard
              key={s.id}
              href="#/innhold"
              title={s.title}
              image={<img src={img(s.id, 520, 360)} alt="" className={styles.coverImage} />}
              onClick={(event) => drill(event, () => setSubjectId(s.id))}
            />
          ))}
        </div>
      )}

      {subject && !chapter && (
        <div className={styles.grid.three}>
          {subject.chapters.map((c) => (
            <NavigationCard
              key={c.id}
              href="#/innhold"
              title={
                <>
                  {c.title} <Badge tone="b">{c.lessons.length} leksjoner</Badge>
                </>
              }
              image={
                <img
                  src={img(`${subject.id}-${c.id}`, 520, 360)}
                  alt=""
                  className={styles.coverImage}
                />
              }
              onClick={(event) => drill(event, () => setChapterId(c.id))}
            />
          ))}
        </div>
      )}

      {subject && chapter && (
        <div className={styles.hero}>
          <Text variant="title" as="h2">
            Leksjoner i «{chapter.title}»
          </Text>
          <List ordered>
            {chapter.lessons.map((lesson) => (
              <ListItem key={lesson}>{lesson}</ListItem>
            ))}
          </List>
        </div>
      )}
    </main>
  );
}
