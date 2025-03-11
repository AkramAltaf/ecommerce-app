import { Container } from "@mui/material";
import { Link } from "@tanstack/react-router";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <Container maxWidth="lg">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/" data-testid="footer-home-link">
              Home
            </Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="facebook-link"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="twitter-link"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="instagram-link"
            >
              <InstagramIcon />
            </a>
          </div>

          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
