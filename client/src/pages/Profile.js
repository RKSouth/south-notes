import React, { useContext, useState, useRef } from 'react'
// import gql from 'graphql-tag'
import { useQuery, useMutation } from "@apollo/react-hooks"
// import { Card, Form, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
// import LikeButton from '../components/LikeButton';
// import DeleteButton from '../components/DeleteButton.js';
// import { Link } from 'react-router-dom'
// import { FETCH_USER_QUERY } from "../util/graphql";

import { AuthContext } from '../context/auth'
// import Signal from '../util/Popup'

import './style.css'

function Profile(props) {
  // const username = props.match.params.username;
   const createdAt = props.match.params.createdAt
  const { user } = useContext(AuthContext);



  return (
    <div>
      <h3>{props.match.params.username} 's profile</h3>
      <p>{props.match.params.email} </p>
    </div>
  )
}





export default Profile;