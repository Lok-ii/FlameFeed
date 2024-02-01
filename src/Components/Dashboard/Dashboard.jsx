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
      {/* <p>Hello User</p>
    <button className="bg-[#4CB5F9] text-white rounded-lg w-[100%] py-2 text-sm mt-4 font-semibold" onClick={()=>{
        signOutFunc();
        if(Object.keys(user).length === 0) navigate("/login");
    }}>Sign out</button> */}

      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
