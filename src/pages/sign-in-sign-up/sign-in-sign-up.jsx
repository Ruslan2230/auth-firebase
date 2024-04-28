import "./sign-in-sign-up.styles.css";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../context/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  OAuthProvider,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import AuthDetails from "../../components/AuthDetails/AuthDetails";
import { useNavigate } from "react-router-dom";

const SignInSignUpPage = () => {
  const [usernameSignIn, setUsernameSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const microsoftProvider = new OAuthProvider("microsoft.com");
  const googleProvider = new GoogleAuthProvider();

  const { user } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { displayName, email, photoURL } = result;

        setUserData({ displayName, email, photoURL });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      user?.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("response Google", result);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));

      const { displayName, email, photoURL } = result.user;
      setUserData({ displayName, email, photoURL });
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      console.log("response MicrosoftUser", result);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));

      const { displayName, email, photoURL } = result.user;
      setUserData({ displayName, email, photoURL });
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const SignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        `${usernameSignIn}@example.com`,
        passwordSignIn
      )
        .then((userCredential) => {
          console.log("User signed in:", userCredential);
        })
        .catch((error) => {
          setError(error.message);
        });

      setUsernameSignIn("");
      setPasswordSignIn("");
      setUsernameSignUp("");
      setPasswordSignUp("");

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${usernameSignUp}@example.com`,
        passwordSignUp
      );
      const user = userCredential.user;
      console.log("User registered:", user);

      // Update user display name
      await updateProfile(auth.currentUser, {
        displayName: usernameSignUp,
      });
      setUserData({
        displayName: usernameSignUp,
        email: `${usernameSignUp}@example.com`,
      });
      setUsernameSignUp("");
      setPasswordSignUp("");
      setUsernameSignIn("");
      setPasswordSignIn("");
      setError(null);
      setIsLoggedIn(true);
      console.log("User registered");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error.message);
    }
  };

  const signOutFromApp = async () => {
    try {
      await signOut(auth);
      setUserData({});
      setIsLoggedIn(false);
      setError(false);
      navigate("/#/sign-in-sign-up");
      console.log("sign out successful");
    } catch (error) {
      console.log("signOut error", { error });
    }
  };

  return (
    <div className='sign-in-sign-up'>
      <form onSubmit={handleRegister}>
        <h1>Sign Up to your Account</h1>
        <input
          type='text'
          placeholder='Username'
          value={usernameSignUp}
          onChange={(e) => setUsernameSignUp(e.target.value)}
        ></input>
        <input
          type='password'
          placeholder='Password'
          value={passwordSignUp}
          onChange={(e) => setPasswordSignUp(e.target.value)}
        ></input>
        <button type='submit'>Register</button>
        {!user && error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message if present */}
      </form>
      <form onSubmit={SignIn}>
        <h1>Sign In to your Account</h1>
        <input
          type='text'
          placeholder='Username'
          value={usernameSignIn}
          onChange={(e) => setUsernameSignIn(e.target.value)}
        ></input>
        <input
          type='password'
          placeholder='Password'
          value={passwordSignIn}
          onChange={(e) => setPasswordSignIn(e.target.value)}
        ></input>
        <button type='submit'>Sign in</button>
        {!user && error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message if present */}
      </form>
      <p></p>
      {user ? (
        <button onClick={signOutFromApp}>Log out Google</button>
      ) : (
        <button className='login-with-google-btn' onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}{" "}
      {user ? (
        <button onClick={signOutFromApp}>Log out Microsoft</button>
      ) : (
        <button className='btn' onClick={signInWithMicrosoft}>
          Sign in with Microsoft
        </button>
      )}
      <AuthDetails />
      {isLoggedIn && (
        <div className='wrapper'>
          <div className='profile-card js-profile-card'>
            <div className='profile-card__img'>
              <img src={userData.photoURL} alt='profile card' />
            </div>

            <div className='profile-card__cnt js-profile-cnt'>
              <div className='profile-card__name'>{userData.displayName}</div>
              <div className='profile-card__txt'>{userData.email}</div>
              <div className='profile-card-loc'></div>
              <div className='profile-card-ctr'>
                <button
                  className='profile-card__button button--orange'
                  onClick={signOutFromApp}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInSignUpPage;
