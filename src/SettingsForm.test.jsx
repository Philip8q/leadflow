import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm.jsx";

describe("SettingsForm", () => {
  it("renders the settings fields", () => {
    render(<SettingsForm />);
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email notifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lead alert threshold/i)).toBeInTheDocument();
  });

  it("shows a confirmation after saving", () => {
    render(<SettingsForm />);

    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: "Philip" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save settings/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/settings saved/i);
  });
});
