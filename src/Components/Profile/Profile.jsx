import { useEffect } from "react";
import Settings from "../../assets/icons/Settings";
import { BsGrid3X3 } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi2";
import { LuContact } from "react-icons/lu";
import cameraIcon from "../../assets/images/camera.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/AuthSlice";


const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log((storedUser));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, []);

  const { user } = useSelector(state => state.auth);
  return (
    user && <div className="profile flex-grow w-[70%] px-20 py-10 flex items-center flex-col gap-16">
      <div className="flex items-center gap-16">
        <div className="profileImageContainer rounded-[50%] h-[9.375rem] w-[9.375rem]">
          <img className="profileImage object-cover w-full h-full rounded-[50%]" src={user.photoURL} alt="" />
        </div>
        <div className="profileDetails flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <p className="text-xl">{user.username}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Link to={"/dashboard/editprofile"}><button className="editProfile cursor-pointer bg-[#363636] px-4 py-2 font-medium text-sm rounded-lg">Edit profile</button></Link>
                <button className="viewArchive cursor-pointer bg-[#363636] px-4 py-2 rounded-lg font-medium text-sm">VIew archive</button>
              </div>
              <div className="settingsIcon cursor-pointer">
                <Settings />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-12 text-sm">
            {user.posts && <p><span className="font-semibold">{user.posts.length}</span> posts</p>}
            {user.followers && <p><span className="font-semibold">{user.followers.length}</span> followers</p>}
            {user.following && <p><span className="font-semibold">{user.following.length}</span> following</p>}
          </div>
          <div>
            <p className="font-semibold text-sm">{user.displayName}</p>
            <p className="text-sm">{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center border-t-[1px] border-gray-600 w-[70%]">
        <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 text-xs tracking-widest border-t-[1px] pt-3">
                <BsGrid3X3 />
                <p>POSTS</p>
            </div>
            <div className="flex items-center gap-2 text-xs tracking-widest pt-3">
                <HiOutlineBookmark />
                <p>SAVED</p>
            </div>
            <div className="flex items-center gap-2 text-xs tracking-widest pt-3">
                <LuContact />
                <p>TAGGED</p>
            </div>
        </div>
        <div className="flex items-center justify-center w-full min-h-96">
            <div className="flex flex-col items-center gap-4">
              <div>
                <img src={cameraIcon} alt="" />
              </div>
              <h1 className="text-[2rem] font-extrabold">Share Photos</h1>
              <p className="text-sm">When you share phots, they will appear on your proile.</p>
              <p className="text-sm text-blue-500 font-semibold">Share your first photo</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
