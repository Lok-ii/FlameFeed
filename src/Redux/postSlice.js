import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../Components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../Components/firebase";
import { setUser } from "./AuthSlice";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

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
  async ({
    type,
    file,
    storedUser,
    caption,
    dispatch,
    post,
    notify,
    currentLiked,
    allPosts,
    comment,
  }) => {
    try {
      let newUserData = {};
      let storageRef;
      let snapshot;
      let downloadURL;
      let likedPosts = [];
      let postLikes = [];
      let postData;
      let postId;
      let posts = [];
      // let postUserData = {};
      let commentData = {};
      switch (type) {
        case "POSTS":
          if (file) {
            try {
              storageRef = ref(
                storage,
                `${storedUser.uid}/${type}/${uuidv4()}`
              );
              snapshot = await uploadBytes(storageRef, file);
              downloadURL = await getDownloadURL(snapshot.ref);
              postId = nanoid(5);
              postData = {
                id: postId,
                expandedId: nanoid(8),
                media: downloadURL,
                caption: caption,
                userName: storedUser.username,
                photoURL: storedUser.photoURL,
                likes: [],
                comments: [],
                user: storedUser.uid,
                createdAt: new Date().toISOString(),
              };
              posts = [...allPosts, postData];
              posts.sort((a, b) => {
                return dayjs(b.createdAt) - dayjs(a.createdAt);
              });
              newUserData = {
                ...storedUser,
                posts: [postData, ...storedUser.posts],
              };
              if (Object.keys(newUserData).length !== 0) {
                setDoc(doc(db, "users", newUserData.uid), newUserData);
                setDoc(doc(db, "posts", postId), postData);
              }
              dispatch(setUser(newUserData));
              notify();
            } catch (error) {
              console.error(error);
            }
          }
          break;
        case "LIKES":
          if (currentLiked.includes(post.id)) {
            likedPosts = currentLiked.filter((id) => id !== post.id);
            postLikes = post.likes.filter((id) => id !== storedUser.uid);
          } else {
            likedPosts = [...currentLiked, post.id];
            postLikes = [...post.likes, storedUser.uid];
          }

          newUserData = {
            ...storedUser,
            likedPosts,
          };

          postData = {
            ...post,
            likes: [...postLikes],
          };
          dispatch(setExpandedPost(postData));

          posts = allPosts.map((p) => {
            if (p.id === post.id) {
              return postData;
            } else {
              return p;
            }
          });

          /**
           * 1. user liked data update
           * 2. post likes update
           * 3. change likes in the user posts data
           */
          if (Object.keys(newUserData).length != 0) {
            await setDoc(doc(db, "users", newUserData.uid), newUserData);
            await setDoc(doc(db, "posts", post.id), postData);
            // await setDoc(doc(db, "users", post.user), postUserData);
          }
          dispatch(setUser(newUserData));
          break;
        case "COMMENT":
          commentData = {
            id: nanoid(8),
            content: comment,
            username: storedUser.username,
            photoURL: storedUser.photoURL,
            user: storedUser.uid,
            createdAt: new Date().toISOString(),
            commentLikes: [],
          };
          postData = {
            ...post,
            comments: [commentData, ...post.comments],
          };
          dispatch(setExpandedPost(postData));

          posts = [...allPosts];
          posts = posts.map((p) => {
            if (p.id === post.id) {
              return postData;
            } else {
              return p;
            }
          });

          setDoc(doc(db, "posts", post.id), postData);
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
