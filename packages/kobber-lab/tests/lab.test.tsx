import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Dialog", () => {
  it("opens as a modal and closes via the close button", () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Slett innlevering?">
        Dette kan ikke angres.
      </Dialog>,
    );
    expect(screen.getByRole("heading", { name: "Slett innlevering?" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Lukk" }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe("Toast", () => {
  it("is polite by default and interrupting for warning", () => {
    render(<Toast>Lagret</Toast>);
    expect(screen.getByRole("status").textContent).toContain("Lagret");
    render(<Toast severity="warning">Mistet tilkobling</Toast>);
    expect(screen.getByRole("alert")).toBeDefined();
  });
});

describe("ProgressBar", () => {
  it("exposes clamped value via aria", () => {
    render(<ProgressBar value={120} label="Emma Hansen" />);
    const bar = screen.getByRole("progressbar", { name: "Emma Hansen" });
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
  });
});

describe("Skeleton", () => {
  it("is hidden from assistive tech", () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Aktive elever" value={5} />);
    expect(screen.getByText("Aktive elever")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });
});

function DemoTabs() {
  return (
    <Tabs defaultValue="a">
      <TabList label="Innhold">
        <Tab value="a">Oversikt</Tab>
        <Tab value="b">Kommentarer</Tab>
      </TabList>
      <TabPanel value="a">Innhold A</TabPanel>
      <TabPanel value="b">Innhold B</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("switches panel on click and wires aria", () => {
    render(<DemoTabs />);
    const tabB = screen.getByRole("tab", { name: "Kommentarer" });
    expect(tabB.getAttribute("aria-selected")).toBe("false");
    fireEvent.click(tabB);
    expect(tabB.getAttribute("aria-selected")).toBe("true");
    const panel = screen.getByRole("tabpanel");
    expect(panel.textContent).toBe("Innhold B");
    expect(panel.getAttribute("aria-labelledby")).toBe(tabB.id);
  });

  it("moves selection with arrow keys (automatic activation)", () => {
    render(<DemoTabs />);
    const tabA = screen.getByRole("tab", { name: "Oversikt" });
    tabA.focus();
    fireEvent.keyDown(tabA, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Kommentarer" }).getAttribute("aria-selected")).toBe(
      "true",
    );
    expect(screen.getByRole("tabpanel").textContent).toBe("Innhold B");
  });
});

describe("Avatar", () => {
  it("falls back to initials with the name as accessible label", () => {
    render(<Avatar name="Maja Nilsen" />);
    const avatar = screen.getByRole("img", { name: "Maja Nilsen" });
    expect(avatar.textContent).toBe("MN");
  });
});

describe("Select", () => {
  it("is a labelled native select", () => {
    render(
      <Select label="Klasse" defaultValue="8B">
        <option value="8A">8A</option>
        <option value="8B">8B</option>
      </Select>,
    );
    const select = screen.getByRole("combobox", { name: "Klasse" });
    expect((select as HTMLSelectElement).value).toBe("8B");
  });
});

describe("Pagination", () => {
  it("marks the current page and pages with full names", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} count={12} onPageChange={onPageChange} />);
    expect(screen.getByRole("navigation", { name: "Sidenavigasjon" })).toBeDefined();
    const current = screen.getByRole("button", { name: "Side 5" });
    expect(current.getAttribute("aria-current")).toBe("page");
    fireEvent.click(screen.getByRole("button", { name: "Neste side" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
    // windowed: first and last always reachable
    expect(screen.getByRole("button", { name: "Side 1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Side 12" })).toBeDefined();
    expect(screen.queryByRole("button", { name: "Side 9" })).toBeNull();
  });
});

describe("EmptyState", () => {
  it("renders heading, description and action", () => {
    render(
      <EmptyState title="Ingen innleveringer ennå" action={<button>Opprett lekse</button>}>
        Elevene har ikke levert noe i dette faget.
      </EmptyState>,
    );
    expect(screen.getByRole("heading", { name: "Ingen innleveringer ennå" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Opprett lekse" })).toBeDefined();
  });
});

describe("Tooltip", () => {
  it("describes the trigger and dismisses on Escape", () => {
    render(
      <Tooltip content="Slett innlevering">
        <button>Slett</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Slett" });
    const tip = screen.getByRole("tooltip");
    expect(trigger.getAttribute("aria-describedby")).toBe(tip.id);
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(tip.parentElement?.hasAttribute("data-dismissed")).toBe(true);
  });
});
