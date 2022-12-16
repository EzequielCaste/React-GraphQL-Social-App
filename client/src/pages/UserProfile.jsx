import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import UserDetails from '../components/UserDetails';

import { GET_USER_QUERY } from '../util/graphql';

const UserProfile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  if (user.id === userId) {
    return (
      <UserDetails user={user} auth={user} />
      )
  }

  const { loadingUser, data: { getUser: newUser } = {} } = useQuery(GET_USER_QUERY, {
    variables: {
      userId
    }
  });

  if (newUser) {
    return (
      <UserDetails user={newUser}  />
    )
  }
};

export default UserProfile;
