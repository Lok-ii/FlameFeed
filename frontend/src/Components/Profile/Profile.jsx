import { useEffect } from "react";
import Settings from "../../assets/icons/Settings";
import { BsGrid3X3 } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi2";
import cameraIcon from "../../assets/images/camera.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  profileStats,
  setSearchedUser,
  setSelectedTab,
} from "../../Redux/profileSlice";
import { setExpandedPost, setIsModalOpen } from "../../Redux/postSlice";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.auth);
  const { searchedUser, selectedTab } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(setSelectedTab("posts"));

    return () => dispatch(setSelectedTab("posts"));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const findUser = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/${params.username}`
      );
      console.log(findUser.data);
      dispatch(setSearchedUser(findUser.data.user));
    };
    getUser();
  }, [dispatch, params.username, user]);
  return (
    user && (
      <div className="profile flex-grow w-full md:w-[70%] px-2 md:px-20 py-10 flex items-center flex-col gap-16">
        <div className="flex items-start md:items-center gap-4 md:gap-16">
          <div className="profileImageContainer rounded-[50%] w-[4rem] xs:h-[4rem] h-[3.5rem] md:h-[9.375rem] md:w-[9.375rem]">
            <img
              className="profileImage object-cover w-full h-full rounded-[50%]"
              src={searchedUser.photoURL}
              alt=""
            />
          </div>
          <div className="profileDetails flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <p className="text-xl">{searchedUser.username}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {params.username === user.username ? (
                    <Link to={"/dashboard/editprofile"}>
                      <button className="editProfile cursor-pointer bg-[#363636] px-4 py-2 font-medium text-sm rounded-lg">
                        Edit profile
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="editProfile cursor-pointer bg-[#363636] px-4 py-2 font-medium text-sm rounded-lg"
                      onClick={() => {
                        dispatch(
                          profileStats({
                            type: "FOLLOW",
                            searchedUser,
                            dispatch,
                          })
                        );
                      }}
                    >
                      {searchedUser.followers &&
                      !searchedUser.followers.includes(user._id)
                        ? "Follow"
                        : "Unfollow"}
                    </button>
                  )}
                  {params.username === user.username && (
                    <button className="viewArchive cursor-pointer hidden md:block bg-[#363636] px-4 py-2 rounded-lg font-medium text-sm">
                      VIew archive
                    </button>
                  )}
                </div>
                <div className="settingsIcon hidden md:block cursor-pointer">
                  <Settings />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-12 text-sm">
              {searchedUser.posts && (
                <p>
                  <span className="font-semibold">
                    {searchedUser.posts.length}
                  </span>{" "}
                  posts
                </p>
              )}
              {searchedUser.followers && (
                <p>
                  <span className="font-semibold">
                    {searchedUser.followers.length}
                  </span>{" "}
                  followers
                </p>
              )}
              {searchedUser.following && (
                <p>
                  <span className="font-semibold">
                    {searchedUser.following.length}
                  </span>{" "}
                  following
                </p>
              )}
            </div>
            <div className="w-full">
              <p className="font-semibold text-sm">
                {searchedUser.displayName}
              </p>
              <p className="text-sm">{searchedUser.bio}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center border-t-[1px] border-gray-600 w-[70%]">
          <div className="flex items-center gap-12">
            <div
              className={`flex items-center gap-2 text-xs tracking-widest ${
                selectedTab === "posts" ? "border-t-[1px]" : ""
              } pt-3 cursor-pointer`}
              onClick={() => dispatch(setSelectedTab("posts"))}
            >
              <BsGrid3X3 />
              <p>POSTS</p>
            </div>
            <div
              className={`flex items-center gap-2 text-xs tracking-widest ${
                selectedTab === "saved" ? "border-t-[1px]" : ""
              } pt-3 cursor-pointer`}
              onClick={() => dispatch(setSelectedTab("saved"))}
            >
              <HiOutlineBookmark />
              <p>SAVED</p>
            </div>
          </div>
          {searchedUser.posts && Object.keys(searchedUser).length !== 0 && (
            <div
              className={`flex ${
                searchedUser?.selectedTab?.length === 0 ? "items-center" : ""
              } justify-center w-full min-h-96`}
            >
              {searchedUser[selectedTab].length === 0 ? (
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <img src={cameraIcon} alt="" />
                  </div>
                  <h1 className="text-[2rem] font-extrabold">Share Photos</h1>
                  <p className="text-sm">
                    When you share phots, they will appear on your proile.
                  </p>
                  <p className="text-sm text-blue-500 font-semibold">
                    Share your first photo
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center w-[100%] gap-y-0">
                  {searchedUser[selectedTab].length > 0 &&
                    searchedUser[selectedTab].map((post) => {
                      return (
                        <div
                          className={`w-[15rem] h-[15rem] group relative transition-all duration-300 ease-in-out`}
                          key={post._id}
                          onClick={() => {
                            dispatch(setIsModalOpen(true));
                            dispatch(setExpandedPost(post));
                          }}
                        >
                          <div className="absolute top-0 left-0 w-full h-full bg-lightBlack flex opacity-0 group-hover:opacity-100 items-center justify-center gap-8 transition-all duration-300 ease-in-out">
                            <div className="flex flex-row gap-2 items-center">
                              <FaHeart className=" w-[24px] h-[24px]" />
                              {console.log(post)}
                              {post?.likes?.length > 0
                                ? post?.likes?.length
                                : 0}
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                              <FaComment className=" w-[24px] h-[24px]" />
                              {post.comments.length > 0
                                ? post.comments.length
                                : 0}
                            </div>
                          </div>
                          <img
                            src={post.media}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
