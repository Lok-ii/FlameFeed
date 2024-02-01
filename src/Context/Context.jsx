import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";
import screenshot1 from "../assets/images/screenshot1.png";
import screenshot2 from "../assets/images/screenshot2.png";
import screenshot3 from "../assets/images/screenshot3.png";
import screenshot4 from "../assets/images/screenshot4.png";
import { getDatabase, ref, set } from "firebase/database";
// import { useNavigate } from "react-router-dom";

export const InstaContext = createContext({});

export const useInsta = () => {
  return useContext(InstaContext);
};

const Context = (props) => {
  const authImages = [screenshot1, screenshot2, screenshot3, screenshot4];
  const [authPageImage, setAuthPageImage] = useState(screenshot1);
  const signUpEmailRef = useRef();
  const passwordSignupRef = useRef();
  const usernameRef = useRef();
  const fullNameRef = useRef();
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loadingState, setloadingState] = useState(false);
  const [user, setUser] = useState({});
  const auth = getAuth();
  const provider = new FacebookAuthProvider();

  // const navigate = useNavigate();

  // useEffect for changing images on the auth page
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setAuthPageImage((prev) => {
        let idx = (authImages.indexOf(prev) + 1) % authImages.length;
        return authImages[idx];
      });
    }, 2000);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  // Signup function for signing up new users
  const signUp = async () => {
    try {
      setError("");
      setloadingState(true);
      let user = await createUserWithEmailAndPassword(
        auth,
        signUpEmailRef.current.value,
        passwordSignupRef.current.value
      ); // Route to dashboard.
      console.log(user);
      setUser(user);
      // navigate("/dashboard");
    } catch (err) {
      setError(err.message.slice(10));
    }

    setloadingState(false);
  };

  // login using registerd credentials

  const logIn = async () => {
    try {
      setError("");
      setloadingState(true);
      let user = await signInWithEmailAndPassword(
        auth,
        loginEmailRef.current.value,
        loginPasswordRef.current.value
      );
      // Signed in
      setUser(user);
    } catch (error) {
      setError(error.message.slice(10));
    }
    setloadingState(false);
    return true;
  };

  // Sign user out
  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser({});
        console.log(user);
      })
      .catch((error) => {
        // An error happened.
        setError(error.message.slice(10));
      });
  };

  // Signin with facebook popup
  const handleFacebookSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  // set user data in database
  function writeUserData() {
    const db = getDatabase();
    set(ref(db, "users/" + usernameRef.current.value), {
      username: usernameRef.current.value,
      email: signUpEmailRef.current.value,
      fullName: fullNameRef.current.value,
    });
  }

  const valueObject = {
    authPageImage,
    setAuthPageImage,
    signUpEmailRef,
    passwordSignupRef,
    usernameRef,
    fullNameRef,
    loginEmailRef,
    loginPasswordRef,
    error,
    loadingState,
    setError,
    setloadingState,
    signUp,
    logIn,
    writeUserData,
    user,
    signOutFunc,
    handleFacebookSignUp
  };

  return (
    <InstaContext.Provider value={valueObject}>
      {props.children}
    </InstaContext.Provider>
  );
};

export default Context;
