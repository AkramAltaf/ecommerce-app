import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "../components/products/product-card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/products-service";
import { IProduct } from "../@types/product";
import {
  Container,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import "./shop.scss";
import { useCart } from "../contexts/cart-context";

export const Route = createFileRoute("/shop")({
  component: ShopComponent,
});

export function ShopComponent() {
  const { searchQuery } = useCart();

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: 2,
  });

  if (isLoading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography className="loading-text">Loading products...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <Typography className="error-message" color="error">
          {error instanceof Error
            ? "Failed to fetch products"
            : "Unknown error occurred."}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const filteredProducts = products?.filter((product: IProduct) =>
    product.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <Container className="shop-container">
      <h1 className="shop-title">Latest Products</h1>
      <div className="product-grid">
        {filteredProducts?.map((product: IProduct) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {filteredProducts?.length === 0 && (
          <Typography>No products found</Typography>
        )}
      </div>
    </Container>
  );
}
