import React, { useContext, useState, useRef } from 'react'
// import gql from 'graphql-tag'
import { useQuery, useMutation } from "@apollo/react-hooks"
// import { Card, Form, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
// import moment from 'moment';
// import LikeButton from '../components/LikeButton';
// import DeleteButton from '../components/DeleteButton.js';
// import { Link } from 'react-router-dom'
// import { FETCH_USER_QUERY } from "../util/graphql";

import { AuthContext } from '../context/auth'
// import Signal from '../util/Popup'

import './style.css'

function Profile(props) {
  const username = props.match.params.username;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');


  // const { data } = useQuery(FETCH_USER_QUERY, {
  //   variables: { userId: user?.id },
  // });

// const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
//   update(){
//     setComment('');
//     commentInputRef.current.blur();
//   },
//     variables: {
//       postId,
//       body: comment
//     }
// }) 

  //   one button is clicked redirect to home page
  function deletePostCallback() {
    props.history.push('/');
  }

  return (
    <div>
      <h3>this is the profile page</h3>
    </div>
  )
}


// const SUBMIT_COMMENT_MUTATION = gql`
//   mutation($postId: String!, $body: String!) {
//     createComment(postId: $postId, body: $body) {
//       id
//       comments {
//         id
//         body
//         createdAt
//         username
//       }
//       commentCount
//     }
//   }
// `;



export default Profile;