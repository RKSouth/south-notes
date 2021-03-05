import React, { useContext } from 'react'
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
// import { Card, Form, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
// import { FETCH_USER_QUERY } from '../util/graphql';

import { AuthContext } from '../context/auth'
// import Signal from '../util/Popup'

import './style.css'

<<<<<<< HEAD
function Profile(props, {user: username, createdAt, id , bio, token}) {
    const  { user, logout } = useContext(AuthContext)
    const context = useContext(AuthContext);
    // const { onChange, onSubmit, values } = useForm(editUserCallback, {
    //     username: '',
    //     bio: ''
    //   });

    //   const [editUser, { loading }] = useMutation(EDIT_USER, {
    //     update(
    //       _,
    //       {
    //         data: { editUser: userData }
    //       }
    //     ) {
    //       context.login(userData);
    //       props.history.push('/Profile');
    //     },
       
    //     variables: values
    //   });
    
    //   function editUserCallback() {
    //     editUser();
    //   }

    return (
        <Card fluid >
        <Card.Content>
          <Image
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <hr></hr>
          <Card.Header  float="right"name={user.username}>{user.username}</Card.Header>
          <Card.Meta>{user.createdAt}</Card.Meta>
          <Card.Description>
          {user && (
              
              <h3>edit your page</h3>
          )}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className="form-container">
        
                </div>
        </Card.Content>
      </Card>
    )
}
=======
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
>>>>>>> b84161ec9f08ecaf1f4d1f24516dd588429ee682

  
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