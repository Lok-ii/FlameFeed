import { useEffect } from "react";
import authImage from "../../assets/images/homepage.png";
import AuthFooter from "./AuthFooter";
import { Outlet } from 'react-router-dom';
import { setAuthImage, setImageIdx, setUser, handlePhoto } from "../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";


const AuthPage = () => {
  const dispatch = useDispatch();
  const { authImages, authPageImage, imageIndex } = useSelector(state => state.auth);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      dispatch(setUser(storedUser));
      dispatch(handlePhoto(storedUser.photoURL));
    }
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
      <div className="authPage w-full md:w-[60%] flex flex-col md:flex-row gap-8 items-center md:items-start justify-center pt-4">
        <div className="authImageContainer hidden md:flex relative md:w-auto w-[50%]">
          <img src={authImage} alt="" className="authImage" />
          <img
            src={authPageImage}
            alt=""
            className="changingImage md:w-auto w-[54%] absolute top-[0.5rem] left-[33.5%] md:right-[3.7rem] md:top-6"
          />
        </div>
        <Outlet />
      </div>
      <AuthFooter />
    </>
  );
};

export default AuthPage;
