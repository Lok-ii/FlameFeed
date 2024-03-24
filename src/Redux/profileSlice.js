import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./AuthSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Components/firebase";

const initialState = {
  status: "idle",
  searchedUser: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setSearchedUser: (state, action) => {
      state.searchedUser = action.payload;
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
  async ({type, loggedUser, searchedUser, dispatch}) => {
    try {
        let newUserData = {}
        let newSerachedUserData = {}
        let following = []
        let followers = []
        switch(type) {
            case "FOLLOW":
                if(loggedUser.following.includes(searchedUser.uid)){
                    following = loggedUser.following.filter(e=> e !== searchedUser.uid);
                    followers = searchedUser.followers.filter(e => e !== loggedUser.uid);
                }else{
                    following = [...loggedUser.following, searchedUser.uid];
                    followers = [...searchedUser.followers, loggedUser.uid]
                }
                newUserData = {
                    ...loggedUser,
                    following
                }
                newSerachedUserData = {
                    ...searchedUser,
                    followers
                }
                if (Object.keys(newUserData).length !== 0) {
                    setDoc(doc(db, "users", newUserData.uid), newUserData);
                    setDoc(doc(db, "users", searchedUser.uid), newSerachedUserData);
                  }
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

export const { setSearchedUser } = profileSlice.actions;

export default profileSlice.reducer;
