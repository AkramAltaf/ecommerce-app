import { Link } from "@tanstack/react-router";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Dashboard</div>
      <nav className="sidebar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard/reports">Reports</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
