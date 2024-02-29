import React from "react";
import { useInsta } from "../../Context/Context";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashBoardMainContent from "./DashBoardMainContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOutFunc, user } = useInsta();
  return (
    <div className="dashboard relative flex w-[100%] items-start justify-between">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
