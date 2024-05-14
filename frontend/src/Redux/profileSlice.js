import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./AuthSlice";
import axios from "axios";

const initialState = {
  status: "idle",
  searchedUser: {},
  randomUser: [],
  selectedTab: "posts",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setSearchedUser: (state, action) => {
      state.searchedUser = action.payload;
    },
    setRandomUsers: (state, action) => {
      state.randomUser = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profileStats.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(profileStats.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const profileStats = createAsyncThunk(
  "profile/profileStats",
  async ({ type, searchedUser, dispatch }) => {
    try {
      let newUserData = {};
      let newSerachedUserData = {};
      let allUsers;
      let getFollowers;
      switch (type) {
        case "FOLLOW":
          getFollowers = await axios.patch(
            `${baseUrl}/user/updateFollower/${searchedUser._id}`,
            {},
            { withCredentials: true }
          );
          console.log(getFollowers);
          newUserData = { ...getFollowers.data.followerUser };
          newSerachedUserData = { ...getFollowers.data.followedUser };
          allUsers = await axios.get(`${baseUrl}/user/`);
          dispatch(setRandomUsers(allUsers.data.users));
          dispatch(setUser(newUserData));
          dispatch(setSearchedUser(newSerachedUserData));
          break;
        case "UNFOLLOW":
          break;
        default:
          throw new Error("Invalid Profile update type");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const { setSearchedUser, setRandomUsers, setSelectedTab } = profileSlice.actions;

export default profileSlice.reducer;
