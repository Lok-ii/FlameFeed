import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { setUser, handlePhoto } from "../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSetting } from "../../Redux/SidebarSlice";
import { collection, getDocs } from "firebase/firestore";
import { setAllPosts, setIsLiked } from "../../Redux/postSlice";
import { db } from "../firebase";
import dayjs from "dayjs";
import PostModal from "../Post/PostModal";
import CreatePost from "../CreatePost/CreatePost";
import { setRandomUsers } from "../../Redux/profileSlice";
import FooterNav from "../FooterNav/FooterNav";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleSettings } = useSelector((store) => store.sidebar);
  const { isModalOpen } = useSelector((store) => store.post);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (
      storedUser !== null &&
      storedUser !== undefined &&
      Object.keys(storedUser).length > 0 &&
      typeof storedUser !== "string"
    ) {
      dispatch(setUser(storedUser));
      dispatch(handlePhoto(storedUser.photoURL));
      dispatch(setIsLiked(storedUser.likedPosts));
    } else if (storedUser === "Error (auth/invalid-credential).") {
      navigate("/");
    } else {
      navigate("/");
    }

    const getPosts = async () => {
      const postCollection = await getDocs(collection(db, "posts"));
      let posts = [];
      postCollection.forEach((post) => {
        posts.push(post.data());
      });
      posts.sort((a, b) => {
        return dayjs(b.createdAt) - dayjs(a.createdAt);
      });
      dispatch(setAllPosts(posts));
    };
    getPosts();

    const getUsers = async () => {
      const userCollection = await getDocs(collection(db, "users"));
      let users = [];
      userCollection.forEach((user) => {
        users.push(user.data());
      });
      dispatch(setRandomUsers(users));
    };
    getUsers();
  }, [dispatch, navigate]);
  return (
    <div
      className="dashboard relative flex w-[100%] items-start justify-between"
      onClick={(e) => {
        if (
          !e.target.classList.contains("moreSettings") &&
          e.target.className !== "ps-menu-label css-12w9als" &&
          !e.target.classList.contains("sidebarIcons") &&
          e.target.className !== "ps-menu-button" &&
          toggleSettings === false
        ) {
          dispatch(setToggleSetting(true));
        }
      }}
    >
      <DashboardSidebar />
      <Outlet />
      {isModalOpen && <PostModal />}
      <CreatePost />
      <FooterNav  />
    </div>
  );
};

export default Dashboard;
