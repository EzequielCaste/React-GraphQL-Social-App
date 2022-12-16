import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      createdAt
      photoURL
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
mutation updateUser($userId: ID! $photoURL: String!) {
  updateUser(userId: $userId photoURL: $photoURL) {
    id
    email
    username
    createdAt
    photoURL
    token
  }
}
`;

export const FETCH_POSTS_QUERY = gql`
{
    getPosts {
      id
      body
      user {
        id
        photoURL
      }
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
  }
}
`;