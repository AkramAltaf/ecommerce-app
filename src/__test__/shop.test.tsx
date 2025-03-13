import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi, Mock } from "vitest";
import { fetchProducts } from "../services/products-service";
import { ShopComponent } from "../routes/shop";
import { CartProvider } from "../contexts/cart-context";

vi.mock("../services/products-service", () => ({
  fetchProducts: vi.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("Shop Page", () => {
  it("should show loading state while fetching products", () => {
    (fetchProducts as Mock).mockImplementation(() => new Promise(() => {}));

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ShopComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("should display products when data is fetched successfully", async () => {
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
          <ShopComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Product 1")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Product 2")).toBeInTheDocument()
    );
  });
});
