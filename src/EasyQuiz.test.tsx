import { test, expect, mock } from "bun:test";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { EmojiData } from "./EmojiData";

function createMockFunction() {
  const fn = (...args: unknown[]) => {
    fn.calls.push(args);
  };
  fn.calls = [] as unknown[][];
  return fn;
}

const mockQuestion: EmojiData = {
  emoji: "🎉",
  code: ":tada:",
  description: "Celebrate something",
  name: "tada",
};

const mockChoices: EmojiData[] = [
  mockQuestion,
  { emoji: "🐛", code: ":bug:", description: "Fix a bug", name: "bug" },
  { emoji: "✨", code: ":sparkles:", description: "Add a feature", name: "sparkles" },
  { emoji: "🔥", code: ":fire:", description: "Remove code", name: "fire" },
];

const mockSetNewQuestion = createMockFunction();

mock.module("./useGitmojiQuiz", () => ({
  default: () => ({
    currentQuestion: mockQuestion,
    choices: mockChoices,
    setNewQuestion: mockSetNewQuestion,
  }),
}));

const { default: EasyQuiz } = await import("./EasyQuiz");

test("renders question and choices", async () => {
  render(<EasyQuiz />);

  expect(screen.queryByText("Celebrate something")).not.toBeNull();
  expect(screen.queryByText(":tada:")).not.toBeNull();
  expect(screen.queryByText(":bug:")).not.toBeNull();
});

test("clicking correct emoji calls setNewQuestion", async () => {
  render(<EasyQuiz />);

  const correct = screen.getAllByText(":tada:")[0];
  fireEvent.click(correct);

  expect(mockSetNewQuestion.calls.length).toBeGreaterThan(0);
});

test("clicking wrong emoji adds and removes shake class", async () => {
  render(<EasyQuiz />);

  const wrong = screen.getAllByText(":bug:")[0];
  const wrapper = wrong.parentElement?.parentElement;

  fireEvent.click(wrong);

  expect(wrapper?.classList.contains("shake")).toBe(true);

  await waitFor(() => {
    expect(wrapper?.classList.contains("shake")).toBe(false);
  }, { timeout: 1100 });
});
