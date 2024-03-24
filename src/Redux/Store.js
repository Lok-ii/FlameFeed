import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import sidebarSlice from "./SidebarSlice";
import postSlice from "./postSlice";
import searchSlice from "./searchSlice";
import profileSlice from "./profileSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        sidebar: sidebarSlice,
        post: postSlice,
        search: searchSlice,
        profile: profileSlice,
    }
});