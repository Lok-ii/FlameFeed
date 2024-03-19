import ProfileIcon from "./ProfileIcon";

const StoryTile = () => {
  return (
    <div className="px-4 py-2 justify-center items-center flex flex-col gap-1">
      <div className="w-14 h-14">
        <ProfileIcon />
      </div>
      <p className="text-xs">username</p>
    </div>
  );
};

export default StoryTile;
