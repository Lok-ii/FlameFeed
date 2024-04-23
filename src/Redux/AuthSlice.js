import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { storage } from "../Components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import profile from "../assets/images/profile.avif";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../Components/firebase";
import screenshot1 from "../assets/images/screenshot1.png";
import screenshot2 from "../assets/images/screenshot2.png";
import screenshot3 from "../assets/images/screenshot3.png";
import screenshot4 from "../assets/images/screenshot4.png";
import { setAllPosts } from "./postSlice";

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

const auth = getAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      if (typeof action.payload !== String) {
        state.user = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.user));
      }
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
    photoURL,
    file,
    storedUser,
    allPosts,
  }) => {
    try {
      let user = {};
      dispatch(setError(""));
      dispatch(setLoadingState(true));
      let signUpResponse;
      let isUserExist = [];
      let signInResponse;
      let docRef;
      let docSnap;
      let newUserData = {};
      let storageRef;
      let snapshot;
      let downloadURL;
      let posts = [];
      let comments = [];
      let commentLikes = [];
      switch (type) {
        case "SIGNUP":
          try {
            dispatch(setError(""));
            const usersRef = await collection(db, "users");
            const q = await query(
              usersRef,
              where("username", "==", `${username}`)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              isUserExist.push(doc.data());
            });
            if (isUserExist.length !== 0) {
              dispatch(setError("Username already exists"));
              throw new Error("Username already exists");
            } else {
              signUpResponse = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              user = signUpResponse.user.providerData[0];
              newUserData = {
                ...user,
                id: nanoid(),
                displayName: fullName,
                username: username.toLowerCase(),
                followers: [],
                following: [],
                posts: [],
                likedPosts: [],
                saved: [],
                photoURL: profile,
                bio: "",
                gender: "Prefer not to say",
              };
              if (Object.keys(user).length !== 0) {
                await setDoc(doc(db, "users", newUserData.uid), newUserData);
              }
              newUserData = {};
              dispatch(setError(""));
            }
          } catch (error) {
            if (error.message !== "Username already exists") {
              dispatch(setError(error.message.slice(10)));
            }
            dispatch(setError("Username already exists"));
          }
          break;
        case "LOGIN":
          signInResponse = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          user = signInResponse.user.providerData[0];
          docRef = await doc(db, "users", user.uid);
          docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            newUserData = docSnap.data();
          } else {
            // docSnap.data() will be undefined in this case
            console.error("No such document!");
          }
          break;
        case "SIGNOUT":
          newUserData = null;
          signOut(auth);
          break;
        case "PROFILE":
          if (file) {
            try {
              storageRef = ref(
                storage,
                `${storedUser.uid}/${type}/${uuidv4()}`
              );
              snapshot = await uploadBytes(storageRef, file);
              downloadURL = await getDownloadURL(snapshot.ref);
              photoURL = downloadURL;
            } catch (error) {
              console.error(error);
            }
          } else {
            photoURL = storedUser.photoURL;
          }
          newUserData = {
            ...storedUser,
            photoURL: photoURL,
            displayName: fullName,
            username: username,
            bio: bio,
            gender: gender,
          };

          posts = allPosts.map((post) => {
            if (post.userName === storedUser.username) {
              comments = post.comments.map((comment) => {
                commentLikes = comment.commentLikes.map((like) => {
                  if (like === storedUser.username) {
                    return username;
                  }
                  return like;
                });
                if (comment.username === storedUser.username) {
                  return {
                    ...comment,
                    photoURL: photoURL,
                    username: username,
                    commentLikes,
                  };
                } else {
                  return comment;
                }
              });
              return {
                ...post,
                photoURL: photoURL,
                userName: username,
                comments,
              };
            } else {
              return {
                ...post,
                comments,
              };
            }
          });
          dispatch(setAllPosts(posts));
          posts.forEach((post) => {
            setDoc(doc(db, "posts", post.id), post);
          });

          if (Object.keys(newUserData).length !== 0) {
            setDoc(doc(db, "users", newUserData.uid), newUserData);
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
      let usersRef;
      let q;
      let querySnapshot;
      let isUserExist = "";
      switch (type) {
        case "email":
          usersRef = await collection(db, "users");
          q = await query(
            usersRef,
            where("email", "==", `${email.toLowerCase()}`)
          );

          querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            isUserExist = doc.data();
          });
          if (isUserExist !== "") {
            error = "Email already exists";
          } else {
            error = "";
          }
          break;
        case "username":
          usersRef = await collection(db, "users");
          q = await query(
            usersRef,
            where("username", "==", `${username.toLowerCase()}`)
          );

          querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            isUserExist = doc.data();
          });
          if (isUserExist !== "") {
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
} = authSlice.actions;

export default authSlice.reducer;
