import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  toggled: false,
  broken: false,
  isSearchOpen: false,
  isMessageOpen: false,
  toggleSettings: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    setIsSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    setMessageOpen: (state, action) => {
      state.isMessageOpen = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    toggleMessageDrawer: (state) => {
      state.isSearchOpen = false;
      if (state.isSearchOpen) {
        state.collapsed = false;
      } else {
        state.collapsed = true;
      }
      state.isMessageOpen = !state.isMessageOpen;
    },
    toggleSearchDrawer: (state) => {
      state.isMessageOpen = false;
      if (state.isSearchOpen) {
        state.collapsed = false;
      } else {
        state.collapsed = true;
      }
      state.isSearchOpen = !state.isSearchOpen;
    },
    collapseAll: (state) => {
      state.isMessageOpen = false;
      state.isSearchOpen = false;
      state.collapsed = false;
    },
    setToggleSetting: (state, action) => {
      if (action.payload === "") {
        state.toggleSettings = !state.toggleSettings;
      }else{
        state.toggleSettings = action.payload;
      }
    },
  },
});

export const {
  setIsSearchOpen,
  setMessageOpen,
  setCollapsed,
  toggleMessageDrawer,
  toggleSearchDrawer,
  collapseAll,
  setToggleSetting,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
