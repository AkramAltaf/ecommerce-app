import { Outlet } from "@tanstack/react-router";
import { Container } from "@mui/material";
import "./dashboard-layout.scss";
import Sidebar from "../sidebar/sidebar";
import DashboardHeader from "../dashboard-header/dashboard-header";
import DashboardFooter from "../dashboard-footer/dashboard-footer";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <Container className="dashboard-content">
          <Outlet />
        </Container>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
