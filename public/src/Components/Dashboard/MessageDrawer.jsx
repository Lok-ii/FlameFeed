import React from "react";
import Edit from "../../assets/icons/Edit";
import MessageTile from "./MessageTile";

const MessageDrawer = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center gap-4">
      <div className="w-full py-4 px-8 flex items-center justify-between">
        <h1 className="font-bold text-xl">username</h1>
        <Edit />
      </div>
      <div className="w-full h-[93%] flex flex-col items-center gap-4">
        <div className="w-full flex items-center justify-between px-8">
          <p className="font-bold text-[1rem] ">Messages</p>
          <p className="font-semibold text-[0.875rem] text-bluePrimary">
            Request
          </p>
        </div>
        <div className="w-full h-[90%] flex flex-col items-center gap-4 overflow-y-scroll">
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
          <MessageTile />
        </div>
      </div>
    </div>
  );
};

export default MessageDrawer;
