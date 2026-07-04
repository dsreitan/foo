import { useState } from "react";
import { AlertLabel, Badge, Button, Text, TextLink } from "kobber";
import { Dialog, ProgressBar, Skeleton, StatCard, Toast } from "kobber-lab";
import * as styles from "./pages.css";

const REPO_DOCS = "https://github.com/dsreitan/foo/blob/main/docs/proposals";

interface Proposal {
  name: string;
  doc: string;
  description: string;
  demo: React.ReactNode;
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Slett innlevering</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Slett innlevering?">
        <Text as="p">Dette kan ikke angres. Innleveringen fjernes for alle.</Text>
        <Button variant="warning-a" onClick={() => setOpen(false)}>
          Slett
        </Button>
      </Dialog>
    </>
  );
}

function ToastDemo() {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Toast severity="success" onDismiss={() => setVisible(false)}>
      Innleveringen er lagret
    </Toast>
  ) : (
    <Button variant="brand-secondary-b" onClick={() => setVisible(true)}>
      Vis toast igjen
    </Button>
  );
}

const proposals: Proposal[] = [
  {
    name: "Dialog",
    doc: "dialog.md",
    description:
      "Modal på native <dialog>: fokusfelle og Escape fra plattformen. Animasjon: fade + løft, 240 ms.",
    demo: <DialogDemo />,
  },
  {
    name: "Toast",
    doc: "toast.md",
    description: "Kortlevd bekreftelse på alert-fargene. Animasjon: slide inn fra høyre, 240 ms.",
    demo: <ToastDemo />,
  },
  {
    name: "Skeleton",
    doc: "skeleton.md",
    description:
      "Lasteplassholder som holder layouten. Animasjon: puls 1,6 s, av ved redusert bevegelse.",
    demo: (
      <div style={{ display: "flex", gap: 16, alignItems: "center", width: 320 }}>
        <Skeleton variant="circle" width={48} height={48} />
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      </div>
    ),
  },
  {
    name: "ProgressBar",
    doc: "progress-bar.md",
    description: "Determinert fremdrift med aria-valuenow; 100 % bytter til success-farge.",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
        <ProgressBar value={63} label="Maja Nilsen" />
        <ProgressBar value={100} label="Noah Johansen" />
      </div>
    ),
  },
  {
    name: "StatCard",
    doc: "stat-card.md",
    description: "Nøkkeltall for dashbord — erstatter misbruk av Text Module.",
    demo: (
      <StatCard
        label="Aktive elever"
        value={128}
        meta={
          <Badge color="brand" tone="b" size="small">
            +12 denne uken
          </Badge>
        }
      />
    ),
  },
];

export function LabPage() {
  return (
    <main className={styles.main}>
      <Text variant="heading" size="medium" as="h1">
        Lab — forslag til Kobber-teamet
      </Text>
      <AlertLabel severity="informative">
        Ingenting her er offisielt Kobber. Komponentene er bygget på Kobber-tokens som
        prioriteringsunderlag; hvert forslag har motivasjon, tokens, UU og animasjonsspek.
      </AlertLabel>
      {proposals.map((proposal) => (
        <section key={proposal.name} className={styles.row} style={{ alignItems: "flex-start" }}>
          <div style={{ width: 280, flexShrink: 0 }}>
            <Text variant="title" size="small" as="h2">
              {proposal.name}
            </Text>
            <Text as="p" variant="label" size="medium">
              {proposal.description}
            </Text>
            <TextLink href={`${REPO_DOCS}/${proposal.doc}`} target="_blank" rel="noreferrer">
              Les forslaget ↗
            </TextLink>
          </div>
          <div className={styles.row} style={{ flexGrow: 1 }}>
            {proposal.demo}
          </div>
        </section>
      ))}
    </main>
  );
}
