import React from 'react'
import { Card, Icon, Label, Button, Image} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from "react-router-dom"

function PostCard({post:{ body , createdAt, id, username, likeCount, commentCount, likes} }) {
   function likePost(){
       console.log('like post')
   }

function commentOnPost(){
    console.log('comments');
}
    return (
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as= {Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
           {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div>
    <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='green' basic>
        <Icon name='bolt' />
        
      </Button>
      <Label as='a' basic color='green' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button basic color='black'>
        <Icon name='comments outline' />
       
      </Button>
      <Label  basic color='black' pointing='left'>
       {commentCount}
      </Label>
    </Button>
  </div>
        </Card.Content>
      </Card>
    )
}

export default PostCard