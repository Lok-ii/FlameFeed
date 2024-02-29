import React from "react";
import Settings from "../../assets/icons/Settings";
import profileImg from "../../assets/images/profile.avif";
import { BsGrid3X3 } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi2";
import { LuContact } from "react-icons/lu";
import cameraIcon from "../../assets/images/camera.png";
import { Link } from "react-router-dom";


const Profile = () => {
  return (
    <div className="profile flex-grow w-[70%] px-20 py-10 flex items-center flex-col gap-16">
      <div className="flex items-center gap-32">
        <div className="profileImageContainer rounded-[50%] w-[9.375rem]">
          <img className="profileImage rounded-[50%]" src={profileImg} alt="" />
        </div>
        <div className="profileDetails flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <p className="text-xl">lokesh_kataria</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Link to={"/dashboard/editprofile"}><button className="editProfile cursor-pointer bg-[#363636] px-4 py-2 font-medium text-sm rounded-lg">Edit profile</button></Link>
                <button className="viewArchive cursor-pointer bg-[#363636] px-4 py-2 rounded-lg font-medium text-sm">VIew archive</button>
              </div>
              <div className="settingsIcon cursor-pointer">
                <Settings />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-12 text-sm">
            <p><span className="font-semibold">0</span> posts</p>
            <p><span className="font-semibold">0</span> followers</p>
            <p><span className="font-semibold">0</span> following</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Lokesh</p>
            <p className="text-sm">Let's just pretend this is a meaningful bio</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center border-t-[1px] border-gray-600 w-[70%]">
        <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 text-xs tracking-widest border-t-[1px] pt-3">
                <BsGrid3X3 />
                <p>POSTS</p>
            </div>
            <div className="flex items-center gap-2 text-xs tracking-widest pt-3">
                <HiOutlineBookmark />
                <p>SAVED</p>
            </div>
            <div className="flex items-center gap-2 text-xs tracking-widest pt-3">
                <LuContact />
                <p>TAGGED</p>
            </div>
        </div>
        <div className="flex items-center justify-center w-full min-h-96">
            <div className="flex flex-col items-center gap-4">
              <div>
                <img src={cameraIcon} alt="" />
              </div>
              <h1 className="text-[2rem] font-extrabold">Share Photos</h1>
              <p className="text-sm">When you share phots, they will appear on your proile.</p>
              <p className="text-sm text-blue-500 font-semibold">Share your first photo</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
