import { test, expect, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

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

beforeEach(cleanup)

test("renders question and choices", async () => {
  render(<MemoryRouter><EasyQuiz /></MemoryRouter>);

  expect(screen.queryByText("Celebrate something")).not.toBeNull();
  expect(screen.queryByText(":tada:")).not.toBeNull();
  expect(screen.queryByText(":bug:")).not.toBeNull();
});

test("clicking correct emoji calls setNewQuestion", async () => {
  render(<MemoryRouter><EasyQuiz /></MemoryRouter>);

  const correct = screen.getByText(":tada:");
  fireEvent.click(correct);

  expect(mockSetNewQuestion.calls.length).toBeGreaterThan(0);
});

test("clicking wrong emoji adds and removes shake class", async () => {
  render(<MemoryRouter><EasyQuiz /></MemoryRouter>);

  const wrong = screen.getByText(":bug:");
  const wrapper = wrong.parentElement?.parentElement;

  fireEvent.click(wrong);

  expect(wrapper?.classList.contains("shake")).toBe(true);

  await waitFor(() => {
    expect(wrapper?.classList.contains("shake")).toBe(false);
  }, { timeout: 1100 });
});

test("clicking show answer button adds and removes shake class", async () => {
  render(<MemoryRouter><EasyQuiz /></MemoryRouter>);

  const btn = screen.getByText("Show Answer");
  const correct = screen.getByText(":tada:");
  const wrapper = correct.parentElement?.parentElement;

  fireEvent.click(btn);

  expect(wrapper?.classList.contains("shake")).toBe(true);

  await waitFor(() => {
    expect(wrapper?.classList.contains("shake")).toBe(false);
  }, { timeout: 1100 });
});
