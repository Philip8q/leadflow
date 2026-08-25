import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "./Tabs";

const items = [
  { id: "one", label: "One", panel: <p>Panel one</p> },
  { id: "two", label: "Two", panel: <p>Panel two</p> },
  { id: "three", label: "Three", panel: <p>Panel three</p> },
];

describe("Tabs", () => {
  it("shows only the active panel and marks the active tab", () => {
    render(<Tabs items={items} label="Fruit" />);

    expect(screen.getByText("Panel one")).toBeVisible();
    expect(screen.getByText("Panel two")).not.toBeVisible();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("moves focus and selection with ArrowRight/ArrowLeft, wrapping at the ends", () => {
    render(<Tabs items={items} label="Fruit" />);

    const [one, two, three] = screen.getAllByRole("tab");
    one.focus();

    fireEvent.keyDown(one, { key: "ArrowRight" });
    expect(document.activeElement).toBe(two);
    expect(two).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(two, { key: "ArrowRight" });
    fireEvent.keyDown(three, { key: "ArrowRight" });
    // wraps past the last tab back to the first
    expect(document.activeElement).toBe(one);
    expect(one).toHaveAttribute("aria-selected", "true");
  });

  it("jumps to the first/last tab with Home/End", () => {
    render(<Tabs items={items} label="Fruit" />);
    const [one, , three] = screen.getAllByRole("tab");
    one.focus();

    fireEvent.keyDown(one, { key: "End" });
    expect(document.activeElement).toBe(three);

    fireEvent.keyDown(three, { key: "Home" });
    expect(document.activeElement).toBe(one);
  });

  it("only the active tab is in the Tab order (roving tabindex)", () => {
    render(<Tabs items={items} label="Fruit" />);
    const [one, two, three] = screen.getAllByRole("tab");

    expect(one).toHaveAttribute("tabindex", "0");
    expect(two).toHaveAttribute("tabindex", "-1");
    expect(three).toHaveAttribute("tabindex", "-1");
  });
});
