import DashBoardRightSideBar from "./DashBoardRightSideBar";
import StoryTile from "./StoryTile";
import Carousel from "nuka-carousel";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { setAllPosts } from "../../Redux/postSlice.js";
import PostModal from "./PostModal.jsx";
import { nanoid } from "nanoid";

const DashBoardMainContent = () => {
  const { user } = useSelector(store => store.auth)
  const {allPosts, isLiked } = useSelector(store => store.post);
  const dispatch = useDispatch();
  // console.log(nanoid(8))

  // useEffect(() => {
  //     const fetchUser = async () => {
  //       const posts = await getDocs(collection(db, "posts"));
  //       let postsData = [];
  //       posts.forEach((post) => {
  //         postsData.push(post.data());
  //       })
  //       dispatch(setAllPosts(postsData));
  //     }
  //     fetchUser();
  //   }, [isLiked]);

  return (
    <div className="w-[85%] flex gap-8">
      <div className="w-[60%] flex flex-col items-end">
        <div className="w-[65%] h-20 flex items-start gap-2 overflow-hidden">
          <Carousel
            tabbed={false}
            slidesToScroll={4}
            slidesToShow={8}
            renderCenterLeftControls={({previousSlide}) => <BsArrowLeftCircleFill onClick={previousSlide} />}
            renderCenterRightControls={({nextSlide}) => <BsArrowRightCircleFill  onClick={nextSlide} />}
            className="w-[100%]"
          >
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
            <StoryTile />
          </Carousel>
        </div>
        <div className="w-[65%] h-[3000px] py-8 flex flex-col items-center gap-8">
          {
            allPosts && allPosts.map((post) => {
              if(post.user === user.uid || user.following.includes(post.user)){
                return <Post key={post.id} post={post} type={"NORMAL"} />
              }else{
                return null;
              }
            })
          }
        </div>
      </div>
      <PostModal />
      <DashBoardRightSideBar />
    </div>
  );
};

export default DashBoardMainContent;
