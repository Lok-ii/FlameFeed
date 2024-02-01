import React from 'react';
import profile from "../../assets/images/profile.avif";

const Suggested = (props) => {
  return (
    <div className="currentUser flex items-center justify-between">
        <div className="userProfile flex items-center gap-4">
          <img
            src={profile}
            className="w-[2rem] h-[2rem] rounded-[50%]"
            alt=""
          />
          <div className="userName">
            <h2 className="font-semibold text-sm">{props.username}</h2>
            <p className="text-xs">Suggested for you</p>
          </div>
        </div>
        <p className="font-semibold text-blue-400 text-xs cursor-pointer">
          Follow
        </p>
      </div>
  )
}

export default Suggested;
