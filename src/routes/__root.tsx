import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "../styles/layout.scss";
import { Container } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <div className="layout">
      <Header />
      <Container className="main-content">
        <Outlet />
      </Container>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
});
