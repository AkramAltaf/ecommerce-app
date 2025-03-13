import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../contexts/cart-context";
import { IProduct } from "../@types/product";
import { beforeEach, describe, expect, it } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CartContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  const mockProduct: IProduct = {
    id: 1,
    name: "Test Product",
    description: "Description for test product",
    price: 100,
    image: "/test-image.jpg",
    category: "Uncategorized",
    stock: 10,
    rating: 4,
  };

  it("should initialize with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
  });

  it("should load cart from localStorage if available", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ ...mockProduct, quantity: 2 }])
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([{ ...mockProduct, quantity: 2 }]);
  });

  it("should add a product to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toEqual([{ ...mockProduct, quantity: 1 }]);
    expect(localStorage.getItem("cart")).toContain(mockProduct.name);
  });

  it("should increase the quantity of an existing product", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toEqual([{ ...mockProduct, quantity: 2 }]);
  });

  it("should decrease the quantity of a product", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
      result.current.updateCartItemQuantity(mockProduct.id, 1);
    });

    expect(result.current.cart).toEqual([{ ...mockProduct, quantity: 1 }]);
  });

  it("should prevent negative quantity when decreasing item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateCartItemQuantity(mockProduct.id, -1);
    });

    expect(result.current.cart).toEqual([{ ...mockProduct, quantity: 1 }]);
  });

  it("should remove a product from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart).toEqual([]);
    expect(localStorage.getItem("cart")).not.toContain(mockProduct.name);
  });

  it("should persist the cart state to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(localStorage.getItem("cart")).toContain(mockProduct.name);
  });

  it("should throw an error when useCart is used outside of CartProvider", () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrowError(new Error("useCart must be used within a CartProvider"));
  });
});
