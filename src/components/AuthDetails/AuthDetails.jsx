import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const AuthDetails = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>{user ? <p>{`Signed In as ${user?.email}`}</p> : <p>Log Out</p>}</div>
  );
};

export default AuthDetails;
