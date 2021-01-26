import React, {useContext} from 'react'
import gql from 'graphql-tag'
import { useQuery } from "@apollo/react-hooks"

import { Card, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton.js';

import { AuthContext} from '../context/auth'

function SinglePost(props) {
    const postId = props.match.params.postId;
    console.log(postId)

    const { user } = useContext(AuthContext)
    const { data: { getPost}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;
    if(!getPost){
        // a spinner here would be cool
        postMarkup = <p>Leading post...</p>
    } else {
        const { id,body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width ={2}>
                    <Image 
                    size='small'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    float='right'/>  
                    </Grid.Column>
                    <Grid.Column width ={10}>
                        <Card fluid>
                            <Card.Content>
                                < Card.Header>{ username }</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('Comment on post')}
                >
                  <Button basic color="green">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="green" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {/* {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )} */}
              </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
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

export default SinglePost;