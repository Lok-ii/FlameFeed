import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import Comment from "../../assets/icons/Comment.jsx";
import Share from "../../assets/icons/Share.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPost, setIsLiked } from "../../Redux/postSlice.js";
import { LuHeart } from "react-icons/lu";
import dayjs from "dayjs";
import LikeAndComment from "./LikeAndComment.jsx";
import { useState } from "react";
import PostOptions from "./PostOptions.jsx";
import { LuBookmark } from "react-icons/lu";

const Post = ({ post, type }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
  const { isLiked, allPosts } = useSelector((store) => store.post);
  return (
    <>
      <div className="avoid border w-[100%] flex flex-col gap-2 py-2">
        <div className="avoid w-full flex items-center  justify-between px-2 border-b-[1px] border-gray py-2">
          <div className="avoid flex items-center gap-2">
            <Link to={`/dashboard/profile/${post.user.username}`}>
              <div className="avoid w-10 h-10 cursor-pointer rounded-[50%]">
                <img
                  className="avoid w-full h-full rounded-[50%] object-cover"
                  src={post.user.photoURL}
                  alt=""
                />
              </div>
            </Link>
            <Link to={`/dashboard/profile/${post.user.username}`}>
              <p className="avoid text-xs font-semibold cursor-pointer">
                {post.user.username}
              </p>
            </Link>
            <p className="avoid font-semibold text-xs text-textGray">
              {" "}
              • {postTime}
            </p>
          </div>
          <div className="relative">
            <BsThreeDots
              className="avoid cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <PostOptions open={open} setOpen={setOpen} post={post} />
          </div>
        </div>
        {type === "NORMAL" ? (
          <div className="avoid w-full cursor-pointer rounded-md">
            <img
              className="avoid w-full h-full object-contain object-center rounded-md"
              src={post.media}
              alt=""
            />
          </div>
        ) : (
          <div className="avoid flex flex-col gap-4 w-full overflow-y-auto no-scrollbar  h-[64.5vh]">
            <div className="avoid  px-2">
              <div className="avoid flex items-center gap-2">
                <Link to={`/dashboard/profile/${post.user.username}`}>
                  <div className="avoid w-10 h-10 cursor-pointer rounded-[50%]">
                    <img
                      className="avoid w-full h-full rounded-[50%] object-cover"
                      src={post.user.photoURL}
                      alt=""
                    />
                  </div>
                </Link>
                <Link to={`/dashboard/profile/${post.user.username}`}>
                  <p className="avoid text-md font-semibold cursor-pointer">
                    {post.user.username}
                  </p>
                </Link>
                <p className="avoid text-md"> {post.caption}</p>
              </div>
            </div>
            <div className="avoid w-full p-2 cursor-pointer rounded-md flex flex-col gap-4">
              {post.comments &&
                post.comments.map((comment) => {
                  return (
                    <div key={comment._id} className="avoid flex gap-2">
                      <img
                        src={`${comment.user.photoURL}`}
                        alt=""
                        className="avoid h-10 w-10 rounded-full object-cover"
                      />
                      <div className="avoid flex gap-1 pt-2 text-sm">
                        <span className="avoid font-medium">
                          {comment.user.username}
                        </span>
                        <br />
                        <span className="avoid">{comment.content}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="avoid w-full py-2 px-2 flex justify-between">
          <div className="avoid flex gap-2 cursor-pointer">
            {post.likes && (
              <LuHeart
                className={`avoid w-[24px] h-[24px] transition-all ${
                  post.likes.includes(user._id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => {
                  if (isLiked.includes(post._id)) {
                    dispatch(
                      setIsLiked({ type: "already-liked", id: post._id })
                    );
                  } else {
                    dispatch(setIsLiked({ type: "not-liked", id: post._id }));
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
            <Comment className="avoid" />
            <Share className="avoid" />
          </div>
          <div className="avoid w-6 cursor-pointer">
            {user.saved && (
              <LuBookmark
                className={`avoid transition-all ${
                  user.saved.indexOf(post._id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => {
                  dispatch(
                    createPost({
                      type: "SAVED",
                      dispatch,
                      post,
                      allPosts,
                    })
                  );
                }}
              />
            )}
          </div>
        </div>
        {type === "NORMAL" ? (
          <LikeAndComment post={post} type={"normal"} />
        ) : (
          <LikeAndComment post={post} type={"expanded"} />
        )}
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Add this line
    caption: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    likes: PropTypes.array,
    user: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
    comments: PropTypes.array,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Post;
