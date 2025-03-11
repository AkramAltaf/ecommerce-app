import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IProduct } from "../../@types/product";
import "./product-card.scss";
import { useCart } from "../../contexts/cart-context";

const ProductCard: React.FC<IProduct> = ({
  id,
  name,
  description,
  image,
  price,
}) => {
  const { addToCart } = useCart();

  return (
    <Card className="product-card">
      <div className="image-container">
        <CardMedia
          component="img"
          image={image}
          alt={name}
          className="product-image"
        />
      </div>
      <CardContent className="content">
        <Typography variant="h6" className="title">
          {name}
        </Typography>
        <Typography variant="body2" className="description">
          {description}
        </Typography>
        <Typography variant="h6" className="price">
          Rs.{price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          className="add-to-cart"
          onClick={() =>
            addToCart({
              id,
              name,
              description,
              image,
              price,
              category: "Uncategorized",
              stock: 10,
              rating: 0,
            })
          }
        >
          <ShoppingCartIcon fontSize="small" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
