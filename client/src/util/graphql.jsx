import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
{
    getPosts {
      id
      body
      user {
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