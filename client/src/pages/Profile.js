import React, { useContext, useState} from 'react'
import { Card, Grid, Transition,Form, Icon, Label, Button, Image } from 'semantic-ui-react'
import { useQuery } from "@apollo/react-hooks";
import {Link} from "react-router-dom"
import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import PostCard from './../components/PostCard'
import './style.css'

function Profile() {
    const  { user } = useContext(AuthContext)
    const context = useContext(AuthContext);

    const { loading, 
      data: { getPosts: posts } = {} 
  } = useQuery(FETCH_POSTS_QUERY);


    return (
      <div>
        <Card fluid >
        <Card.Content>
          <Image
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <hr></hr>
          <Card.Header  float="right">username here</Card.Header>
          <Card.Meta>user created At</Card.Meta>
          <Card.Description>
          {user && (
              
              <h1>edit your page</h1>
          )}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className="form-container">
        
                </div>
        </Card.Content>
      </Card>

<Grid.Row className="page-title">
<h1>Recent Posts</h1>  
</Grid.Row>
<Grid columns={3} >
<Grid.Row>
{/* if user are logged in show this form */}

{loading ? (
<h1> Loading posts...</h1>
) : ( 
<Transition.Group>
{
      posts && posts.map( post => (
        <Grid.Column key = {post.id} style={{ marginBottom: 40}}>
            <PostCard post = {post}/>
        </Grid.Column>
    ) )
}
</Transition.Group>
)}
</Grid.Row>


</Grid>
</div>
    )
}

// const EDIT_USER = gql`
//   mutation editUser(
//     $username: String!
//     $bio: String!

//   ) {
//     editUser(
//         editUser: {
//         username: $username
//         email: $email
//         bio: $bio
//       }
//     ) {
//       id
//       email
//       username
//       createdAt
//       token
//       bio
//     }
//   }
// `;

export default Profile