import React, { useContext} from 'react'
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react'
import moment from 'moment'
import {Link} from "react-router-dom"
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton';
import Signal from '../util/Popup'

function PostCard(
  {post:{ body , createdAt, id, username, likeCount, commentCount, likes} 
}) {
  const { user } = useContext(AuthContext)


    return (
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as= {Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
           {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div>
    <LikeButton user={ user } post={{ id, likes, likeCount }} />
    <Signal  content= "Make A Comment">
    <Button labelPosition='right' as={Link} to={`/post/${id}`}>
      <Button basic color='black' >
        <Icon name='comments outline'  />
       
      </Button>
      <Label  basic color='black' pointing='left'>
       {commentCount}
      </Label>
    </Button> 
    </Signal>
 
    {user && user.username === username && <DeleteButton postId={id} />}
  </div>
 
        </Card.Content>
      </Card>
    )
}

export default PostCard