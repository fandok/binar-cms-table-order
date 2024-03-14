import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App page", () => {
  it("renders page and get App text", () => {
    render(<App />);
    const appText = screen.getByText("App");
    expect(appText).toBeInTheDocument();
  });
});
