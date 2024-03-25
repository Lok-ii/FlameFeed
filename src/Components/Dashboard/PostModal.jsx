import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  setExpandedPost,
  setIsModalOpen,
} from "../../Redux/postSlice.js";
import Post from "./Post.jsx";

const PostModal = () => {
  const dispatch = useDispatch();
  const { expandedPost, isModalOpen } = useSelector((store) => store.post);
  return (
    <div className="w-[80vw] h-[80vh]">
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        className="w-[100%] h-[60vh]"
        onCancel={() => dispatch(setIsModalOpen(false))}
      >
        <div className={`avoid w-[100%] h-[100%] flex`}>
          {console.log(expandedPost)}
          <div className="avoid w-[65%] h-full flex items-center">
            <img
              src={expandedPost.media}
              alt=""
              className="avoid w-full h-full object-cover"
            />
          </div>
          <div className="avoid w-[35%] h-[100%]">
            <Post post={expandedPost} type={"EXPANDED"} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostModal;
