import { Container } from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import DashboardHeader from "../dashboard-header/dashboard-header";
import DashboardFooter from "../dashboard-footer/dashboard-footer";
import "./dashboard-layout.scss";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <Container className="dashboard-content">{children}</Container>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
