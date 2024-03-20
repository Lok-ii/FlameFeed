import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { setUser, handlePhoto } from "../../Redux/AuthSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(storedUser);
    if (storedUser) {
      dispatch(setUser(storedUser));
      dispatch(handlePhoto(storedUser.photoURL));
    }
  }, []);
  return (
    <div className="dashboard relative flex w-[100%] items-start justify-between">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
