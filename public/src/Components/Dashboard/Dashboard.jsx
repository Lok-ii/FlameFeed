import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="dashboard relative flex w-[100%] items-start justify-between">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
