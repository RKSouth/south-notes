import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

function Register() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',

    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const [addUser, { loading}] = useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result)
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
        // here we need straight away send a mutation to our server -because we are using server side validation  
    }

  
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
             <h1>Register</h1>
             <Form.Input
                label = "Username"
                placeholder="Username.."
                name="username"
                type="text"
                value= {values.username}
                onChange={onChange}/>
             <Form.Input
                label = "Email"
                placeholder="Email.."
                name="email"
                type="email"
                value= {values.email}
                onChange={onChange}/>
             <Form.Input
                label = "Password"
                placeholder="Password.."
                name="password"
                type="password"
                value= {values.password}
                onChange={onChange}/>
                 <Form.Input
                label = "Confirm Password"
                placeholder="Confirm Password.."
                name="confirmPassword"
                type="password"
                value= {values.confirmPassword}
                onChange={onChange}/>
                <Button type="submit" primary>
                    Submit
                </Button>
  
</Form>
        </div>
    )
}

const REGISTER_USER = gql `
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: Stringer
    
){
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
        # things we are getting back below here
    ){
        id email username createdAt token
    }
}`


export default Register