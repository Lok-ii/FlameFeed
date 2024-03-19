import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Components/firebase";
import screenshot1 from "../assets/images/screenshot1.png";
import screenshot2 from "../assets/images/screenshot2.png";
import screenshot3 from "../assets/images/screenshot3.png";
import screenshot4 from "../assets/images/screenshot4.png";

const initialState = {
  user: {},
  error: "",
  status: "idle",
  loadingState: false,
  authImages: [screenshot1, screenshot2, screenshot3, screenshot4],
  authPageImage: screenshot1,
  imageIndex : 0,
};

const auth = getAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoadingState: (state, action) => {
      state.loadingState = action.payload;
    },
    setAuthImage: (state, action) => {
        console.log(state.authPageImage);
      state.authPageImage = action.payload;
      console.log(state.authPageImage);
    },
    setImageIdx : (state, action) => {
        state.imageIndex=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthentication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userAuthentication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.user));
      })
      .addCase(userAuthentication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const userAuthentication = createAsyncThunk(
  "auth/authAsync",
  async ({ type, email, password, dispatch, username }) => {
    try {
      let user = {};
      dispatch(setError(""));
      dispatch(setLoadingState(true));
      let signInResponse;
      let signUpResponse;
      switch (type) {
        case "SIGNUP":
          try {
            dispatch(setError(""))
            signUpResponse = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            user = signUpResponse.user.providerData[0];
            console.log(user);
            if (Object.keys(user).length !== 0) {
              setDoc(doc(db, "users", user.email), { ...user, username });
            }
          } catch (error) {
            dispatch(setError(error.message.slice(10)));
          }
          break;
        case "LOGIN":
          signInResponse = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          user = signInResponse.user.providerData[0];
          break;
        case "SIGNOUT":
          signOut(auth);
          break;
        default:
          throw new Error("Invalid authentication type");
      }
      dispatch(setLoadingState(false));
      return user;
    } catch (error) {
      console.error(error.code, error.message);
      return error.message.slice(10);
    }
  }
);

export const { setUser, setError, setLoadingState, setAuthImage, setImageIdx } = authSlice.actions;

export default authSlice.reducer;
