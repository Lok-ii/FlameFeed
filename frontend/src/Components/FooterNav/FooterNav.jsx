import { Link, useNavigate } from "react-router-dom";
import Home from "../../assets/icons/Home";
import Search from "../../assets/icons/Search";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { PiSignOutBold } from "react-icons/pi";
import { userAuthentication } from "../../Redux/AuthSlice";

const FooterNav = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[4rem] bg-black fixed bottom-0 left-0 flex md:hidden justify-around items-center">
      <Link to={"/dashboard"}>
        <Home />
      </Link>
      <Link to={"/dashboard"}>
        <Search />
      </Link>
      <Link to={`/dashboard/profile/${user.username}`}>
        <CgProfile size={25} className=" hover:scale-[1.1] cursor-pointer" />
      </Link>
      <PiSignOutBold
        size={25}
        onClick={async () => {
          await dispatch(
            userAuthentication({
              type: "SIGNOUT",
              dispatch,
            })
          );
          navigate("/");
        }}
      />
    </div>
  );
};

export default FooterNav;
