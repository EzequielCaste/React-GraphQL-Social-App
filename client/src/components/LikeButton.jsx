import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function LikeButton({ buttonSize, user, post: { id, likeCount, likes = [] } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost, { data, loading, error }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  })

  const likeButton = user ? (
    liked ? (
      <Button size={buttonSize} color="teal" filled="true">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button size={buttonSize} color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button size={buttonSize} as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  )
  return (
    <MyPopup
      content={liked ? 'Unlike' : 'Like'}
    >
      <Button size={buttonSize} as="div" labelPosition="right" onClick={() => user && likePost()}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId){
      id
      likes {
        id username
      }
      likeCount
    }
  }
`;

export default LikeButton;
