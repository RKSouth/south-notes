import React, { useContext, useState, useRef } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from "@apollo/react-hooks"

import { Card, Form, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton.js';


import { AuthContext } from '../context/auth'
import Signal from '../util/Popup'

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');


  const {
    data: { getPost } = {}
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
  update(){
    setComment('');
    commentInputRef.current.blur();
  },
    variables: {
      postId,
      body: comment
    }
}) 

  //   one button is clicked redirect to home page
  function deletePostCallback() {
    props.history.push('/');
  }


  let postMarkup;
  if (!getPost) {
    // a spinner here would be cool
    postMarkup = <p>Leading post...</p>
  } else {
    const { id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              size='small'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              float='right' />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                < Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Signal content='Comment on this Post'>
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
                </Signal>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
                  {user &&(
                    <Card fluid>
                        <p>Post a comment</p>
                        <Card.Content>
                        <Form>
                          <div className="ui action input and fluid">
                            <input
                            type="text"
                            placeholder="Comment.."
                            name="comment"
                            value = {comment}
                            onChange= {event => setComment(event.target.value)}
                            ref={commentInputRef}
                            />
                            <button type =" submit"
                              className="ui button green"
                              disabled={comment.trim() === ''}
                              onClick={submitComment}>
                                Submit
                              </button>
                          </div>
                        </Form>
                        </Card.Content>
                    </Card>
                  )}
                  {comments.map(comment => (
                    <Card fluid key ={comment.id}>
                      <Card.Content>
                        {user && user.username === comment.username && (
                          <DeleteButton postId = {id} commentId={comment.id}/>
                        )}
                        <Card.Header>{comment.username}</Card.Header>
                        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                      </Card.Content>
                    </Card>
                  )
                    )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return postMarkup;
}


const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
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