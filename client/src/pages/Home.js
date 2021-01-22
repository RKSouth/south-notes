import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';


import { AuthContext} from '../context/auth'
import PostCard from './../components/PostCard'
import PostForm from './../components/PostForm'

function Home() {
    // just signifying if user is signed
    const { user } =useContext(AuthContext)

    // show da posts!
    const { loading, 
        data: { getPosts: posts } = {} 
    } = useQuery(FETCH_POSTS_QUERY);
    // if(data){
    //     console.log(data)
    // }

    return (
        <div>
        <div>
{/* <h1>Home Page</h1> */}
        </div>
        <Grid.Row className="page-title">
            <h1>Recent Posts</h1>  
        </Grid.Row>
        <Grid columns={3} >
    <Grid.Row>
        {/* if user are logged in show this form */}
        {user && (
            <Grid.Column>
                <PostForm/>
            </Grid.Column>
        )}
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