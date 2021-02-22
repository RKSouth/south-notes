import React, { useContext } from 'react'
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
// import { Card, Form, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
// import { FETCH_USER_QUERY } from '../util/graphql';

import { AuthContext } from '../context/auth'
// import Signal from '../util/Popup'

import './style.css'

function Profile(props) {
  const userId = props.match.params.userId;
  const user = props.match.params.user;
  // const username = props.match.params.username;
  const email = props.match.params.email;
  //  const createdAt = props.match.params.createdAt
  // const { user } = useContext(AuthContext);
 console.log(userId);
console.log(email);



  const {
    data: { getUser } = {}
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId
     
    }
  });
  console.log({data: { getUser }
  });
  let postMarkup;
  if (!getUser) {
    // a spinner here would be cool
    postMarkup = <p>Loading post...</p>
  } else {
    const { id,
   
      username,
      email,
      createdAt } = getUser;

    postMarkup = (

  
    <div>
      <h3> {username}'s profile</h3>
      {/* <p> {moment(createdAt).fromNow()}</p> */}
      {/* <p> {email}</p> */}
    </div>
  )
    
}
return postMarkup;
}

 const FETCH_USER_QUERY = gql`
  query ($userId: ID!, $username: String, $createdAt:String, $email:String) {
    getUser(userId: $userId, username: $username, createdAt: $createdAt, email: $email) {
      id
      createdAt
      username
      email
    }
  }
`;



export default Profile;