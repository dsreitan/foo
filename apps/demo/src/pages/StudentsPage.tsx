import { useState } from "react";
import { Badge, Counter, ProfileCard, Switch, Text } from "kobber";
import { img, students } from "../lib";
import * as styles from "./pages.css";

const statusBadge = (status: (typeof students)[number]["status"]) => (
  <Badge
    color={status === "Fullført" ? "brand" : "neutral"}
    tone="b"
    size="small"
    statusCircle={status === "Aktiv"}
  >
    {status}
  </Badge>
);

export function StudentsPage() {
  const [gridView, setGridView] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.spread}>
        <Text variant="heading" size="medium" as="h1">
          Elevoversikt
        </Text>
        <Switch
          label="Rutenettvisning"
          checked={gridView}
          onChange={(event) => setGridView(event.target.checked)}
        />
      </div>

      {gridView ? (
        <div className={styles.grid.four}>
          {students.map((student) => (
            <ProfileCard
              key={student.id}
              title={student.name}
              image={
                <img
                  src={img(student.id, 300, 220)}
                  alt={`Portrett av ${student.name}`}
                  className={styles.coverImage}
                />
              }
            >
              <Text as="p" variant="label" size="small">
                Klasse {student.group} · {student.progress} %
              </Text>
              {statusBadge(student.status)}
            </ProfileCard>
          ))}
        </div>
      ) : (
        <table className={styles.table}>
          <caption className="sr-only">Elever med klasse, progresjon og status</caption>
          <thead>
            <tr>
              <th className={styles.th}>Navn</th>
              <th className={styles.th}>Klasse</th>
              <th className={styles.th}>Progresjon</th>
              <th className={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className={styles.td}>{student.name}</td>
                <td className={styles.td}>{student.group}</td>
                <td className={styles.td}>
                  <Counter color={student.progress === 100 ? "success" : "neutral"}>
                    {student.progress}
                  </Counter>
                </td>
                <td className={styles.td}>{statusBadge(student.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
