import { useUserAuth } from "../../context/auth";

const AuthDetails = () => {
  const { user } = useUserAuth();

  return (
    <div>{user ? <p>{`Signed In as ${user?.email}`}</p> : <p>Log Out</p>}</div>
  );
};

export default AuthDetails;
