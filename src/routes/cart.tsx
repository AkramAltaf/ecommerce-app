import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "../contexts/cart-context";
import "./cart.scss";

export const Route = createFileRoute("/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <Typography className="empty-cart">
          There are no items added. Add them from the shopping page.
        </Typography>
      ) : (
        <div className="cart-layout">
          {/* Cart Items Card */}
          <div className="cart-container">
            <List>
              {cart.map((item) => (
                <ListItem key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <ListItemText
                      primary={
                        <Typography variant="h6">{item.name}</Typography>
                      }
                      secondary={
                        <>
                          <Typography className="cart-item-description">
                            {item.description}
                          </Typography>
                          <Typography className="cart-item-price">
                            Rs.{item.price.toFixed(2)} × {item.quantity}
                          </Typography>
                        </>
                      }
                    />
                    <div className="cart-controls">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>

          {/* Total Amount Card */}
          <Card className="total-amount-card">
            <CardContent>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h5" className="total-amount">
                Rs. {totalAmount.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate({ to: "/checkout" })}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
