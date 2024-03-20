import DashBoardRightSideBar from "./DashBoardRightSideBar";
import StoryTile from "./StoryTile";
import Carousel from "nuka-carousel";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Post from "./Post";
import { useSelector } from "react-redux";

const DashBoardMainContent = () => {

  const {user} = useSelector(store => store.auth);

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
            user.posts && user.posts.map((post) => {
              return <Post key={post.id} post={post} />
            })
          }
        </div>
      </div>
      <DashBoardRightSideBar />
    </div>
  );
};

export default DashBoardMainContent;
