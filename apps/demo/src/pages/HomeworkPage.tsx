import { useState } from "react";
import { Badge, Button, Filter, Search, Text } from "kobber";
import { Avatar, ProgressBar, StatCard, Tooltip } from "kobber-lab";
import { img, students } from "../lib";
import * as styles from "./pages.css";

const groups = ["8A", "8B", "8C"];

function homeworkStatus(progress: number) {
  if (progress === 100) return <Badge color="brand">Levert</Badge>;
  if (progress === 0) return <Badge>Ikke startet</Badge>;
  return (
    <Badge color="brand" tone="b">
      Påbegynt
    </Badge>
  );
}

/** Teacher's homework overview: who has delivered, who needs a nudge. */
export function HomeworkPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string | null>(null);

  const visible = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) &&
      (group === null || student.group === group),
  );
  const delivered = students.filter((s) => s.progress === 100).length;
  const average = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Text variant="heading" size="medium" as="h1">
          Lekse: Brøk og desimaltall
        </Text>
        <Text as="p">Frist fredag 10. juli · Matematikk 5 · kapittel 3</Text>
      </div>

      <div className={styles.grid.four}>
        <StatCard label="Levert" value={`${delivered} av ${students.length}`} />
        <StatCard label="Ikke levert" value={students.length - delivered} />
        <StatCard label="Snitt fremdrift" value={`${average} %`} />
      </div>

      <div className={styles.spread}>
        <div className={styles.row}>
          {groups.map((g) => (
            <Filter key={g} selected={group === g} onClick={() => setGroup(group === g ? null : g)}>
              {g}
            </Filter>
          ))}
        </div>
        <Search
          aria-label="Søk etter elev"
          placeholder="Søk etter elev"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <table className={styles.table} aria-label="Innleveringer per elev">
        <thead>
          <tr>
            <th className={styles.th}>Elev</th>
            <th className={styles.th}>Gruppe</th>
            <th className={styles.th}>Fremdrift</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Handling</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((student) => (
            <tr key={student.id}>
              <td className={styles.td}>
                <span className={styles.row}>
                  <Avatar name={student.name} src={img(student.id, 64, 64)} alt="" />
                  {student.name}
                </span>
              </td>
              <td className={styles.td}>{student.group}</td>
              <td className={styles.td} style={{ minWidth: 160 }}>
                <ProgressBar value={student.progress} label={`Fremdrift ${student.name}`} />
              </td>
              <td className={styles.td}>{homeworkStatus(student.progress)}</td>
              <td className={styles.td}>
                {student.progress < 100 && (
                  <Tooltip content="Sender en vennlig påminnelse">
                    <Button variant="brand-tertiary-a">Purr</Button>
                  </Tooltip>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visible.length === 0 && <Text as="p">Ingen elever matcher filteret.</Text>}
    </main>
  );
}
