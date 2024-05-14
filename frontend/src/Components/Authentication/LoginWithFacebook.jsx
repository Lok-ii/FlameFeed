import { AiFillFacebook } from "react-icons/ai";

const LoginWithFacebook = () => {
  return (
    <div className="loginWithFacebook w-[100%] gap-2 flex items-center justify-center">
      <AiFillFacebook className="text-[#00376B]" />
      <p className="loginFb text-[#385185] text-sm font-semibold">
        Login with Facebook
      </p>
    </div>
  );
};

export default LoginWithFacebook;
