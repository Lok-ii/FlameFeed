import { Link } from "react-router-dom";
import InstaLogo from "./assets/icons/InstaLogo";

const PageNotFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <InstaLogo />
      <h1 className="text-3xl font-bold mb-2">
        Sorry, this page isn&apos;t available.
      </h1>
      <p className="text-lg mb-4">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link to="/dashboard" className="text-blue-500">
        Go back to FlameFeed
      </Link>
    </div>
  );
};

export default PageNotFound;
