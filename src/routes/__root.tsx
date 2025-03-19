import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "../styles/layout.scss";
import { Container } from "@mui/material";
import DashboardLayout from "../components/dashboard-layout/dashboard-layout";

export const Route = createRootRoute({
  component: Component,
});

function Component() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {isDashboard ? (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ) : (
        <HomeLayout>
          <Outlet />
        </HomeLayout>
      )}
    </>
  );
}

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <Container className="main-content">{children}</Container>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  );
}
