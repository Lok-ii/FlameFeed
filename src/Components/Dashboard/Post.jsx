// import ProfileIcon from "./ProfileIcon.jsx";
import PropTypes from 'prop-types';
import { BsThreeDots } from "react-icons/bs";
// import image from "../../assets/images/screenshot1.png"
import Notification from "../../assets/icons/Notifications.jsx";
import Comment from "../../assets/icons/Comment.jsx";
import Share from "../../assets/icons/Share.jsx";
import Saved from "../../assets/icons/Saved.jsx";
import { useSelector } from "react-redux";


const Post = ({post}) => {

  const { user } = useSelector(store => store.auth)
  return (
    <div className="border w-[90%] flex flex-col gap-2 py-2">
      <div className="w-full flex items-center  justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 cursor-pointer rounded-[50%]">
            <img className="w-full h-full rounded-[50%] object-cover" src={user.photoURL} alt="" />
          </div>
          <p className="text-xs font-semibold cursor-pointer">{user.username}</p>
          <p className="font-semibold text-xs text-textGray"> • 7w ago</p> 
        </div>
        <BsThreeDots />
      </div>
      <div className="w-full h-[80vh] cursor-pointer rounded-md">
        <img className="w-full h-full object-cover rounded-md" src={post.media} alt="" />
      </div>
      <div className="w-full py-2 px-2 flex justify-between">
        <div className="flex gap-2 cursor-pointer">
          <Notification />
          <Comment />
          <Share />
        </div>
        <div className="w-6 cursor-pointer">
          <Saved />
        </div>
      </div>
      <div className="flex flex-col px-2 gap-2 text-[0.8rem] font-semibold">
          {post.likes && <p className=" cursor-pointer">{post.likes.length} likes</p>}
          <div className="flex gap-2">
            <p className=" cursor-pointer">{user.username}</p> <p className=" cursor-pointer">{post.caption}</p>
          </div>
          <p className="text-textGray font-light cursor-pointer">View all comments</p>
          <div className="flex items-center">
            <input type="text" className="outline-none w-[90%] text-textGray font-light border-b-2 border-b-white bg-transparent cursor-pointer" placeholder="Add a comment..." /> 
            <button className="w-[10%] text-bluePrimary cursor-pointer" >Post</button>
          </div>
      </div>
    </div>
  );
};


Post.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    likes: PropTypes.array,
    // Include other properties of post as needed
  }).isRequired,
};

export default Post;
