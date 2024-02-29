import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import sidebarSlice from "./SidebarSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        sidebar: sidebarSlice,
    }
});