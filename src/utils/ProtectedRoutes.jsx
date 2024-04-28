import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to='/sign-in-sign-up' />;
  }
  return children;
};

export default ProtectedRoute;
