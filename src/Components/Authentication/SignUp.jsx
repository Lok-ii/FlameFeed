import InstaLogo from "../../assets/icons/InstaLogo";
import Or from "./Or";
// import LoginWithFacebook from "./LoginWithFacebook";
import { AiFillFacebook } from "react-icons/ai";
import Account from "./Account";
import Download from "./Download";
// import { useInsta } from "../../Context/Context";
import { ImCross } from "react-icons/im";
import { Alert } from "@material-tailwind/react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setUser, setError, setLoadingState, setAuthImage } from "../../Redux/AuthSlice";
import { userAuthentication } from "../../Redux/AuthSlice";
import { useRef } from "react";
import AuthFooter from "./AuthFooter";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loadingState } = useSelector((state) => state.auth);

  const signUpEmailRef = useRef();
  const passwordSignupRef = useRef();
  const usernameRef = useRef();
  const fullNameRef = useRef();

  return (
    <>
      <div className="w-[25%] flex flex-col items-center gap-4 py-8">
        <div className="signUp border border-gray-300 w-[100%] flex flex-col gap-4 items-center py-8">
          <InstaLogo />
          <p className="signupText text-sm text-[#737373] font-medium w-[70%] text-center ">
            Sign up to see photos and videos from your friends.
          </p>
          <div className="loginWithFacebook w-[70%] gap-2 flex items-center justify-center bg-[#4CB5F9] text-white py-2 rounded-lg cursor-pointer">
            <AiFillFacebook className="" />
            <p className="loginFb text-sm font-semibold">Login with Facebook</p>
          </div>
          <Or className="w-[70%]" />
          <form
            action=""
            className="flex flex-col items-center gap-2 w-[70%] text-xs"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                userAuthentication({
                  type: "SIGNUP",
                  email: signUpEmailRef.current.value,
                  password: passwordSignupRef.current.value,
                  dispatch: dispatch,
                  username: usernameRef.current.value,
                  fullName: fullNameRef.current.value,
                })
              );
              // writeUserData();
              if (error === "") navigate("/login");
            }}
          >
            {error && (
              <Alert
                icon={
                  <ImCross className="text-[#F44336] flex items-center justify-center" />
                }
                className="rounded-none border-l-4 border-[#F44336] bg-[#F44336]/10 font-medium text-[#000] flex items-center justify-center gap-4 "
              >
                {error}
              </Alert>
            )}

            <input
              className="p-2 rounded border w-[100%] border-gray-400"
              type="email"
              name="signEmail"
              id="signEmail"
              placeholder="Mobile number or Email"
              ref={signUpEmailRef}
            />
            <input
              className="p-2 rounded border w-[100%] border-gray-400"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              ref={fullNameRef}
            />
            <input
              className="p-2 rounded border w-[100%] border-gray-400"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              ref={usernameRef}
            />
            <input
              className="w-[100%] rounded p-2 border border-gray-400"
              type="password"
              name="signInPassword"
              id="signInPassword"
              placeholder="Password"
              ref={passwordSignupRef}
            />
            <div className="w-[100%] flex flex-col items-center justify-center gap-4">
              <p className="text-xs text-[#737373] w-[100%] text-center">
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </p>
              <p className="text-xs text-[#737373] w-[100%] text-center">
                By signing up, you agree to our{" "}
                <a href="" className="text-[#00376B]">
                  Terms , Privacy Policy
                </a>{" "}
                and <a>Cookies Policy</a> .
              </p>
            </div>
            <button className="signUpBtn bg-[#4CB5F9] text-white rounded-lg w-[100%] py-2 text-sm mt-4 font-semibold ">
              {loadingState ? (
                <UseAnimations animation={loading} size={14} />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
        <Account content="Have an account?" name="Log in" link="/login" />
        <Download />
      </div>
      <AuthFooter />
    </>
  );
}
