import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { CartComponent } from "../routes/cart";
import { CartProvider } from "../contexts/cart-context";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const mockCart = [
  {
    id: 1,
    name: "Item 1",
    description: "Description for item 1",
    price: 100,
    quantity: 2,
    image: "/item1.jpg",
  },
  {
    id: 2,
    name: "Item 2",
    description: "Description for item 2",
    price: 200,
    quantity: 1,
    image: "/item2.jpg",
  },
];

const mockContext = {
  cart: mockCart,
  removeFromCart: vi.fn(),
  updateCartItemQuantity: vi.fn(),
};

vi.mock("../contexts/cart-context", () => ({
  useCart: () => mockContext,
}));

describe("Cart Page", () => {
  it("should display cart items", () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    // Check if cart items are displayed
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Description for item 1")).toBeInTheDocument();
    expect(screen.getByText("Rs.100.00 × 2")).toBeInTheDocument();

    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Description for item 2")).toBeInTheDocument();
    expect(screen.getByText("Rs.200.00 × 1")).toBeInTheDocument();
  });

  it("should calculate and display total amount", () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    // Check total amount calculation
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
    expect(screen.getByText("Rs. 400.00")).toBeInTheDocument(); // 100*2 + 200*1 = 400
  });

  it("should decrease item quantity when minus button is clicked", async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    const minusButton = screen.getAllByRole("button", { name: "-" })[0];
    fireEvent.click(minusButton);

    await waitFor(() =>
      expect(mockContext.updateCartItemQuantity).toHaveBeenCalledWith(1, 1)
    );
  });

  it("should increase item quantity when plus button is clicked", async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    const plusButton = screen.getAllByRole("button", { name: "+" })[0];
    fireEvent.click(plusButton);

    await waitFor(() =>
      expect(mockContext.updateCartItemQuantity).toHaveBeenCalledWith(1, 3)
    );
  });

  it("should remove item from cart when remove button is clicked", async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    const removeButton = screen.getAllByRole("button", { name: "Remove" })[0];
    fireEvent.click(removeButton);

    await waitFor(() =>
      expect(mockContext.removeFromCart).toHaveBeenCalledWith(1)
    );
  });

  it("should navigate to checkout page when place order button is clicked", async () => {
    const mockNavigate = vi.fn();
    vi.mock("@tanstack/react-router", () => ({
      useNavigate: () => mockNavigate,
    }));

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    const placeOrderButton = screen.getByRole("button", {
      name: "Place Order",
    });
    fireEvent.click(placeOrderButton);

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/checkout" })
    );
  });

  it("should display empty cart message when no items are present", () => {
    vi.mock("../contexts/cart-context", () => ({
      useCart: () => ({
        cart: [],
        removeFromCart: vi.fn(),
        updateCartItemQuantity: vi.fn(),
      }),
    }));

    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    expect(
      screen.getByText(
        "There are no items added. Add them from the shopping page."
      )
    ).toBeInTheDocument();
  });
});
