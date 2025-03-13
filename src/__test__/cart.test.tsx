import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, Mock, vi } from "vitest";
import { CartComponent } from "../routes/cart";
import { CartProvider, useCart } from "../contexts/cart-context";

vi.mock("../contexts/cart-context", async () => {
  const actual = await vi.importActual<
    typeof import("../contexts/cart-context")
  >("../contexts/cart-context");
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("Cart Page", () => {
  it("should display cart items", () => {
    (useCart as Mock).mockReturnValue({
      cart: [
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
      ],
      removeFromCart: vi.fn(),
      updateCartItemQuantity: vi.fn(),
    });

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Rs.100.00 × 2")).toBeInTheDocument();

    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Rs.200.00 × 1")).toBeInTheDocument();
  });

  it("should calculate and display total amount", () => {
    (useCart as Mock).mockReturnValue({
      cart: [
        { id: 1, name: "Item 1", price: 100, quantity: 2, image: "/item1.jpg" },
        { id: 2, name: "Item 2", price: 200, quantity: 1, image: "/item2.jpg" },
      ],
      removeFromCart: vi.fn(),
      updateCartItemQuantity: vi.fn(),
    });

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CartComponent />
        </CartProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Rs. 400.00")).toBeInTheDocument();
  });

  it("should decrease item quantity when minus button is clicked", async () => {
    const mockUpdateQuantity = vi.fn();
    (useCart as Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "Item 1",
          price: 100,
          quantity: 2,
          image: "/item1.jpg",
        },
      ],
      updateCartItemQuantity: mockUpdateQuantity,
      removeFromCart: vi.fn(),
    });

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

    await waitFor(
      () => expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1) // 2 - 1 = 1
    );
  });

  it("should increase item quantity when plus button is clicked", async () => {
    const mockUpdateQuantity = vi.fn();
    (useCart as Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "Item 1",
          price: 100,
          quantity: 2,
          image: "/item1.jpg",
        },
      ],
      updateCartItemQuantity: mockUpdateQuantity,
      removeFromCart: vi.fn(),
    });

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

    await waitFor(
      () => expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3) // 2 + 1 = 3
    );
  });

  it("should remove item from cart when remove button is clicked", async () => {
    const mockRemoveFromCart = vi.fn();
    (useCart as Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "Item 1",
          price: 100,
          quantity: 2,
          image: "/item1.jpg",
        },
      ],
      updateCartItemQuantity: vi.fn(),
      removeFromCart: mockRemoveFromCart,
    });

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

    await waitFor(() => expect(mockRemoveFromCart).toHaveBeenCalledWith(1));
  });

  it("should navigate to checkout page when place order button is clicked", async () => {
    (useCart as Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "Item 1",
          price: 100,
          quantity: 2,
          image: "/item1.jpg",
        },
      ],
      removeFromCart: vi.fn(),
      updateCartItemQuantity: vi.fn(),
    });

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
});
