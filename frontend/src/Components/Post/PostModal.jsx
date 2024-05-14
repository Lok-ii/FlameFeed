import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../Redux/postSlice.js";
import Post from "./Post.jsx";

const PostModal = () => {
  const dispatch = useDispatch();
  const { expandedPost, isModalOpen } = useSelector((store) => store.post);
  return (
    <div
      className={`w-[100%] h-[100vh] fixed items-center justify-center rounded-lg ${
        isModalOpen ? "top-9 md:top-0 flex" : "top-[100%] flex md:hidden md:top-0"
      } z-[999] transition duration-200 ease-in-out`}
      onClick={(e) => {
        if (!e.target.classList.contains("avoid")) {
          dispatch(setIsModalOpen(false));
        }
      }}
    >
      <div className="w-full md:w-[80%] rounded-lg h-[90%] bg-black z-[1000]">
        <div className={`avoid w-[100%] h-[100%] flex rounded-lg`}>
          <div className="avoid w-[50%] h-full hidden md:flex items-center">
            <img
              src={expandedPost.media}
              alt=""
              className="avoid w-full h-full"
            />
          </div>
          <div className="avoid w-full md:w-[50%] rounded-lg h-[100%]">
            <Post post={expandedPost} type={"EXPANDED"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
