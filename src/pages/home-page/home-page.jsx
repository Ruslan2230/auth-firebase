import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOutFromApp = () =>
    signOut(auth)
      .then(() => {
        navigate("/sign-in-sign-up");
      })
      .catch((error) => {
        console.log({ error });
      });

  return (
    <div className='nav-bar'>
      <h1>This is the home page</h1>
      <ul>
        {user ? (
          <div>
            <button onClick={signOutFromApp}>Log out</button>
            <Link to={"/orders"}>
              <li>Orders</li>
            </Link>
            <Profile />
          </div>
        ) : (
          <div>
            <Link to={"/sign-in-sign-up"}>
              <li>Sign-in</li>
            </Link>
            <Link to={"/orders"}>
              <li>Orders</li>
            </Link>
            <Profile />
          </div>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
