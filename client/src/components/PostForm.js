import gql from 'graphql-tag'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY} from '../util/graphql'
// import moment from 'moment'
// import {Link} from "react-router-dom"

function PostForm() {

    const { values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
                // stolen from the homepage
            })
            // we need to edit the getPosts entry (where all the data actually lives)
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data});
            // this resets the body once it is submitted so you have a fresh blank form
            values.body= '';
        }
    });

    function createPostCallback() {
        createPost();
        
      }

    return (
   <Form onSubmit={onSubmit}>
       <h2>Create a post:</h2>
       <Form.Field>
           <Form.Input
           placeholder="Hello Friends"
           name="body"
           onChange={onChange}
           value={values.body}
           />
           <Button type="submit" color="green">
               Submit
           </Button>
       </Form.Field>
   </Form>
    );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
