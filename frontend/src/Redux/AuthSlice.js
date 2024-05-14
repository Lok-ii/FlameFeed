import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profile from "../assets/images/profile.avif";
import screenshot1 from "../assets/images/screenshot1.png";
import screenshot2 from "../assets/images/screenshot2.png";
import screenshot3 from "../assets/images/screenshot3.png";
import screenshot4 from "../assets/images/screenshot4.png";
import axios from "axios";
import { toast } from "react-toastify";
import { setAllPosts } from "./postSlice";
import dayjs from "dayjs";

const initialState = {
  user: {},
  photoURL: "/src/assets/images/profile.avif",
  error: "",
  status: "idle",
  loadingState: false,
  authImages: [screenshot1, screenshot2, screenshot3, screenshot4],
  authPageImage: screenshot1,
  imageIndex: 0,
  emailError: "",
  nameError: "",
  usernameError: "",
  passwordError: "",
  signupDisabled: true,
  // file: "",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoadingState: (state, action) => {
      state.loadingState = action.payload;
    },
    setAuthImage: (state, action) => {
      state.authPageImage = action.payload;
    },
    setImageIdx: (state, action) => {
      state.imageIndex = action.payload;
    },
    handlePhoto: (state, action) => {
      state.photoURL = action.payload;
    },
    notify: (state, action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthentication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userAuthentication.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (typeof action.payload !== "string") {
          state.user = action.payload;
          localStorage.setItem("currentUser", JSON.stringify(state.user));
        }
      })
      .addCase(userAuthentication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyUserDeatils.fulfilled, (state, action) => {
        if (action.payload.type === "email") {
          state.emailError = action.payload.error;
        } else if (action.payload.type === "username") {
          state.usernameError = action.payload.error;
        } else if (action.payload.type === "password") {
          state.passwordError = action.payload.error;
        } else if (action.payload.type === "displayName") {
          state.nameError = action.payload.error;
        }
      })
      .addCase(verifyUserDeatils.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const userAuthentication = createAsyncThunk(
  "auth/authAsync",
  async ({
    type,
    email,
    password,
    dispatch,
    username,
    fullName,
    bio,
    gender,
    file,
    storedUser,
  }) => {
    try {
      dispatch(setError(""));
      dispatch(setLoadingState(true));
      let signUpResponse;
      let signInResponse;
      let signout;
      let newUserData = {};
      let profileData;
      let formData;
      let posts = [];
      switch (type) {
        case "SIGNUP":
          try {
            dispatch(setError(""));
            signUpResponse = await axios.post(`${baseUrl}/user/signup`, {
              username: username.toLowerCase(),
              password,
              email: email.toLowerCase(),
              photoURL: "https://flamefeed.onrender.com/uploads/profile.avif",
              displayName: fullName,
            });
            dispatch(
              notify({
                success: signUpResponse.data.success,
                message: signUpResponse.data.message,
              })
            );
            dispatch(setError(""));
          } catch (error) {
            if (error.message !== "Username already exists") {
              dispatch(setError(error.message.slice(10)));
              return;
            }
            dispatch(setError("Username already exists"));
          }
          break;
        case "LOGIN":
          signInResponse = await axios.post(
            `${baseUrl}/user/login`,
            {
              email: email.toLowerCase(),
              password,
            },
            {
              withCredentials: true,
            }
          );
          console.log(signInResponse);
          newUserData = signInResponse.data.user;
          dispatch(
            notify({
              success: signInResponse.data.success,
              message: signInResponse.data.message,
            })
          );
          break;
        case "SIGNOUT":
          signout = await axios.post(
            `${baseUrl}/user/signout`,
            {},
            { withCredentials: true }
          );
          newUserData = null;
          dispatch(notify(signout.data));
          break;
        case "PROFILE":
          console.log("Clicked");
          formData = new FormData();
          if (file) {
            formData.append("photoURL", file);
          } else {
            formData.append("profile", storedUser.photoURL);
          }
          try {
            formData.append("username", username);
            formData.append("displayName", fullName);
            formData.append("bio", bio);
            formData.append("gender", gender);
            profileData = await axios.patch(
              `${baseUrl}/user/update`,
              formData,
              { withCredentials: true }
            );
            newUserData = { ...profileData.data.user };
            console.log(profileData);
            posts = profileData.data.allPosts;
            posts.sort((a, b) => {
              return dayjs(b.createdAt) - dayjs(a.createdAt);
            });
            dispatch(setAllPosts(posts));
            dispatch(notify(profileData.data));
          } catch (error) {
            console.error(error);
          }
          break;
        default:
          throw new Error("Invalid authentication type");
      }
      dispatch(setLoadingState(false));
      return newUserData;
    } catch (error) {
      console.error(error.code, error.message);
      dispatch(setLoadingState(false));
      dispatch(setError(error.message.slice(10)));
      return error.message.slice(10);
    }
  }
);

export const verifyUserDeatils = createAsyncThunk(
  "auth/verifyUserDeatils",
  async ({ type, dispatch, username, displayName, email, password }) => {
    try {
      let error = "";
      let isUserExist = "";
      let checkType;
      switch (type) {
        case "email":
          checkType = await axios.post(`${baseUrl}/user/check/${type}`, {
            type: email,
          });
          isUserExist = checkType.data.success;
          if (isUserExist) {
            error = "Email already exists";
          } else {
            error = "";
          }

          break;
        case "username":
          checkType = await axios.post(`${baseUrl}/user/check/${type}`, {
            type: username,
          });
          isUserExist = checkType.data.success;
          if (isUserExist) {
            error = "Username already exists";
          } else {
            error = "";
          }
          break;
        case "displayName":
          if (displayName.length < 3) {
            error = "Name should be atleast 3 characters long";
          } else {
            error = "";
          }
          break;
        case "password":
          if (
            password.length > 6 &&
            password.charAt(0) >= "A" &&
            password.charAt(0) <= "Z" &&
            password.match(/[.@#%&]/).length > 0
          ) {
            error = "";
          } else {
            error =
              "Password should be atleast 6 characters long, first character must be captial and should contain atleast one special character(.@#%&)";
          }
          break;
        default:
          throw new Error("Invalid authentication type");
      }
      return { type, error };
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message.slice(10)));
      return error.message.slice(10);
    }
  }
);

export const {
  setUser,
  setError,
  setLoadingState,
  setAuthImage,
  setImageIdx,
  handlePhoto,
  setMedia,
  setMediaAttached,
  notify,
} = authSlice.actions;

export default authSlice.reducer;
