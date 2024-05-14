import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { setError} from "../../Redux/AuthSlice";

const Account = (props) => {
  const dispatch = useDispatch();
  return <div className="account w-[100%] flex items-center justify-center text-sm gap-2 border p-4 border-gray-300 ">
    <p className="dontHave">{props.content}</p> <Link onClick={() => dispatch(setError(""))} to={props.link}className="text-[#4CB5F9] font-semibold text-base">{props.name}</Link>
  </div>;
};

Account.propTypes = {
  content: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  // other prop types
};
export default Account;
