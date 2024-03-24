import Suggested from "./Suggested";
import CreatePost from "../CreatePost/CreatePost";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashBoardRightSideBar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-[40%] flex flex-col gap-8 pr-48 py-8">
      <div className="currentUser flex items-center justify-between">
        <div className="userProfile flex items-center gap-4">
          <Link to={`/dashboard/profile/${user.username}`}><img
            src={user.photoURL}
            className="w-[2rem] h-[2rem] rounded-[50%]"
            alt=""
          /></Link>
          <div className="userName">
            <Link to={`/dashboard/profile/${user.username}`}>
              <h2 className="font-semibold text-sm">{user.username}</h2>
            </Link>
            <p className="text-xs">{user.displayName}</p>
          </div>
        </div>
        <p className="font-semibold text-blue-400 text-xs cursor-pointer">
          Switch
        </p>
      </div>
      <div className="suggested flex flex-col gap-4 ">
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-400 font-semibold ">
            Suggested for you
          </p>
          <p className="text-xs font-bold">See all</p>
        </div>
        <div className="flex flex-col gap-3 ">
          <Suggested username={"username"} />
          <Suggested username={"username"} />
          <Suggested username={"username"} />
          <Suggested username={"username"} />
          <Suggested username={"username"} />
          <Suggested username={"username"} />
          <Suggested username={"username"} />
        </div>
        <CreatePost />
      </div>
    </div>
  );
};

export default DashBoardRightSideBar;
