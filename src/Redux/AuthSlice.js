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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Components/firebase";
import screenshot1 from "../assets/images/screenshot1.png";
import screenshot2 from "../assets/images/screenshot2.png";
import screenshot3 from "../assets/images/screenshot3.png";
import screenshot4 from "../assets/images/screenshot4.png";

const initialState = {
  user: {},
  photoURL: "/src/assets/images/profile.avif",
  error: "",
  status: "idle",
  loadingState: false,
  authImages: [screenshot1, screenshot2, screenshot3, screenshot4],
  authPageImage: screenshot1,
  imageIndex: 0,
  // file: "",
};

const auth = getAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
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
    storedUser
  }) => {
    try {
      let user = {};
      dispatch(setError(""));
      dispatch(setLoadingState(true));
      let signUpResponse;
      let signInResponse;
      let docRef;
      let docSnap;
      let newUserData = {};
      let storageRef;
      let snapshot;
      let downloadURL;
      switch (type) {
        case "SIGNUP":
          try {
            dispatch(setError(""));
            signUpResponse = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            user = signUpResponse.user.providerData[0];
            newUserData = {
              ...user,
              uid: nanoid(),
              displayName: fullName,
              username,
              followers: [],
              following: [],
              posts: [],
              photoURL: profile,
              bio: "",
              gender: "Prefer not to say",
            };
            if (Object.keys(user).length !== 0) {
              setDoc(doc(db, "users", newUserData.uid), newUserData);
            }
            dispatch(setError(""));
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
          console.log(user);
          docRef = doc(db, "users", user.uid);
          docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            newUserData = docSnap.data();
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
          // console.log(await doc(db, "users", user.email));
          // user = getDoc(doc(db, "users", user.email));
          // user = signInResponse.user.providerData[0];
          break;
        case "SIGNOUT":
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
              console.log("File uploaded successfully:", downloadURL);
              photoURL = downloadURL;
            } catch (error) {
              console.log(error);
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
