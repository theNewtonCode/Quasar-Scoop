import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { base_url } from '../api';

const AuthorProfile = () => {
  // console.log('Params:', useParams());
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(username);
        const response = await axios.get(`${base_url}/users/${username}`);
        console.log(response);
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [username]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      {/* Add more profile details if needed */}
    </div>
  );
};

export default AuthorProfile;
