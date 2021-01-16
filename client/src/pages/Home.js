import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

import PostCard from './../components/PostCard'
import HomeMenuBar from './../components/HomeMenuBar'

function Home() {
    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);

    // if(data){
    //     console.log(data)
    // }
    return (
        <div>
        <div>
<h1>Home Page</h1>
<HomeMenuBar/>
        </div>
        <h1>Recent Posts</h1>
        <Grid columns={3} >
    <Grid.Row>
    <Grid.Row>    </Grid.Row>
      {loading ? (
          <h1> Loading posts...</h1>
      ) : ( 
          posts && posts.map( post => (
              <Grid.Column key = {post.id} style={{ marginBottom: 40}}>
                  <PostCard post = {post}/>
              </Grid.Column>
          ) )
      )}
    </Grid.Row>

   
  </Grid>
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
{getPosts{
    id body createdAt username likeCount
    likes{
        username 
    }
    commentCount
    comments{
        id username createdAt body
    }
}
}`

export default Home