import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../Redux/postSlice.js";
import Post from "./Post.jsx";

const PostModal = () => {
  const dispatch = useDispatch();
  const { expandedPost, isModalOpen } = useSelector((store) => store.post);
  return (
    <div
      className={`w-[100%] h-[100vh] fixed top-0 left-0 items-center justify-center ${
        isModalOpen ? "flex" : "hidden"
      } z-[999]`}
      onClick={(e) => {
        if (!e.target.classList.contains("avoid")) {
          dispatch(setIsModalOpen(false));
        }
      }}
    >
      <div className="w-[80%] h-[90%] bg-black z-[1000]">
        <div className={`avoid w-[100%] h-[100%] flex`}>
          {console.log(expandedPost)}
          <div className="avoid w-[50%] h-full flex items-center">
            <img
              src={expandedPost.media}
              alt=""
              className="avoid w-full h-full"
            />
          </div>
          <div className="avoid w-[50%] h-[100%]">
            <Post post={expandedPost} type={"EXPANDED"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
