import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button, Label, Icon } from 'semantic-ui-react';

function DeleteButton({ user, post: {id, likeCount, likes}}){
   

    return (
        <Button as="div" floated="right"color="olive" onClick={() => console.log('Delete post')}>
        <Icon name="trash" style ={{margin: 0 }}/>
      </Button>
    )
}

export default DeleteButton;