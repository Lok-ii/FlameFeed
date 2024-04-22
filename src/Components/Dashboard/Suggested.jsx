import PropTypes from 'prop-types';

const Suggested = ({ user }) => {
  return (
    <div className="currentUser w-full flex items-center justify-between">
      <div className="userProfile flex items-center gap-4">
        <img src={user.photoURL} className="w-[2rem] h-[2rem] rounded-[50%]" alt="" />
        <div className="userName flex flex-col">
          <h2 className="font-semibold text-sm">{user.username}</h2>
          <p className="text-xs">Suggested for you</p>
        </div>
      </div>
      <p className="font-semibold text-blue-400 text-xs cursor-pointer">
        Follow
      </p>
    </div>
  );
};

Suggested.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Suggested;
