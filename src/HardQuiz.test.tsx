import { test, expect, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
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

const { default: HardQuiz } = await import("./HardQuiz");

beforeEach(cleanup)

test("renders question and choices", async () => {
  render(<HardQuiz />);

  expect(screen.queryByText("🎉")).not.toBeNull();
  expect(screen.queryByText("🐛")).not.toBeNull();
});

test("clicking correct emoji calls setNewQuestion", async () => {
  render(<HardQuiz />);

  const correct = screen.getByText("🎉");
  fireEvent.click(correct);

  expect(mockSetNewQuestion.calls.length).toBeGreaterThan(0);
});

test("clicking wrong emoji adds and removes shake class", async () => {
  render(<HardQuiz />);

  const wrong = screen.getByText("🐛");

  fireEvent.click(wrong);

  expect(wrong.classList.contains("shake")).toBe(true);

  await waitFor(() => {
    expect(wrong.classList.contains("shake")).toBe(false);
  }, { timeout: 1100 });
});
