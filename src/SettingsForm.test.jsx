import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm.jsx";

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/display name/i), {
    target: { value: "Philip" },
  });
  fireEvent.change(screen.getByLabelText(/notification email/i), {
    target: { value: "philip@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/lead alert threshold/i), {
    target: { value: "50" },
  });
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: /save settings/i }));
}

describe("SettingsForm", () => {
  it("saves successfully when all fields are valid", () => {
    render(<SettingsForm />);
    fillValidForm();
    submit();

    expect(screen.getByText("Settings saved.")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("rejects an empty display name with an inline error", () => {
    render(<SettingsForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: "" },
    });
    submit();

    const error = screen.getByText("Display name is required");
    expect(error).toBeInTheDocument();
    expect(screen.getByLabelText(/display name/i)).toHaveAccessibleDescription(
      "Display name is required",
    );
    expect(screen.queryByText("Settings saved.")).not.toBeInTheDocument();
  });

  it("rejects an invalid email format when email notifications are enabled", () => {
    render(<SettingsForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText(/notification email/i), {
      target: { value: "not-an-email" },
    });
    submit();

    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    expect(screen.queryByText("Settings saved.")).not.toBeInTheDocument();
  });

  it("rejects a threshold outside 0-100", () => {
    render(<SettingsForm />);
    fillValidForm();
    fireEvent.change(screen.getByLabelText(/lead alert threshold/i), {
      target: { value: "150" },
    });
    submit();

    expect(
      screen.getByText("Threshold must be between 0 and 100"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Settings saved.")).not.toBeInTheDocument();
  });

  it("toggles the notification email requirement with the checkbox", () => {
    render(<SettingsForm />);
    const emailInput = screen.getByLabelText(/notification email/i);
    const checkbox = screen.getByLabelText(/email notifications/i);

    expect(checkbox).toBeChecked();
    expect(emailInput).toBeRequired();

    fireEvent.click(checkbox);
    expect(emailInput).not.toBeRequired();

    fireEvent.change(screen.getByLabelText(/display name/i), {
      target: { value: "Philip" },
    });
    fireEvent.change(screen.getByLabelText(/lead alert threshold/i), {
      target: { value: "50" },
    });
    submit();

    expect(screen.getByText("Settings saved.")).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(emailInput).toBeRequired();
  });
});
