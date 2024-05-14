import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { setUser, handlePhoto } from "../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSetting } from "../../Redux/SidebarSlice";
import { setAllPosts, setIsLiked } from "../../Redux/postSlice";
import dayjs from "dayjs";
import PostModal from "../Post/PostModal";
import CreatePost from "../CreatePost/CreatePost";
import { setRandomUsers } from "../../Redux/profileSlice";
import FooterNav from "../FooterNav/FooterNav";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { toggleSettings } = useSelector((store) => store.sidebar);
  const { isModalOpen } = useSelector((store) => store.post);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const verifyUser = async () => {
      const user = await axios.post(
        `${baseUrl}/user/authenticate`,
        {},
        {
          withCredentials: true,
        }
      );
      const storedUser = user.data.user;
      if (user.data.success) {
        dispatch(setUser(storedUser));
        dispatch(handlePhoto(storedUser.photoURL));
        dispatch(setIsLiked(storedUser.likedPosts));
      } else {
        navigate("/");
      }
    };
    verifyUser();

    const getPosts = async () => {
      const allPosts = await axios.get(`${baseUrl}/post/`);
      console.log(allPosts.data);
      if (allPosts.data.success) {
        const posts = allPosts.data.posts;
        posts.sort((a, b) => {
          return dayjs(b.createdAt) - dayjs(a.createdAt);
        });
        dispatch(setAllPosts(posts));
      }
    };
    getPosts();

    const getUsers = async () => {
      const user = await axios.get(`${baseUrl}/user/`);
      if (user.data.success) {
        dispatch(setRandomUsers(user.data.users));
      }
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
      {user && (
        <>
          <DashboardSidebar />
          <Outlet />
          {isModalOpen && <PostModal />}
          <CreatePost />
          <FooterNav />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            rtl={false}
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
