import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const saveUserToDB = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          await axios.post(
            '/users',
            {
              auth0Id: user.sub,
              name: user.name,
              email: user.email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.error('Error saving user to DB:', err);
        }
      }
    };

    saveUserToDB();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    isAuthenticated && (
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};

export default Profile;
