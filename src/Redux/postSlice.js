import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../Components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../Components/firebase";
import { setUser } from "./AuthSlice";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const initialState = {
  status: "idle",
  createBox: false,
  media: " ",
  mediaAttached: false,
  anyError: "",
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
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.anyError = action.payload;
      });
  },
});

export const createPost = createAsyncThunk(
  "post/postEdit",
  async ({ type, file, storedUser, caption, dispatch, notify }) => {
    try {
      let newUserData = {};
      let storageRef;
      let snapshot;
      let downloadURL;
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
              console.log("File uploaded successfully:", downloadURL);
              newUserData = {
                ...storedUser,
                posts: [
                  {
                    id: nanoid(5),
                    media: downloadURL,
                    caption: caption,
                    userName: storedUser.username,
                    likes: [],
                    comments: [],
                    user: storedUser.uid,
                    createdAt: new Date().toISOString(),
                  },
                  ...storedUser.posts,
                ],
              };
              console.log(newUserData);
              if (Object.keys(newUserData).length !== 0) {
                setDoc(doc(db, "users", newUserData.uid), newUserData);
              }
              dispatch(setUser(newUserData));
              notify();
            } catch (error) {
              console.log(error);
            }
          }

          break;
        default:
          throw new Error("Invalid type");
      }
      return { media: " ", mediaAttached: false, createBox: false };
    } catch (error) {
      console.error(error.code, error.message);
      return error.message;
    }
  }
);

export const { setCreateBox, setMedia, setMediaAttached } = postSlice.actions;

export default postSlice.reducer;
