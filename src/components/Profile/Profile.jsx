import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='wrapper'>
      <div className='profile-card js-profile-card'>
        <div className='profile-card__img'>
          <img src={user?.photoURL} alt='profile card' />
        </div>

        <div className='profile-card__cnt js-profile-cnt'>
          <div className='profile-card__name'>{user?.displayName}</div>
          <div className='profile-card__txt'>{user?.email}</div>
          <div className='profile-card-loc'></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
