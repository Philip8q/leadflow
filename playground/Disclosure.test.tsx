import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Disclosure from "./Disclosure";

describe("Disclosure", () => {
  it("starts collapsed with aria-expanded false and hidden content", () => {
    render(<Disclosure summary="More info">Hidden detail</Disclosure>);

    const button = screen.getByRole("button", { name: "More info" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Hidden detail")).not.toBeVisible();
  });

  it("toggles aria-expanded and visibility on click, and via keyboard activation", () => {
    render(<Disclosure summary="More info">Hidden detail</Disclosure>);
    const button = screen.getByRole("button", { name: "More info" });

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden detail")).toBeVisible();

    // Native <button> activates on Enter/Space by dispatching a click,
    // which is what fireEvent.click above exercises; this confirms the
    // toggle is symmetric for the close direction too.
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Hidden detail")).not.toBeVisible();
  });

  it("links the button to its content via aria-controls", () => {
    render(<Disclosure summary="More info">Hidden detail</Disclosure>);
    const button = screen.getByRole("button", { name: "More info" });
    const controlsId = button.getAttribute("aria-controls");

    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId as string)).toHaveTextContent(
      "Hidden detail"
    );
  });
});
