  
  import gql from 'graphql-tag';


  //   stolen from the home page and added an export in front
  export const FETCH_POSTS_QUERY = gql`
    {
      getPosts {
        id
        body
        createdAt
        username
        likeCount
        likes {
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
  `;

export const FETCH_USERS_QUERY = gql`
{
  getUsers {
    id
    email
    createdAt
    username
    
  }
}
`;

export const FETCH_USER_QUERY = gql`
query getUser($userId: ID!) {
  getUser(userId: $userId) {
    id
    createdAt
    username
    email
  }
}
`;


