import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Components/firebase";

const initialState = {
  searchResults: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = [...action.payload];
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.searchResults = [...action.payload];
      });
  },
});

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async ({type, searchInput}) => {
    try {
        let allUsers = [];
        let searchedUsers = [];
        switch(type){
            case "SEARCHING":
                allUsers = await getDocs(collection(db, "users"));
                allUsers.forEach(user => {
                    if(user.data().displayName.toLowerCase().includes(searchInput.toLowerCase()) || user.data().username.toLowerCase().includes(searchInput.toLowerCase)){
                        searchedUsers.push(user.data());
                    }
                });

                break;
            default:
                throw new Error("INVALID TYPE");
        }
        return searchedUsers;
    } catch (error) {
        console.error(error);
        return [];
    }
  }
);

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
