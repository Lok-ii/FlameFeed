import React from "react";
import { Link } from "react-router-dom";
import { useInsta } from "../Context/Context";

const Account = (props) => {
  const {setError} = useInsta();
  return <div className="account w-[100%] flex items-center justify-center text-sm gap-2 border p-4 border-gray-300 ">
    <p className="dontHave">{props.content}</p> <Link onClick={() => setError("")} to={props.link}className="text-[#4CB5F9] font-semibold text-base">{props.name}</Link>
  </div>;
};

export default Account;
