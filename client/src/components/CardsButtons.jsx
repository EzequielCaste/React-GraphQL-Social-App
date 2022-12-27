import React from 'react'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import CommentButton from './CommentButton';


const CardsButtons = ({ user: { user, username }, buttonSize, post: { id, likes, likeCount, commentCount, body } }) => {
  
  return (
    <>
      <LikeButton buttonSize={buttonSize} user={user} post={{ id, likes, likeCount }} />
      <CommentButton buttonSize={buttonSize} post={{ id, commentCount }} />
      {(user?.isAdmin || user?.username === username) && (
        <>
          <DeleteButton buttonSize={buttonSize} postId={id} />
          <EditButton buttonSize={buttonSize} postId={id} postBody={body} />
        </>
      )}
    </>

  )
}

export default CardsButtons