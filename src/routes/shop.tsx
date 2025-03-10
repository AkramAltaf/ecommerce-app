import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "../components/products/product-card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/products-service";
import { IProduct } from "../@types/product";
import { Container } from "@mui/material";
import "./shop.scss";

export const Route = createFileRoute("/shop")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">Error while fetching products.</div>;
  }

  return (
    <Container className="shop-container">
      <h1 className="shop-title">Latest Products</h1>
      <div className="product-grid">
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Container>
  );
}
