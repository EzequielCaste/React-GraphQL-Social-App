import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import CardsButtons from './CardsButtons';
import { ThemeContext } from '../context/theme';

const PostCard = ({
  post: { body, createdAt, id, username, user: postUser, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);  
  const { isDarkTheme, buttonSize } = useContext(ThemeContext);

  return (
    <Card fluid className={isDarkTheme ? 'dark' : null}>
      <Card.Content>
        <Image
          as={Link}
          to={`/user/${postUser?.id}`}
          rounded
          floated="right"
          size="mini"
          src={postUser.photoURL}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <CardsButtons user={{user, username}} buttonSize={buttonSize} post={{ id, likes, likeCount, commentCount, body }} />        
      </Card.Content>
    </Card>
  );
};

export default PostCard;
