import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  toggled: false,
  broken: false,
  isSearchOpen: false,
  isMessageOpen: false,
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
    toggleMessageDrawer: (state, action) => {
      state.isSearchOpen = false;
      if (state.isSearchOpen) {
        state.collapsed = false;
      } else {
        state.collapsed = true;
      }
      state.isMessageOpen = !state.isMessageOpen;
    },
    toggleSearchDrawer: (state, action) => {
      state.isMessageOpen = false;
      if (state.isSearchOpen) {
        state.collapsed = false;
      } else {
        state.collapsed = true;
      }
      state.isSearchOpen = !state.isSearchOpen;
    },
    collapseAll: (state, action) => {
      state.isMessageOpen = false;
      state.isSearchOpen = false;
      state.collapsed = false;
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
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
