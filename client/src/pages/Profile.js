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
  // const userId = props.match.params.userId;
  const username = props.match.params.username;
  // const email = props.match.params.email;
  //  const createdAt = props.match.params.createdAt
  const { user } = useContext(AuthContext);

  // const {
  //   data: { getUser } = {}
  // } = useQuery(FETCH_USER_QUERY, {
  //   variables: {
  //     userId
  //   }
  // });

  //   const { 
  //     username,
  //     email} = getUser;
 return (

  
    <div>
      <h3> {username}'s profile</h3>
      {/* <p> {moment(createdAt).fromNow()}</p> */}
      {/* <p> {email}</p> */}
    </div>
  )
    
}

 const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      createdAt
      username
      email
    }
  }
`;



export default Profile;