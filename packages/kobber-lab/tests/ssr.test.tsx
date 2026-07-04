/**
 * Prerender smoke test for the lab proposals — same contract as
 * packages/kobber/tests/ssr.test.tsx: server-render + clean hydration.
 */
import { act, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import {
  Avatar,
  Dialog,
  EmptyState,
  Pagination,
  ProgressBar,
  Select,
  Skeleton,
  StatCard,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Toast,
  Tooltip,
} from "../src";

const noop = () => {};

const cases: [string, ReactElement][] = [
  [
    "Dialog (closed)",
    <Dialog open={false} onClose={noop} title="Slett innlevering?">
      Dette kan ikke angres.
    </Dialog>,
  ],
  [
    "Dialog (open)",
    <Dialog open onClose={noop} title="Slett innlevering?">
      Dette kan ikke angres.
    </Dialog>,
  ],
  [
    "Toast",
    <Toast severity="success" onDismiss={noop}>
      Lagret
    </Toast>,
  ],
  ["Skeleton", <Skeleton variant="circle" width={40} height={40} />],
  ["Avatar", <Avatar name="Maja Nilsen" />],
  [
    "Select",
    <Select label="Klasse" defaultValue="8A">
      <option value="8A">8A</option>
    </Select>,
  ],
  ["Pagination", <Pagination page={5} count={12} onPageChange={() => {}} />],
  ["EmptyState", <EmptyState title="Ingen treff">Prøv et annet søkeord.</EmptyState>],
  [
    "Tabs",
    <Tabs defaultValue="a">
      <TabList label="Innhold">
        <Tab value="a">Oversikt</Tab>
        <Tab value="b">Kommentarer</Tab>
      </TabList>
      <TabPanel value="a">Innhold A</TabPanel>
      <TabPanel value="b">Innhold B</TabPanel>
    </Tabs>,
  ],
  [
    "Tooltip",
    <Tooltip content="Slett innlevering">
      <button>Slett</button>
    </Tooltip>,
  ],
  ["ProgressBar", <ProgressBar value={63} label="Maja Nilsen" />],
  ["StatCard", <StatCard label="Aktive elever" value={128} />],
];

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("prerendered static HTML (lab)", () => {
  it.each(cases)("%s server-renders and hydrates without mismatch", async (_name, element) => {
    const html = renderToString(element);
    expect(html.length).toBeGreaterThan(0);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const errors: unknown[][] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args));
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, element);
    });
    await act(async () => root.unmount());
    spy.mockRestore();
    container.remove();
    expect(errors).toEqual([]);
  });
});
