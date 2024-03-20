import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import sidebarSlice from "./SidebarSlice";
import postSlice from "./postSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        sidebar: sidebarSlice,
        post: postSlice,
    }
});