import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button, Confirm, Icon } from 'semantic-ui-react';

function DeleteButton({ postId, callback }){
   const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){

        },
        variables: {
            postId

        }
    })


    return (
    <>
        <Button 
        as="div" 
        floated="right"
        color="olive"
        onClick={() => setConfirmOpen(true)}
        >
        <Icon name="trash" style ={{margin: 0 }}/>
      </Button>
      <Confirm
      open= {confirmOpen}
      onCancel={() => setConfirmOpen(false)}
      onConfirm={deletePost}/>
      </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost($postId: postId)
    }
`

export default DeleteButton;