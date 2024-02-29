import React, { useEffect } from "react";
import authImage from "../assets/images/homepage.png";
import Login from "./Login";
import AuthFooter from "./AuthFooter";
import { Outlet } from 'react-router-dom';
import { setAuthImage, setImageIdx } from "../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";


const AuthPage = () => {
  const dispatch = useDispatch();
  const { authImages, authPageImage, imageIndex } = useSelector(state => state.auth);
  
  useEffect(() => {
    const imageInterval = setInterval(() => {
      dispatch(setAuthImage(authImages[(imageIndex + 1) % authImages.length]));
      dispatch(setImageIdx((imageIndex + 1) % authImages.length));
    }, 2000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [])

  return (
    <>
      <div className="authPage w-[60%] flex gap-8 items-start justify-center">
        <div className="authImageContainer relative">
          <img src={authImage} alt="" className="authImage" />
          <img
            src={authPageImage}
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
