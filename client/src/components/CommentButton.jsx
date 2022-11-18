import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

const CommentButton = ({ buttonSize, post: { id, commentCount }}) => {
  return (
    <MyPopup
      content="Comment on post">
      <Button size={buttonSize} labelPosition="right" as={Link} to={`/posts/${id}`}>
        <Button size={buttonSize} color="blue" basic>
          <Icon name="comments" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  )
}

export default CommentButton