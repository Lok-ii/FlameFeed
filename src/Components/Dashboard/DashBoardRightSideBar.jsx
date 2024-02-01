import React from "react";
import profile from "../../assets/images/profile.avif";
import Suggested from "./Suggested";

const DashBoardRightSideBar = () => {
  return (
    <div className="w-[30%] flex flex-col gap-8 pr-48 py-8">
      <div className="currentUser flex items-center justify-between">
        <div className="userProfile flex items-center gap-4">
          <img
            src={profile}
            className="w-[2rem] h-[2rem] rounded-[50%]"
            alt=""
          />
          <div className="userName">
            <h2 className="font-semibold text-sm">John Doe</h2>
            <p className="text-xs">johndoe</p>
          </div>
        </div>
        <p className="font-semibold text-blue-400 text-xs cursor-pointer">
          Switch
        </p>
      </div>
      <div className="suggested flex flex-col gap-4 ">
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-400 font-semibold ">Suggested for you</p>
          <p className="text-xs font-bold">See all</p>
        </div>
        <div className="flex flex-col gap-3 ">
        <Suggested username={"username"} />
        <Suggested username={"username"} />
        <Suggested username={"username"} />
        <Suggested username={"username"} />
        <Suggested username={"username"} />
        <Suggested username={"username"} />
        <Suggested username={"username"} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardRightSideBar;
