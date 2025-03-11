import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ProductCard from "./product-card";
import { CartContext } from "../../contexts/cart-context";

const mockProduct = {
  id: 1,
  name: "Test Product",
  description: "This is a test product",
  image: "/test-image.jpg",
  price: 99.99,
  category: "Uncategorized",
  stock: 10,
  rating: 0,
};

const mockAddToCart = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockUpdateCartItemQuantity = vi.fn();

describe("ProductCard Component", () => {
  const renderProductCard = () =>
    render(
      <CartContext.Provider
        value={{
          cart: [],
          addToCart: mockAddToCart,
          removeFromCart: mockRemoveFromCart,
          updateCartItemQuantity: mockUpdateCartItemQuantity,
        }}
      >
        <ProductCard {...mockProduct} />
      </CartContext.Provider>
    );

  test("renders product details correctly", () => {
    renderProductCard();

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Rs.${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProduct.image);
    expect(image).toHaveAttribute("alt", mockProduct.name);
  });

  test("calls addToCart when 'Add to Cart' button is clicked", () => {
    renderProductCard();

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test("renders the 'Add to Cart' button correctly", () => {
    renderProductCard();

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });
});
