import React from "react";
import { useInsta } from "../Context/Context";

const Or = () => {
  return (
    <div className="or w-[70%] flex gap-2 items-center justify-center text-[#737373] text-[0.8125rem]">
      <hr className="w-[45%]" />
      <span className="w-[10%]">OR</span>
      <hr className="w-[45%]" />
    </div>
  );
};

export default Or;
