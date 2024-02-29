import React from "react";
import profile from "../../assets/images/profile.avif";

const StoryTile = () => {
  return (
    <div className="px-4 py-2 justify-center items-center flex flex-col gap-1">
      <div className="w-14 h-14 rounded-full bg-instaGradient flex items-center justify-center">
        <div className="w-[90%] h-[90%] rounded-full">
          <img className="w-full h-full rounded-full" src={profile} alt="" />
        </div>
      </div>
      <p className="text-xs">username</p>
    </div>
  );
};

export default StoryTile;
