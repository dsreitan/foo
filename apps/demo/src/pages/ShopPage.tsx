import { useState } from "react";
import {
  AlertLabel,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Counter,
  Dropdown,
  DropdownItem,
  ProductCard,
  Text,
} from "kobber";
import { books, img } from "../lib";
import * as styles from "./pages.css";

export function ShopPage() {
  const [cart, setCart] = useState(0);
  const [sort, setSort] = useState<"tittel" | "pris">("tittel");

  const sorted = [...books].sort((a, b) =>
    sort === "pris" ? a.price - b.price : a.title.localeCompare(b.title, "no"),
  );

  return (
    <main className={styles.main}>
      <Breadcrumb>
        <BreadcrumbItem href="#/">Hjem</BreadcrumbItem>
        <BreadcrumbItem>Nettbutikk</BreadcrumbItem>
      </Breadcrumb>
      <div className={styles.spread}>
        <Text variant="heading" size="medium" as="h1">
          Nettbutikk
        </Text>
        <div className={styles.row}>
          <Dropdown label={`Sorter: ${sort}`} appearance="filled">
            <DropdownItem onClick={() => setSort("tittel")}>Tittel</DropdownItem>
            <DropdownItem onClick={() => setSort("pris")}>Pris</DropdownItem>
          </Dropdown>
          <Text variant="label">
            Handlekurv <Counter color="brand-b">{cart}</Counter>
          </Text>
        </div>
      </div>
      {cart > 0 && <AlertLabel severity="success">Lagt i handlekurven ({cart})</AlertLabel>}
      <div className={styles.grid.four}>
        {sorted.map((book) => (
          <div key={book.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ProductCard
              href="#/butikk"
              onClick={(event) => event.preventDefault()}
              title={book.title}
              subtitle={`${book.author} · ${book.price} kr`}
              color={book.category === "Skjønnlitteratur" ? "brand" : "neutral"}
              image={
                <img
                  src={img(book.id, 240, 340)}
                  alt=""
                  style={{ width: 120, height: 170, objectFit: "cover", borderRadius: 4 }}
                />
              }
            />
            <Button variant="brand-secondary-b" onClick={() => setCart((c) => c + 1)}>
              Legg i kurv
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
