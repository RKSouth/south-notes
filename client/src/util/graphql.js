  
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