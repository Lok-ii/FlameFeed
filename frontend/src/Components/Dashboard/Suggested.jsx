import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { profileStats } from "../../Redux/profileSlice";

const Suggested = ({ suggested }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="currentUser w-full flex items-center justify-between">
      <div className="userProfile flex items-center gap-4">
        <Link to={`/dashboard/profile/${suggested.username}`}>
          <img
            src={suggested.photoURL}
            className="w-[2rem] h-[2rem] rounded-[50%]"
            alt=""
          />
        </Link>
        <div className="userName flex flex-col">
          <Link to={`/dashboard/profile/${suggested.username}`}>
            <h2 className="font-semibold text-sm">{suggested.username}</h2>
          </Link>
          <p className="text-xs">Suggested for you</p>
        </div>
      </div>
      <p
        className="font-semibold text-blue-400 text-xs cursor-pointer"
        onClick={() => {
          dispatch(
            profileStats({
              type: "FOLLOW",
              searchedUser: suggested,
              dispatch,
            })
          );
        }}
      >
        {suggested.followers && !suggested.followers.includes(user._id)
          ? "Follow"
          : "Unfollow"}
      </p>
    </div>
  );
};

Suggested.propTypes = {
  suggested: PropTypes.object.isRequired,
};

export default Suggested;
