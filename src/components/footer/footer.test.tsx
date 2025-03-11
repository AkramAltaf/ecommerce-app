import { render, screen, within } from "@testing-library/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";
import { describe, test, expect, beforeEach } from "vitest";
import { CartProvider } from "../../contexts/cart-context";

// Mock the router setup
const router = createRouter({ routeTree });

describe("Footer Component", () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    );
  });

  test("renders footer component", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    const footer = screen.getByRole("contentinfo");
    const links = within(footer).getAllByRole("link");

    // Assert that each link is present
    expect(links.some((link) => link.textContent === "Home")).toBe(true);
    expect(links.some((link) => link.textContent === "Shop")).toBe(true);
    expect(links.some((link) => link.textContent === "About")).toBe(true);
    expect(links.some((link) => link.textContent === "Contact")).toBe(true);
  });

  test("renders social media icons", () => {
    expect(screen.getByTestId("facebook-link")).toHaveAttribute(
      "href",
      "https://facebook.com"
    );
    expect(screen.getByTestId("twitter-link")).toHaveAttribute(
      "href",
      "https://twitter.com"
    );
    expect(screen.getByTestId("instagram-link")).toHaveAttribute(
      "href",
      "https://instagram.com"
    );
  });

  test("renders the correct copyright year", () => {
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`© ${currentYear} ShopSphere\\. All Rights Reserved\\.`)
      )
    ).toBeInTheDocument();
  });
});
