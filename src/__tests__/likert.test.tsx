import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, within, cleanup } from "@testing-library/react";
import { LikertField } from "@/components/filler/fields/likert-field";
import { QUESTION_TYPES, QUESTION_TYPE_CONFIG } from "@/lib/types";

afterEach(cleanup);

describe("Likert type registration", () => {
  it("is included in QUESTION_TYPES", () => {
    expect(QUESTION_TYPES).toContain("likert");
  });

  it("has a config entry with label and icon", () => {
    const config = QUESTION_TYPE_CONFIG.likert;
    expect(config).toBeDefined();
    expect(config.label).toBe("Likert Scale");
    expect(config.icon).toBeDefined();
  });
});

describe("LikertField component", () => {
  it("renders 5 default labels when no options provided", () => {
    const onChange = vi.fn();
    const { getByText } = render(<LikertField value="" onChange={onChange} />);

    expect(getByText("Strongly Disagree")).toBeInTheDocument();
    expect(getByText("Disagree")).toBeInTheDocument();
    expect(getByText("Neutral")).toBeInTheDocument();
    expect(getByText("Agree")).toBeInTheDocument();
    expect(getByText("Strongly Agree")).toBeInTheDocument();
  });

  it("renders numbered buttons 1 through 5", () => {
    const onChange = vi.fn();
    const { container } = render(<LikertField value="" onChange={onChange} />);
    const buttons = container.querySelectorAll("button");

    expect(buttons).toHaveLength(5);
    buttons.forEach((btn, i) => {
      expect(within(btn).getByText(String(i + 1))).toBeInTheDocument();
    });
  });

  it("calls onChange with the correct value when clicked", () => {
    const onChange = vi.fn();
    const { container } = render(<LikertField value="" onChange={onChange} />);
    const buttons = container.querySelectorAll("button");

    fireEvent.click(buttons[2]);
    expect(onChange).toHaveBeenCalledWith("3");

    fireEvent.click(buttons[0]);
    expect(onChange).toHaveBeenCalledWith("1");

    fireEvent.click(buttons[4]);
    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("highlights the selected value", () => {
    const onChange = vi.fn();
    const { container } = render(
      <LikertField value="4" onChange={onChange} />
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons[3].className).toContain("border-primary");
    expect(buttons[3].className).toContain("bg-primary/10");
    expect(buttons[0].className).not.toContain("bg-primary/10");
    expect(buttons[1].className).not.toContain("bg-primary/10");
    expect(buttons[2].className).not.toContain("bg-primary/10");
    expect(buttons[4].className).not.toContain("bg-primary/10");
  });

  it("renders custom labels when options are provided", () => {
    const onChange = vi.fn();
    const customLabels = ["Never", "Rarely", "Sometimes", "Often", "Always"];
    const { getByText, queryByText } = render(
      <LikertField value="" onChange={onChange} options={customLabels} />
    );

    for (const label of customLabels) {
      expect(getByText(label)).toBeInTheDocument();
    }
    expect(queryByText("Strongly Disagree")).not.toBeInTheDocument();
  });

  it("handles 7-point scale with custom options", () => {
    const onChange = vi.fn();
    const sevenPoint = [
      "Strongly Disagree",
      "Disagree",
      "Somewhat Disagree",
      "Neutral",
      "Somewhat Agree",
      "Agree",
      "Strongly Agree",
    ];
    const { container } = render(
      <LikertField value="" onChange={onChange} options={sevenPoint} />
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(7);

    fireEvent.click(buttons[6]);
    expect(onChange).toHaveBeenCalledWith("7");
  });

  it("falls back to default labels when options is null", () => {
    const onChange = vi.fn();
    const { getByText } = render(
      <LikertField value="" onChange={onChange} options={null} />
    );

    expect(getByText("Strongly Disagree")).toBeInTheDocument();
    expect(getByText("Strongly Agree")).toBeInTheDocument();
  });

  it("falls back to default labels when options is empty array", () => {
    const onChange = vi.fn();
    const { getByText } = render(
      <LikertField value="" onChange={onChange} options={[]} />
    );

    expect(getByText("Strongly Disagree")).toBeInTheDocument();
    expect(getByText("Strongly Agree")).toBeInTheDocument();
  });
});
