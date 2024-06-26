import { useEffect, useRef } from "react";
import InstaLogo from "../../assets/icons/InstaLogo";
import Or from "./Or";
import LoginWithFacebook from "./LoginWithFacebook";
import Account from "./Account";
import Download from "./Download";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { ImCross } from "react-icons/im";
import { Alert } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setUser, setError, setLoadingState } from "../../Redux/AuthSlice";
import { userAuthentication } from "../../Redux/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loadingState, user } = useSelector((state) => state.auth);

  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  useEffect(() => {
    if (
      user !== null &&
      user !== undefined &&
      Object.keys(user).length !== 0 &&
      location.pathname === "/" &&
      error === ""
    ) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [error, location.pathname, navigate, user]);

  return (
    <div
      className={`logInPage ${
        location.pathname === "/login"
          ? "w-[80%] md:w-[50%] lg:w-[40%] xl:w-[25%] "
          : "w-[80%] sm:w-[60%] md:w-[70%] lg:w-[60%] xl:w-[41%]"
      } flex flex-col gap-4 py-4`}
    >
      <div className="login border border-gray-300 w-[100%] flex flex-col gap-4 items-center py-8">
        {/* <InstaLogo /> */}
        <p
          className="text-[2rem] font-semibold"
          style={{ fontFamily: "Billabong W00 Regular" }}
        >
          FlameFeed
        </p>
        <form
          action=""
          className="flex flex-col items-center gap-2 w-[90%] text-xs"
          onSubmit={(e) => {
            e.preventDefault();
            // let checkUser = logIn(loginEmailRef.current.value, loginPasswordRef.current.value);
            dispatch(
              userAuthentication({
                type: "LOGIN",
                email: loginEmailRef.current.value,
                password: loginPasswordRef.current.value,
                dispatch,
              })
            );
          }}
        >
          {error && (
            <Alert
              icon={<ImCross className="text-[#F44336] text-xs ml-2" />}
              className="rounded-none border-l-4 border-[#F44336] bg-[#F44336]/10 font-medium text-white flex items-center justify-center gap-4 "
            >
              {error}
            </Alert>
          )}
          <input
            className="p-2 rounded border w-[100%] border-gray-400"
            type="email"
            name="loginEmail"
            id="loginEmail"
            placeholder="Phone number, username or email address"
            ref={loginEmailRef}
          />
          <input
            className="w-[100%] rounded p-2 border border-gray-400"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={loginPasswordRef}
          />
          <button
            type="submit"
            className="loginBtn bg-[#4CB5F9] text-white rounded-lg w-[100%] py-2 text-sm mt-4 font-semibold flex items-center justify-center h-8"
          >
            {loadingState ? (
              <UseAnimations animation={loading} size={14} />
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <Or />
        <LoginWithFacebook />
        <a href="" className="text-xs text-[#385185]">
          Forgotten your passowrd?
        </a>
      </div>
      <Account
        content="Don&#39;t have an account?"
        name="Sign up"
        link="/signup"
      />
      <Download />
    </div>
  );
};

export default Login;
