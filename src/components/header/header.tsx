import { Link } from "@tanstack/react-router";
import { Container, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./header.scss";
import { useCart } from "../../contexts/cart-context";

const Header = () => {
  const { cart, searchQuery, setSearchQuery } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <Container maxWidth="lg">
        <div className="header-content">
          <div className="logo">ShopSphere</div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="actions">
            <Link to="/cart">
              <IconButton className="cart-icon">
                <Badge
                  badgeContent={cartCount}
                  color="secondary"
                  className="cart-badge"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link to="/login">
              <AccountCircleIcon />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
