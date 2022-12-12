import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
{
    getPosts {
      id
      body
      createdAt
      username
      profile
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