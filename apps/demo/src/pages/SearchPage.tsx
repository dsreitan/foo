import { useState } from "react";
import { Badge, ContentCard, Filter, Search, Text, TextLink } from "kobber";
import { books, img } from "../lib";
import * as styles from "./pages.css";

const categories = ["Grunnskole", "Videregående", "Skjønnlitteratur"] as const;

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>([]);

  const hits = books.filter(
    (book) =>
      (active.length === 0 || active.includes(book.category)) &&
      (book.title + book.author).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className={styles.main}>
      <Text variant="heading" size="medium" as="h1">
        Søk
      </Text>
      <Search
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Søk i titler og forfattere"
      />
      <div className={styles.row}>
        {categories.map((category) => (
          <Filter
            key={category}
            selected={active.includes(category)}
            count={books.filter((b) => b.category === category).length}
            onClick={() =>
              setActive((current) =>
                current.includes(category)
                  ? current.filter((c) => c !== category)
                  : [...current, category],
              )
            }
          >
            {category}
          </Filter>
        ))}
      </div>
      <Text role="status">
        {hits.length} treff{query && ` for «${query}»`}
      </Text>
      <div className={styles.grid.three}>
        {hits.map((book) => (
          <ContentCard
            key={book.id}
            variant="subtle"
            title={book.title}
            meta={
              <Badge color="brand" tone="b" size="small">
                {book.category}
              </Badge>
            }
            image={<img src={img(book.id, 240, 240)} alt="" className={styles.coverImage} />}
          >
            {book.author} · <TextLink href="#/butikk">{book.price} kr</TextLink>
          </ContentCard>
        ))}
      </div>
    </main>
  );
}
