import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { useInsta } from "../Context/Context";


const loginWithFacebook = () => {
  const { handleFacebookSignUp } = useInsta();
  return (
    <div className="loginWithFacebook w-[100%] gap-2 flex items-center justify-center" onClick={handleFacebookSignUp}>
      <AiFillFacebook className="text-[#00376B]" />
      <p className="loginFb text-[#385185] text-sm font-semibold">Login with Facebook</p>
    </div>
  );
};

export default loginWithFacebook;
