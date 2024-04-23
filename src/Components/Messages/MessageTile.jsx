import profile from "../../assets/images/profile.avif";
import { LuDot } from "react-icons/lu";


const MessageTile = () => {
  return (
    <div className="w-full px-4 flex items-center justify-between">
      <div className="w-[90%] flex items-center gap-4">
      <div className="w-[12%] rounded-[50%]">
        <img src={profile} alt="" className="rounded-[50%]" />
      </div>
      <div className="w-[88%] flex flex-col">
        <p>user</p>
        <div className="flex items-center gap-4">
          <p>user sent an attachment.</p>
          <span className="text-xs text-gray-500">1 h</span>
        </div>
      </div>
      </div>
      <LuDot className="text-bluePrimary w-[10%] h-full text-[3rem]"/>
    </div>
  );
};

export default MessageTile;
