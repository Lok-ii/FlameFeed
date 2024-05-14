import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchResults: [],
  loading: false,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.searchResults = action.payload;
      });
  },
});

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async ({ type, searchInput, dispatch }) => {
    try {
      let searchResults;
      let searchedUsers = [];
      switch (type) {
        case "SEARCHING":
          searchResults = await axios.post(
            `${baseUrl}/user/search/${searchInput}`,
            {},
            {
              withCredentials: true,
            }
          );
          console.log(searchResults.data);
          searchedUsers = [...searchResults.data.results];
          break;
        default:
          throw new Error("INVALID TYPE");
      }
      dispatch(setLoading(false));
      return searchedUsers;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

export const { setSearchResults, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
