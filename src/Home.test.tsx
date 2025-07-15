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

  expect(screen.getByText(/quiz for newbies/i)).toBeInTheDocument();
  expect(screen.getByText(/quiz for gurus/i)).toBeInTheDocument();
});
