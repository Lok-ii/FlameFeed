import Settings from "../../assets/icons/Settings";
import Activity from "../../assets/icons/Activity";
import Saved from "../../assets/icons/Saved";
import { useSelector } from "react-redux";


const Setting = () => {
    const { toggleSettings } = useSelector(state => state.sidebar);
  return (
    <div className={`fixed ${toggleSettings ? "bottom-[-300px]" : "bottom-14"} left-0 flex flex-col p-2 w-[15%] bg-grayPrimary rounded-xl transition-all duration-300 z-[10000]`}>
      <div className="flex gap-4 h-12 items-center hover:bg-lightGrayPrimary p-2 rounded-lg cursor-pointer">
        <div className="w-6">
            <Settings />
        </div>
        <p>Settings</p>
      </div>
      <div className="flex gap-4 h-12 items-center hover:bg-lightGrayPrimary p-2 rounded-lg cursor-pointer">
        <div className="w-6">
            <Activity />
        </div>
        <p>Your Activity</p>
      </div>
      <div className="flex gap-4 h-12 items-center hover:bg-lightGrayPrimary p-2 rounded-lg cursor-pointer">
        <div className="w-6">
            <Saved />
        </div>
        <p>Saved</p>
      </div>
      <hr className="my-2 border-lightGrayPrimary" />
      <div className="flex gap-4 h-12 items-center hover:bg-lightGrayPrimary p-2 rounded-lg cursor-pointer">
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Setting;
