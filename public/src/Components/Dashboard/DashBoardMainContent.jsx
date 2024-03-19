import DashBoardRightSideBar from "./DashBoardRightSideBar";
import StoryTile from "./StoryTile";
import Carousel from "nuka-carousel";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Post from "./Post";

const DashBoardMainContent = () => {

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
        <div className="w-[65%] h-[3000px]">
          <Post />
        </div>
      </div>
      <DashBoardRightSideBar />
    </div>
  );
};

export default DashBoardMainContent;
