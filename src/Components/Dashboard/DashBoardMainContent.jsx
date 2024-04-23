import DashBoardRightSideBar from "./DashBoardRightSideBar";
import StoryTile from "./StoryTile";
import Carousel from "nuka-carousel";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const DashBoardMainContent = () => {
  const { user } = useSelector((store) => store.auth);
  const { allPosts } = useSelector((store) => store.post);

  return (
    <div className="w-full md:w-[70%] xl:w-[85%] flex xl:gap-8">
      <div className="w-full lg:w-[60%] xl:w-[60%] flex flex-col items-center xl:items-end">
        <div className="w-[90%] lg:w-[90%] xl:w-[65%] h-20 flex md:flex-row flex-col items-center md:items-start gap-2 overflow-hidden">
          <Carousel
            tabbed={false}
            slidesToScroll={1}
            slidesToShow={8}
            renderCenterLeftControls={({ previousSlide }) => (
              <BsArrowLeftCircleFill onClick={previousSlide} />
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <BsArrowRightCircleFill onClick={nextSlide} />
            )}
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
        <div className="w-[90%] lg:w-[90%] xl:w-[65%] py-8 flex flex-col items-center gap-8">
          {allPosts.length > 0 ? (
            allPosts.map((post) => {
              if (
                post.user === user.uid ||
                user.following.includes(post.user)
              ) {
                return <Post key={post.id} post={post} type={"NORMAL"} />;
              } else {
                return null;
              }
            })
          ) : (
            <p>You have no friends, Go make some.</p>
          )}
        </div>
      </div>
      <DashBoardRightSideBar />
    </div>
  );
};

export default DashBoardMainContent;
