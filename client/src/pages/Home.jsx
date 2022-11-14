import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';

import {Grid, Transition} from 'semantic-ui-react';
import {AuthContext} from '../context/auth';
import PostCard from '../components/PostCard/';
import PostForm from '../components/PostForm/';
import {FETCH_POSTS_QUERY} from '../util/graphql';

function Home() {
  const {loading, data: {getPosts: posts} = {}} = useQuery(FETCH_POSTS_QUERY);

  const {user} = useContext(AuthContext);

  const COMPUTER_COLUMN = 9;
  const TABLET_COLUMN = 16;

  return (
    <Grid doubling stackable >
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && (
        <Grid.Row>
          <Grid.Column computer={COMPUTER_COLUMN}>
            <PostForm />
          </Grid.Column>
        </Grid.Row>
      )}
      {loading ? (
        <Grid.Row className="page-title">
          <h1>Loading posts...</h1>
        </Grid.Row>
      ) : (
        <Grid.Row>
          <Transition.Group duration={400}>
            {posts &&
              posts.map((post) => (
                <Grid.Column tablet={TABLET_COLUMN} computer={COMPUTER_COLUMN} key={post.id} style={{marginBottom: '20px'}}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        </Grid.Row>
      )}
    </Grid>
  );
}

export default Home;
