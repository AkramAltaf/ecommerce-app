import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi, Mock } from "vitest";
import { fetchProducts } from "../services/products-service";
import { RouteComponent } from "../routes/shop";
import { CartProvider } from "../contexts/cart-context";

// Mock the fetchProducts function
vi.mock("../services/products-service", () => ({
  fetchProducts: vi.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable automatic retries in tests
      },
    },
  });

describe("Shop Page", () => {
  it("should show loading state while fetching products", () => {
    // Mock loading state
    (fetchProducts as Mock).mockImplementation(
      () => new Promise(() => {}) // Keeps the promise pending to simulate loading state
    );

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouteComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("should display an error message and retry button on fetch error", async () => {
    // Mock fetch failure
    (fetchProducts as Mock).mockRejectedValue(
      new Error("Failed to fetch products")
    );

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouteComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch products")).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch products")).toBeInTheDocument()
    );
    // Check for retry button
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("should display products when data is fetched successfully", async () => {
    // Mock successful fetch
    (fetchProducts as Mock).mockResolvedValue([
      {
        id: 1,
        name: "Product 1",
        price: 100,
        imageUrl: "/product1.jpg",
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        imageUrl: "/product2.jpg",
      },
    ]);

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouteComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    // Wait for products to load
    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Product 2")).toBeInTheDocument()
    );
  });
});
