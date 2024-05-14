import "./App.css";
import AuthPage from "./Components/Authentication/AuthPage";
import SignUp from "./Components/Authentication/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import DashBoardMainContent from "./Components/Dashboard/DashBoardMainContent";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Messages from "./Components/Messages/Messages";
import PageNotFound from "./PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard",
          element: <DashBoardMainContent />,
        },
        {
          path: "profile/:username",
          element: <Profile />,
        },
        {
          path: "editprofile",
          element: <EditProfile />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
