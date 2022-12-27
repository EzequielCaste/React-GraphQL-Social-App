import React, { useContext, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { Button, Card, Form, Icon, Image, Grid, Label } from 'semantic-ui-react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CardsButtons from '../components/CardsButtons';

const SinglePost = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const { buttonSize } = useContext(ThemeContext);

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const navigate = useNavigate();

  function deletePostCallback() {
    navigate('/');
  }

  let postMarkup;


  if (!getPost) {
    postMarkup = <h1 className='page-title'>Loading post...</h1>;
  } else {

    const {
      id,
      body,
      user: { photoURL },
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;



    postMarkup = (
      <Grid columns={2} doubling stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <Image
                    avatar
                    circular
                    src={photoURL}
                  />
                  {username}
                </Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <CardsButtons user={{user, username}} buttonSize={buttonSize} post={{ id, likes, likeCount, commentCount, body }} />
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        ref={commentInputRef}
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui teal button"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
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

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
