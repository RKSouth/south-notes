import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

function LikeButton({ post: {id, likeCount, likes}}){
    const[liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user,likes])

    const likeButton = user ? (
        liked ? (
            <Button color='green'>
            <Icon name='bolt' />
            
          </Button>
        ) : (
            <Button color='green' basic>
            <Icon name='bolt' />
            
          </Button>
        )
    ) : (
        <Button as= { Link } to="/login" color='green' basic>
        <Icon name='bolt' />
        
      </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
     {likeButton}
      <Label as='a' basic color='green' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;