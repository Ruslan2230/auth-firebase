import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to='/sign-in-sign-up' />;
  }
  return children;
};

export default ProtectedRoute;
