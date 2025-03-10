import { Link } from "@tanstack/react-router";
import {
  Container,
  Badge,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./header.scss";
import { useCart } from "../../contexts/cart-context";

const Header = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <header className="header">
      <Container maxWidth="lg">
        <div className="header-content">
          <div className="logo">ShopSphere</div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="actions">
            <IconButton
              onClick={() => setDrawerOpen(true)}
              className="cart-icon"
            >
              <Badge
                badgeContent={cartCount}
                color="secondary"
                className="cart-badge"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Link to="/login">
              <AccountCircleIcon />
            </Link>
          </div>
        </div>
      </Container>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="cart-drawer">
          <div className="cart-header">
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {cart.length === 0 ? (
            <Typography className="empty-cart">
              There are no items added. Add it from the shopping page.
            </Typography>
          ) : (
            <>
              <List>
                {cart.map((item) => (
                  <ListItem key={item.id} className="cart-item">
                    <ListItemText
                      primary={item.name}
                      secondary={`$${item.price.toFixed(2)} × ${item.quantity}`}
                    />
                    <div className="cart-controls">
                      <Button
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </ListItem>
                ))}
              </List>
              <div className="cart-total">
                <Typography variant="h6">
                  Total Amount: Rs.{totalAmount.toFixed(2)}
                </Typography>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
