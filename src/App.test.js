// src/app.test.js
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Optional: mock localStorage for Cart/Auth if needed
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
});

test("renders App without crashing", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check if Header is rendered
  const headerElement = screen.getByText(/Ruby Official/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders main routes", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check if Home route heading exists
  const homeHeading = screen.getByText(/Featured Products/i);
  expect(homeHeading).toBeInTheDocument();
});
