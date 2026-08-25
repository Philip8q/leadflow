import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import Modal from "./Modal";

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onClose={() => setOpen(false)} titleId="t" title="Confirm">
        <p>Body text</p>
        <button>Cancel</button>
        <button>Confirm</button>
      </Modal>
    </div>
  );
}

describe("Modal", () => {
  it("exposes dialog role, aria-modal and a label", () => {
    render(<Harness />);
    fireEvent.click(screen.getByText("Open modal"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName("Confirm");
  });

  it("moves focus inside the dialog on open and back to the trigger on close", () => {
    render(<Harness />);
    const trigger = screen.getByText("Open modal");
    // A real click focuses the button first; fireEvent.click alone doesn't
    // simulate that in jsdom, so it's done explicitly here.
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toContainElement(
      document.activeElement as HTMLElement
    );

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(document.activeElement).toBe(trigger);
  });

  it("wraps focus with Tab and Shift+Tab (focus trap)", () => {
    render(<Harness />);
    fireEvent.click(screen.getByText("Open modal"));

    const dialog = screen.getByRole("dialog");
    const closeButton = screen.getByLabelText("Close dialog");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });

    // Shift+Tab from the first focusable element wraps to the last.
    closeButton.focus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(confirmButton);

    // Tab from the last focusable element wraps to the first.
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(document.activeElement).toBe(closeButton);
  });
});
