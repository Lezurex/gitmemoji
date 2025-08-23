import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

test("renders home page", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const gitmojiLink = screen.getByRole("link", { name: /gitmoji/i });
  expect(gitmojiLink).toBeInTheDocument();
  expect(gitmojiLink).toHaveAttribute("href", "https://gitmoji.dev/");

  const newbies = screen.getByText(/quiz for newbies/i)
  const gurus = screen.getByText(/quiz for gurus/i)

  expect(newbies).toBeInTheDocument();
  expect(newbies).toHaveAttribute("href", "/easy")

  expect(gurus).toBeInTheDocument();
  expect(gurus).toHaveAttribute("href", "/hard")
});
