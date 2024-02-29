import React from "react";
import DashBoardRightSideBar from "./DashBoardRightSideBar";
import StoryTile from "./StoryTile";
import Carousel from "nuka-carousel";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";

const DashBoardMainContent = () => {
  window.onload = () => {
    const prevBtn = document.querySelector(".slider-control-centerleft");
    prevBtn.innerHTML = `<BsArrowLeftCircleFill />`;
  };
  return (
    <div className="w-[85%] flex gap-8">
      <div className="w-[60%] flex justify-end">
        <div className="w-[65%] h-20 flex items-start gap-2 overflow-hidden">
          <Carousel
            tabbed={false}
            slidesToScroll={4}
            slidesToShow={8}
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
      </div>
      <DashBoardRightSideBar />
    </div>
  );
};

export default DashBoardMainContent;
