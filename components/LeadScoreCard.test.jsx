import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LeadScoreTool } from "./LeadScoreCard";

describe("LeadScoreTool Component", () => {
  it("renders preparing state when input is streaming", () => {
    const part = {
      state: "input-streaming",
      input: { propertyType: "3 bedroom apartment" },
    };

    render(<LeadScoreTool part={part} />);
    expect(screen.getByText("3 bedroom apartment")).toBeInTheDocument();
  });

  it("renders running state with spinning indicator and intent tags", () => {
    const part = {
      state: "input-available",
      input: {
        intent: "buying",
        timeline: "immediate",
        contactMethod: "whatsapp",
      },
    };

    render(<LeadScoreTool part={part} />);
    expect(screen.getByText(/Scoring this lead/i)).toBeInTheDocument();
    expect(screen.getByText("buying")).toBeInTheDocument();
    expect(screen.getByText("immediate")).toBeInTheDocument();
    expect(screen.getByText("whatsapp")).toBeInTheDocument();
  });

  it("renders complete score result with badge, score, and breakdown", () => {
    const part = {
      state: "output-available",
      output: {
        score: 88,
        tier: "Hot",
        summary: "Highly qualified buyer with pre-approved financing.",
        breakdown: [
          { label: "Budget Match", points: 30, max: 30, detail: "Full cash" },
          { label: "Timeline", points: 28, max: 30, detail: "Within 30 days" },
        ],
      },
    };

    render(<LeadScoreTool part={part} />);

    // Query by text and structure, not CSS classes or test IDs
    expect(screen.getByText("Hot lead")).toBeInTheDocument();
    expect(screen.getByText("88")).toBeInTheDocument();
    expect(screen.getByText("/100")).toBeInTheDocument();
    expect(
      screen.getByText("Highly qualified buyer with pre-approved financing.")
    ).toBeInTheDocument();
    expect(screen.getByText("Budget Match")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("30/30 · Full cash")).toBeInTheDocument();
  });

  it("renders error state when tool execution fails", () => {
    const part = {
      state: "output-error",
      errorText: "Failed to connect to scoring model pipeline",
    };

    render(<LeadScoreTool part={part} />);
    expect(
      screen.getByText(/Couldn't score this lead yet/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Failed to connect to scoring model pipeline")
    ).toBeInTheDocument();
  });

  it("returns null for unknown state", () => {
    const part = { state: "unknown-state" };
    const { container } = render(<LeadScoreTool part={part} />);
    expect(container).toBeEmptyDOMElement();
  });
});
