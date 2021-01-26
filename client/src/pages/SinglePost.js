import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from "@apollo/react-hooks"
import { FETCH_POST_QUERY } from '../util/graphql';

function SinglePost(props) {
    const postId = props.match.params.postId;
    console.log(postId)

    const { data: { getPost}} + useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;
    if(!getPost){
        // a spinner here would be cool
        postMarkup = <p>Leading post...</p>
    }

}

const FETCH_POST_QUERY = gql`
    query($postId: ID){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments {
                id
                username 
                createdAt 
                body
            }
        }
    }
`

export default SinglePost