import ProfileIcon from "./ProfileIcon.jsx";
import { BsThreeDots } from "react-icons/bs";
const Post = () => {
  return (
    <div className="border w-[90%] flex flex-col">
      <div className="w-full flex items-center  justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <ProfileIcon />
          </div>
          <p className="text-xs font-semibold">Username</p>
        </div>
        <BsThreeDots />
      </div>
      <div>

      </div>
    </div>
  );
};

export default Post;
