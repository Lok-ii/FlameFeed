import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import Comment from "../../assets/icons/Comment.jsx";
import Share from "../../assets/icons/Share.jsx";
import Saved from "../../assets/icons/Saved.jsx";
import { useDispatch, useSelector } from "react-redux";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { Link } from "react-router-dom";
import {
  createPost,
  setIsLiked,
  setIsLoading,
  setExpandedPost,
  setIsModalOpen
} from "../../Redux/postSlice.js";
import { LuHeart } from "react-icons/lu";
import dayjs from "dayjs";
import { useRef } from "react";

const Post = ({ post, type }) => {
  const dispatch = useDispatch();
  const commentRef = useRef("");
  const postTime =
    dayjs() - dayjs(post.createdAt) < 60000
      ? `${Math.floor((dayjs() - dayjs(post.createdAt)) / 1000)} s`
      : dayjs() - dayjs(post.createdAt) < 3600000
      ? `${Math.floor((dayjs() - dayjs(post.createdAt)) / (1000 * 60))} m`
      : dayjs() - dayjs(post.createdAt) < 86400000
      ? `${Math.floor((dayjs() - dayjs(post.createdAt)) / (1000 * 60 * 60))} h`
      : `${Math.floor(
          (dayjs() - dayjs(post.createdAt)) / (1000 * 60 * 60 * 24)
        )} d`;

  const { user } = useSelector((store) => store.auth);
  const { isLiked, allPosts, isLoading, isModalOpen } = useSelector((store) => store.post);
  return (
    <>
      <div className="avoid border w-[90%] flex flex-col gap-2 py-2">
        <div className="w-full flex items-center  justify-between px-2">
          <div className="flex items-center gap-2">
            <Link to={`/dashboard/profile/${post.userName}`}>
              <div className="w-10 h-10 cursor-pointer rounded-[50%]">
                <img
                  className="w-full h-full rounded-[50%] object-cover"
                  src={post.photoURL}
                  alt=""
                />
              </div>
            </Link>
            <Link to={`/dashboard/profile/${post.userName}`}>
              <p className="text-xs font-semibold cursor-pointer">
                {post.userName}
              </p>
            </Link>
            <p className="font-semibold text-xs text-textGray"> • {postTime}</p>
          </div>
          <BsThreeDots className="cursor-pointer" />
        </div>
        {type === "NORMAL" ? (
          <div className="w-full h-[80vh] cursor-pointer rounded-md">
            <img
              className="w-full h-full object-contain object-center rounded-md"
              src={post.media}
              alt=""
            />
          </div>
        ) : (
          <div className="w-full h-[74.5vh] cursor-pointer rounded-md shadow-postShadow overflow-y-scroll flex flex-col gap-4">
            {post.comments &&
              post.comments.map((comment) => {
                return (
                  <div key={comment.id} className="flex gap-2">
                    <img
                      src={`${comment.photoURL}`}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <span>{comment.username}</span>
                      <br />
                      <span>{comment.content}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        <div className="w-full py-2 px-2 flex justify-between">
          <div className="flex gap-2 cursor-pointer">
            {post.likes && (
              <LuHeart
                className={`w-[24px] h-[24px] transition-all ${
                  post.likes.includes(user.uid)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => {
                  if (isLiked.includes(post.id)) {
                    dispatch(
                      setIsLiked({ type: "already-liked", id: post.id })
                    );
                  } else {
                    dispatch(setIsLiked({ type: "not-liked", id: post.id }));
                  }
                  dispatch(
                    createPost({
                      type: "LIKES",
                      storedUser: user,
                      dispatch,
                      post,
                      currentLiked: isLiked,
                      allPosts,
                    })
                  );
                }}
              />
            )}
            <Comment />
            <Share />
          </div>
          <div className="w-6 cursor-pointer">
            <Saved />
          </div>
        </div>
        {type === "NORMAL" && (
          <div className="flex flex-col px-2 gap-2 text-[0.8rem] font-semibold">
            {post.likes && (
              <p className=" cursor-pointer">{post.likes.length} likes</p>
            )}
            <div className="flex gap-2">
              <p className=" cursor-pointer">{post.userName}</p>{" "}
              <p className=" cursor-pointer">{post.caption}</p>
            </div>
            <div className="flex flex-col gap-2">
              {post.comments &&
                post.comments.map(
                  (comment, idx) =>
                    idx <= 1 && (
                      <div key={comment.id} className="flex items-center gap-2">
                        <div className="text-sm flex gap-2">
                          <span>{comment.username}</span>
                          <span>{comment.content.substr(0, 50)}...</span>
                        </div>
                      </div>
                    )
                )}
            </div>
            <p
              className="text-textGray font-light cursor-pointer"
              onClick={() => {
                dispatch(setIsModalOpen(true));
                dispatch(setExpandedPost(post));
              }}
            >
              View all comments
            </p>
            <div className="flex items-center">
              <input
                type="text"
                className="outline-none w-[90%] text-textGray font-light border-b-2 border-b-white bg-transparent cursor-pointer"
                placeholder="Add a comment..."
                ref={commentRef}
              />
              <button
                className="w-[10%] text-bluePrimary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setIsLoading(true));
                  dispatch(
                    createPost({
                      type: "COMMENT",
                      storedUser: user,
                      dispatch,
                      post,
                      allPosts,
                      comment: commentRef.current.value,
                    })
                  );
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
    </>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired, // Add this line
    caption: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    likes: PropTypes.array,
    user: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    comments: PropTypes.array,
    // Include other properties of post as needed
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Post;
