import { act, render, screen } from "@testing-library/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";
import { describe, test, expect, beforeEach } from "vitest";
import { CartProvider } from "../../contexts/cart-context";

const router = createRouter({ routeTree });

describe("Footer Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      );
    });
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
