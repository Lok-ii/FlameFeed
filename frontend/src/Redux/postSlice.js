import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify, setUser } from "./AuthSlice";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import axios from "axios";

const initialState = {
  status: "idle",
  createBox: false,
  expandedPost: {},
  media: " ",
  mediaAttached: false,
  anyError: "",
  isLiked: [],
  allPosts: [],
  userPosts: [],
  isLoading: false,
  isModalOpen: false,
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const postSlice = createSlice({
  initialState: initialState,
  name: "post",
  reducers: {
    setCreateBox: (state, action) => {
      state.createBox = action.payload;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setMediaAttached: (state, action) => {
      state.mediaAttached = action.payload;
    },
    setIsLiked: (state, action) => {
      if (action.payload.type === "not-liked") {
        state.isLiked.push(action.payload.id);
      } else if (action.payload.type === "already-liked") {
        state.isLiked = state.isLiked.filter((id) => id !== action.payload.id);
      } else {
        state.isLiked = action.payload;
      }
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setExpandedPost: (state, action) => {
      state.expandedPost = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.media = action.payload.media;
        state.mediaAttached = action.payload.mediaAttached;
        state.createBox = action.payload.createBox;
        state.allPosts = [...action.payload.posts];
        state.isLoading = action.payload.isLoading;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.anyError = action.payload;
      });
  },
});

export const createPost = createAsyncThunk(
  "post/postEdit",
  async ({ type, file, caption, dispatch, post, allPosts, comment }) => {
    try {
      let newUserData = {};
      let likePost;
      let postData;
      let posts = [];
      let deletePost;
      let savedPost;
      // let postUserData = {};
      let commentData = {};
      switch (type) {
        case "POSTS":
          if (file) {
            try {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("expandedId", nanoid(8));
              formData.append("caption", caption);
              formData.append("createdAt", new Date().toISOString());

              const data = await axios.post(`${baseUrl}/post`, formData, {
                withCredentials: true,
              });
              postData = data.data.post;
              posts = [...allPosts, postData];
              posts.sort((a, b) => {
                return dayjs(b.createdAt) - dayjs(a.createdAt);
              });
              newUserData = { ...data.data.user };
              dispatch(setUser(newUserData));
              dispatch(notify(data.data));
            } catch (error) {
              console.error(error);
            }
          }
          break;
        case "LIKES":
          likePost = await axios.post(
            `${baseUrl}/post/likes/${post._id}`,
            {},
            {
              withCredentials: true,
            }
          );
          newUserData = { ...likePost.data.user };
          postData = { ...likePost.data.post };
          dispatch(setExpandedPost(postData));

          posts = [...likePost.data.allPosts];

          posts.sort((a, b) => {
            return dayjs(b.createdAt) - dayjs(a.createdAt);
          });
          dispatch(setUser(newUserData));
          dispatch(
            notify({
              success: likePost.data.success,
              message: likePost.data.message,
            })
          );
          break;
        case "COMMENT":
          commentData = await axios.post(
            `${baseUrl}/post/comment/${post._id}`,
            {
              content: comment,
            },
            {
              withCredentials: true,
            }
          );
          postData = { ...commentData.data.post };
          dispatch(setExpandedPost(postData));
          posts = [...commentData.data.allPosts];
          posts.sort((a, b) => {
            return dayjs(b.createdAt) - dayjs(a.createdAt);
          });
          dispatch(
            notify({
              success: commentData.data.success,
              message: commentData.data.message,
            })
          );
          break;
        case "DELETE":
          deletePost = await axios.post(
            `${baseUrl}/post/delete/${post._id}`,
            {},
            { withCredentials: true }
          );
          posts = [...deletePost.data.posts];
          posts.sort((a, b) => {
            return dayjs(b.createdAt) - dayjs(a.createdAt);
          });
          dispatch(setUser(deletePost.data.user));

          dispatch(
            notify({
              success: deletePost.data.success,
              message: deletePost.data.message,
            })
          );
          break;
        case "SAVED":
          savedPost = await axios.post(
            `${baseUrl}/user/saved/${post._id}`,
            {},
            { withCredentials: true }
          );
          posts = [...savedPost.data.allPosts];
          posts.sort((a, b) => {
            return dayjs(b.createdAt) - dayjs(a.createdAt);
          });
          dispatch(setUser(savedPost.data.updatedUser));

          dispatch(
            notify({
              success: savedPost.data.success,
              message: savedPost.data.message,
            })
          );
          break;
        default:
          throw new Error("Invalid type");
      }
      return {
        media: " ",
        mediaAttached: false,
        createBox: false,
        posts: posts,
        isLoading: false,
      };
    } catch (error) {
      console.error(error.code, error.message);
      return error.message;
    }
  }
);

export const {
  setCreateBox,
  setMedia,
  setMediaAttached,
  setIsLiked,
  setAllPosts,
  setIsLoading,
  setExpandedPost,
  setIsModalOpen,
  setUserPosts,
} = postSlice.actions;

export default postSlice.reducer;
