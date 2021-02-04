import React, { useContext, useState} from 'react'
import { Card, Form, Icon, Label, Button, Image } from 'semantic-ui-react'
import moment from 'moment'
import {Link} from "react-router-dom"
import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton';
import Signal from '../util/Popup'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../util/hooks';

function Profile(props, {user: username, createdAt, id , bio, token}) {
    const  { user, logout } = useContext(AuthContext)
    const context = useContext(AuthContext);
    const { onChange, onSubmit, values } = useForm(editUserCallback, {
        username: '',
        bio: ''
      });

      const [editUser, { loading }] = useMutation(EDIT_USER, {
        update(
          _,
          {
            data: { editUser: userData }
          }
        ) {
          context.login(userData);
          props.history.push('/Profile');
        },
       
        variables: values
      });
    
      function editUserCallback() {
        editUser();
      }

    return (
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header name={user.username}>{user.username}</Card.Header>
          <Card.Meta>{user.createdAt}</Card.Meta>
          <Card.Description>
          {user && (
              <h1>edit your page</h1>
          )}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className="form-container">
            <Form 
            // onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}
            >
            <Form.Input
                label = "Username"
                placeholder="Username.."
                name="username"
                type="text"
                // value= {values.username}
                // error= {errors.username ? true : false}
                // onChange={onChange}
                />
                </Form>
                </div>
        </Card.Content>
      </Card>
    )
}

const EDIT_USER = gql`
  mutation editUser(
    $username: String!
    $bio: String!

  ) {
    editUser(
        editUser: {
        username: $username
        email: $email
        bio: $bio
      }
    ) {
      id
      email
      username
      createdAt
      token
      bio
    }
  }
`;

export default Profile