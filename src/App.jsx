import { useState } from "react";
import "./App.css";
import AuthPage from "./Components/AuthPage";
import Context from "./Context/Context";
import SignUp from "./Components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import firebase from "./Components/firebase";
import Dashboard from "./Components/Dashboard/Dashboard";
import DashBoardMainContent from "./Components/Dashboard/DashBoardMainContent";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import { Provider } from 'react-redux'
import { store } from './Redux/store';
import Messages from "./Components/Dashboard/Messages";

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
          path: "profile",
          element: <Profile />,
        },
        {
          path : "editprofile",
          element: <EditProfile />
        },
        {
          path: "messages",
          element: <Messages />
        }
      ],
    }
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
