  import gql from 'graphql-tag';


//   stolen from the home page and added an export in front
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      author {
        id
        image
        username
      }
      image
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

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      image
      author {
        id
        image
        username
      }
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
export const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      image
      posts {
        id
        body
        image
        createdAt
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
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($image: String!) {
    updateUser(image: $image) {
      id
      email
      username
      image
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;