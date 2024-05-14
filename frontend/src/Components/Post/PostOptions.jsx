import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../Redux/postSlice";
import PropTypes from "prop-types";

const PostOptions = ({ open, setOpen, post }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        style={{ backgroundColor: "#262626" }}
        className="bg-grayPrimary postOptions"
        open={open}
        closable={false}
        onCancel={() => setOpen(false)}
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}
        centered
      >
        <div
          className={`flex flex-col w-full bg-grayPrimary rounded-xl text-white text-center transition-all duration-300 z-[10000]`}
        >
          <div className="flex items-center hover:bg-lightGrayPrimary rounded-lg cursor-pointer text-red-800">
            {user.username === post.user.username ? (
              <p
                className="w-full p-2"
                onClick={() => {
                  dispatch(createPost({ post, dispatch, type: "DELETE" }));
                  setOpen(false);
                }}
              >
                Delete Post
              </p>
            ) : (
              <p className="w-full p-2" onClick={() => console.log("clicked")}>
                Unfollow
              </p>
            )}
          </div>
          <hr className="border-lightGrayPrimary" />
          <div className="flex items-center hover:bg-lightGrayPrimary rounded-lg cursor-pointer">
            <p className="w-full p-2">Add to Favourites</p>
          </div>
          <hr className=" border-lightGrayPrimary" />
          <div
            className="flex items-center hover:bg-lightGrayPrimary rounded-lg cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <p className="w-full p-2">Cancel</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

PostOptions.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  post: PropTypes.object,
};

export default PostOptions;
