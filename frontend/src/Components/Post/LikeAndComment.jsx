import { useRef, useState } from "react";
import {
  createPost,
  setExpandedPost,
  setIsLoading,
  setIsModalOpen,
} from "../../Redux/postSlice";
import UseAnimations from "react-useanimations";
import { useDispatch, useSelector } from "react-redux";
import loading from "react-useanimations/lib/loading";
import PropTypes from "prop-types";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSunglasses } from "react-icons/bs";

const LikeAndComment = ({ post, type }) => {
  const commentRef = useRef("");
  const dispatch = useDispatch();
  const [emoji, setEmoji] = useState(false);
  const { isLoading, allPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="avoid flex flex-col px-2 gap-2 text-[0.8rem]">
      {post.likes && (
        <p className="avoid  cursor-pointer">{post.likes.length} likes</p>
      )}
      {type === "normal" && (
        <>
          <div className="avoid flex gap-2">
            <p className="avoid  cursor-pointer font-semibold">
              {post.user.username}
            </p>{" "}
            <p className="avoid  cursor-pointer">{post.caption}</p>
          </div>
          <div className="avoid flex flex-col gap-2">
            {post.comments &&
              post.comments.map(
                (comment, idx) =>
                  idx <= 1 && (
                    <div
                      key={comment._id}
                      className="avoid flex items-center gap-2"
                    >
                      <div className="avoid text-sm flex gap-2">
                        <span className=" font-semibold">
                          {comment.user.username}
                        </span>
                        <span>{comment.content.substr(0, 50)}...</span>
                      </div>
                    </div>
                  )
              )}
          </div>
          <p
            className="avoid text-textGray font-light cursor-pointer"
            onClick={() => {
              dispatch(setIsModalOpen(true));
              dispatch(setExpandedPost(post));
            }}
          >
            View all comments
          </p>
        </>
      )}
      <form
        className="avoid flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (commentRef.current.value !== "") {
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
            commentRef.current.value = "";
          }
        }}
      >
        <input
          type="text"
          className="avoid outline-none w-[90%] text-textGray font-light border-b-2 border-b-white bg-transparent cursor-pointer"
          placeholder="Add a comment..."
          ref={commentRef}
          required
        />
        <div className="relative flex items-center gap-2">
          <EmojiPicker
            open={emoji}
            theme="dark"
            style={{ position: "absolute", bottom: "1.5rem", right: "0" }}
            onEmojiClick={(emo) => {
              const cursorPosition = commentRef.current.selectionStart;
              commentRef.current.value =
                commentRef.current.value.slice(0, cursorPosition) +
                emo.emoji +
                commentRef.current.value.slice(cursorPosition);
              setEmoji(false);
            }}
          />
          <BsEmojiSunglasses
            className="cursor-pointer"
            onClick={() => setEmoji((prev) => !prev)}
          />
          <button className="avoid w-[10%] text-bluePrimary cursor-pointer">
            {isLoading ? (
              <UseAnimations animation={loading} size={14} />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

LikeAndComment.propTypes = {
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default LikeAndComment;
