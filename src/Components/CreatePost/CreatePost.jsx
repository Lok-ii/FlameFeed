import { useRef, useState } from "react";
import SelectFile from "../../assets/icons/SelectFile";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import {
  setMediaAttached,
  setMedia,
  createPost,
  setCreateBox,
  setIsLoading,
} from "../../Redux/postSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const notify = () => toast("Posted Successfully");

  const [mediaFile, setMediaFile] = useState("");
  const captionRef = useRef("");
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { media, mediaAttached, createBox, isLoading, allPosts } = useSelector(
    (store) => store.post
  );
  return (
    <div
      className={`fixed ${
        !mediaAttached
          ? createBox
            ? "w-[40%] left-[30%] h-[90vh] animate__zoomIn"
            : "w-0 h-0 animate__zoomOut"
          : "w-[80%] left-[10%] h-[90vh]"
      } animate__animated z-[10000] top-[3rem]  bg-grayPrimary rounded-lg transition-all duration-300 overflow-hidden ${createBox ? "" : "hidden"}`}
    >
      <ToastContainer autoClose={2000} />
      <div className="w-full border-b-[1px] border-b-lightGrayPrimary flex justify-center relative">
        <p className="py-2 font-semibold">Create a new post</p>
        <IoCloseSharp
          className="absolute text-textGray text-xl top-3 right-2 cursor-pointer"
          onClick={() => dispatch(setCreateBox(false))}
        />
      </div>
      {!mediaAttached ? (
        <div className="flex flex-col w-full h-full justify-center">
          <label
            htmlFor="postImage"
            className="flex flex-col items-center gap-4 cursor-pointer"
          >
            <SelectFile />
            <span className="py-2 px-8 bg-bluePrimary rounded-lg hover:bg-blue-600 transition-all duration-300">
              {media === "" ? (
                <UseAnimations animation={loading} size={14} />
              ) : (
                "Select From Computer"
              )}
            </span>
          </label>
          <input
            type="file"
            hidden
            id="postImage"
            name="post_image"
            onChange={(e) => {
              setMediaFile(e.target.files[0]);
              const file = URL.createObjectURL(e.target.files[0]);
              dispatch(setMediaAttached(true));
              dispatch(setMedia(file));
            }}
          />
        </div>
      ) : (
        <div className="w-full h-[84vh] flex items-center">
          <div className="w-[50%] h-full p-2 rounded-lg">
            <img
              className="w-full h-full rounded-lg object-cover"
              src={media}
              alt=""
            />
          </div>
          <div className="self-start p-2 w-1/2 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 cursor-pointer rounded-[50%]">
                <img
                  className="w-full h-full object-cover rounded-[50%]"
                  src={user.photoURL}
                  alt=""
                />
              </div>
              <p className="text-sm font-semibold cursor-pointer">
                {user.username}
              </p>
            </div>
            <textarea
              name="caption"
              placeholder="Write a caption..."
              className="w-full p-2 bg-transparent"
              id=""
              cols="30"
              rows="10"
              ref={captionRef}
              autoFocus
            ></textarea>
            <button
              className="bg-bluePrimary py-2 px-4 rounded-lg font-semibold flex items-center justify-center"
              onClick={async (e) => {
                e.preventDefault();
                if (mediaFile) {
                  dispatch(setIsLoading(true));
                  await dispatch(
                    createPost({
                      type: "POSTS",
                      file: mediaFile,
                      storedUser: user,
                      caption: captionRef.current.value,
                      allPosts,
                      dispatch,
                      notify,
                    })
                  );
                }
              }}
            >
              {isLoading ? (
                <UseAnimations animation={loading} size={14} />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
