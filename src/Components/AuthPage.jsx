import React from "react";
import authImage from "../assets/images/homepage.png";
import Login from "./Login";
import { useInsta } from "../Context/Context";
import AuthFooter from "./AuthFooter";
import { Outlet } from 'react-router-dom';

const AuthPage = () => {
  const instaCtx = useInsta();

  return (
    <>
      <div className="authPage w-[60%] flex gap-8 items-start justify-center">
        <div className="authImageContainer relative">
          <img src={authImage} alt="" className="authImage" />
          <img
            src={instaCtx.authPageImage}
            alt=""
            className="changingImage absolute right-[3.7rem] top-6"
          />
        </div>
        <Outlet />
      </div>
      <AuthFooter />
    </>
  );
};

export default AuthPage;
