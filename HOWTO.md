# facebook-clone
building a Facebook clone (kind of )

Technologies Used:
React - used to make responsive pages that "react" in real time to changes on the pages.
Semantic UI - Easy to use pre-built css framework that helps make building beautiful websites, easier.
GraphQL - A query language that can be used on top of any backend. There are 3 types of graphQl operations that we can perform: queries (fetching data), mutations(writing data creating, updating and deleting) and then subscriptions that listen to changes in data in real time.

Graph ql is self -documenting

Other: MongoDB (Atlas)
    Express
    Node.js

To start: 
0.1 Make sure you have a a cluster database set-up in the mongodb cloud website.
1. In the terminal, npm init -y -this should create a package.json
2. you will need to create a index.js and a .gitignore
3. Install dependencies: npm install apollo-server graphql mongoose
4. require ApolloServer and grahpql-tag in index.js  -in order to get syntax highlighting for graphql it's a good idea to install GraphQL for VSCode made by Kumar Harsh. 

![Require](Assets/Images/Code-creating/Requre-index.js.png)

5. Create typeDefs

![TypeDefs](Assets/Images/Code-creating/typedefs-index.js.png)

6. set up resolvers, which will take in the graphql logic.
7. set up new apollo server. 
8. start a server and specify a port

![Resolver/Server](Assets/Images/Code-creating/resolversandserversetup.png)

9. Type in node index to see your progress! :) Press play to see your database working
10. Require mongoose, our ORM library. in the index.js next to where gql and apollo server are working
11. The connect using mongoose by going to mongodb atlas dashboard, go to 'connect' grab your connection string 
- create config.js file and make a module.exports = { with your connection string here} and then make sure to gitignore your config file so one can see your password

mongodb+srv://rkelm:<password>@cluster0.o9vz6.mongodb.net/<dbname>?retryWrites=true&w=majority
12. rebuild index.js so it connects the localhost AND the database

![db/localhost](Assets/Images/Code-creating/localhostanddb.png)

13. Create models folders - create user.js model, post.js model
14. create a  query for fetching all the posts from the database - use a dummy post to check your work in the mongdb collections section - make sure you have one called "posts"
![Dummytext](Assets/Images/Code-creating/dummytext.png)

15. Adust query and resolvers to try to get posts, using try so that if it doesn't work, the entire server won't crash

![getPosts](Assets/Images/Code-creating/getPosts.png)
...if you opne it up in local host and make sure your left side looks like this and hit play you should get something like this:
![getposts](Assets/Images/Code-creating/getPosts2.png)

16. Clean up folders/files by creating graphql folder that holds the typedefs and a resolvers folder which containes two seperate files for resolvers (for users and posts) -also include that in the index - you can now remove const Post = require('./models/Post') from the index.js and replace it with const resolvers = require('./graphql/resolvers')
17. install nodemon - by running npm i -D nodemon and changing the scripts in package.json from tests to "start" : "nodemon index" - don't forget to save and check that it's working

Creating a way for users to authenticate:

18. in typeDefs.js add input RegisterInput and type Mutation 

![authdefs](Assets/Images/Code-creating/authTypeDefs.png)

19. Add 
 Mutation: {
        ...usersResolvers.Mutation
    } 

    to the index module exports in the resolvers folder 
20. Build out the users file in the resolvers - some of it will just be pseudocoded for now
21. npm install bcryptjs jsonwebtoken now that those are installed we can de structure from the args section of information that the user gave us - don't forget to import bcrypt
22. create new user object, save user info to database, create new token (with payloads), and create a special secret (hidden in our config.js file)

![usercreate](Assets/Images/Code-creating/usercreate.png)
![secretkey](Assets/Images/Code-creating/secretkeysetup.png)

23. In order to test and make sure it's working, in your browser make sure it looks like this:

![testuser](Assets/Images/Code-creating/testuser.png)

24. The next step is to make suer we don't create two users with the same username, in order to do this we can use specific errors from apollo

25. Now, time for validation -create a util folder containing validators.js create validators for if username, if email, if password - then export it to the users resolvers file. Make sure you de-structure it and then call this function: 

 `const {valid, errors } = validateRegisterInput(
                username, 
                email, 
                password, 
                confirmPassword
                 )
            if(!valid){
                throw new UserInputError('Errors', {errors});
            }`

26. next we will add a log in - make sure you have a seperate validation for log in in the validators file. Then in the typDefs under type Mutation add login as a type of mutation with a username string and a password string. we need to validate similarly to the way we validated for the user create. 
<!-- https://www.youtube.com/watch?v=n1mdAPFq2Os att authenticatio middleware and create/deleteposts 1:12:52 -->
27. Add post query and mutation to typedefs. This will allow us to look up posts and to create new posts.
28. in typedefs, create  deletePost(postId: ID!): String! mutation in typedefs -deleting is mutating. Then you want to add the corelating resolvers to posts.js Make sure to include the same function name in the typedefs and instances if it does not work (throw and catch errors).
29. Check to so if it is working by going to your browser and entering in:

`{
  getPost(postId:"5fff6c3d601e560c04724310"){
  id
	body
  createdAt
  username    
  }

}`

...with the appropriate id number (gotten from your collection on atlas) and make sure when you hit play that no errors are returned
30. Add context argument in for apollo server in index.js and create new util file called check-auth.
31. by requiring check-auth and calling  const user = checkAuth(context); in the mutation section of posts, this assures someone can't create a post without authorization. Also in the index of the resolvers folder don't forget to add another mutation
32. Then we can create a new a post based off our model and save it. Don't forget to check and see if it actually works. How to check?
Get your user login token in the html route and set to Bearer: 

![checkposts](Assets/Images/Code-creating/createpost.png)

33. In order to get posts to show the latest version posted add .sort({createdAt: -1}) to the end of find posts in the resolver.
35. At async deletePost function on post resolvers (remember it has already been created in a few other places) and check it in your local host to make sure it works:

![checkdelete](Assets/Images/Code-creating/checkdeletepost.png)

36. Adding likes and comments by first adding them to the type post in the typeDefs, and creating a new type comment and a new type Like - you can refer back to the models to see what you need to put in the typeDefs - they should match, with the addition of an id.
37. Then we need to add mutations to create a comment and like a post -make sure they match up with your intentions and that you are returning Post!
38. Next we will create a comments.js file in the resolver folder - then import that new file to your index.js this file will contain a mutation that checks the auth and creates a comment on a new a post. In order to check it make sure your localhost looks similar to the image below. If you get an auth error, you may need to log in again and get a new token. If you continue to get errors check to make sure your file paths are correct and you are requiring things in the right places.

![checkcomment](Assets/Images/Code-creating/createcomment.png)
39. Add delete comment function make sure it has errors for if a user tries to delete another persons comment (not 100% neccesary but a good check anyway) aaaand if the post doesn't work check to make sure it worked in the browser. by typing in mutation 

`{ deleteComment(postId:""
commentId:"){
    id 
    comments{
        id
        username
        body
    }
}}`
and making sure you have auth bearer token correct.
40. Adding likes to the posts: in posts create an async function for likePost -TEST IT IN THE BROWSER!

![likes](Assets/Images/Code-creating/likecomment.png)
<!-- STOPPED AT 1:56:58 -->

41. and type Subscription to type defs to get started on how to use subscriptions then in index we need something from apollo-server, called pub sub then we need to create a new instance const pubsub - new PubSub and pass it to the context inside the server `context = ({req}) => ({ req, pubsub})` then in posts.js add a function called subscription that only takes in context, no parent and no argument. the context will be 'NEW_POST' we wll also need to add a a pubsub right after a new post is created so that tht person subscribing can see the new post. 
42. In the index.js of the resolvers folder we will need to a new field, Subscription. Check and make sure it works
43. In order to count likes and comments we are going to need to add a few things. We can calculate that on the client or on the server - to do it on the server: add, in typedefs to type Post :     
        likeCount: Int!
        commentCount: Int!
44. And then in the index.js of the resolvers folder add yet another field called Post - every time something happens to a post now it run with through here. If we return the length of the parent.likes and the parent.comments then each time something happens to the post these will also show the count of likes and comments.

## Front End -React!

45. In terminal (in the main folder) type in `npx create-react-app client`. This will create our client-side of our application because the server side is done!
46. Once that is done go into your newly created client/src folder and delete logo.svg, index.css, App.test.js remove everything in the APP.css. In App.js delete everything being returned inside the App() function and replace with: 
`<div><h1>Welcome to my App</h1></div>` and remove the import for the logo. In the index.js folder remove the import for index.css
47. In the client/public folder in the index.html change the title to something other than react app.
48. In your terminal, npm start then open an additional terminal and cd into the client folder and npm start so that you are running both the server and the front end at the same time.
49. In order to prevent nodemon from restarting the server every time we make a change go to your outer package.json under scripts "serve": "node index", now you can restart your server-side terminal and instead of npm start run npm run serve.
#### The next step is to setp up the apollo provider and provide the apollo client so that we can connect to our graphql server. 
50. in the src folder, create a new file called ApolloProvider.js
51. In the client folder (in the terminal) npm install @apollo/client.
52. Build ApolloProvider so it looks like the image below:

![ApolloProvider](Assets/Images/Code-creating/ApolloProvider.png)

53. In the src folder, in the index.js file add import ApolloProvider from './ApolloProvider' to your list of imports and remove app, and react change the reactDOM.render to look like :

 `ReactDOM.render(
 ApolloProvider,
  document.getElementById('root')
);`

54. Install Apollo dev tools for chrome and add it to your browser if you click f12 it works just like the tool at our server endpoint. 
55. In your main file npm install react-router-dom semantic-ui-css semantic-ui-react
56. In App.js import files and set up routers appropriately -should look like this when done:

![App](Assets/Images/Code-creating/AppUpdate-1.png)

57. Inside src/pages create the corresponding pages to the routes you just created, meaning we will need a Home.js a Login.js and a Register.js. Inside src we will also need a components folder. It is important to create this set-up/framework ahead of time so that your files do not become too cumbersome or difficult to manage. 
58. Inside of these pages you will need a function with the page name that returns div, an export default (function name) and an import React
59. Make sure to import your newly created pages to the App.ks file At this point you should get a blank page.
60. Go to Semantic UI's website and select an easy to you use menu. Then create a component file to hold your newly selected (copied ) menu bar. Make sure you went to Semantic UI react or code will be wacky. 
61. There are several changes you will want to make to your menu bar items. Please note carefully the commented out items and the things that have been changed. Also you can remove any reference to this. because these are only used for class based items and since we removed class we should remove this as well.

![Menu](Assets/Images/Code-creating/menuedits.png)

62. The next step is to add the menu bar to the main page, import in the App.js and then include in the top of the routes. We want it to show up on every page.

<!-- https://www.youtube.com/watch?v=n1mdAPFq2Os -->

63. Add `import { Container } from "semantic-ui-react"` to top of app.js -containers are important and wrap everything in the container component
64. In order to get links to work in react you need to import import {Link } from 'react-router-dom' into your menu bar and include:
           ` as ={Link}
              to="/"`
    in order to specify where the link is going.

65. Add color to active link by adding color = "orange".
66. In order for color to link up with active page correctly add:
const pathname = window.location.pathname;
const path = pathname === '/' ? 'home' : pathname.substr(1);

above the useState call and set use state to path. That way it always update

<!-- time 2:33> 53 -->

### Displaying Posts

67. In the Home page import { useQuery } from "@apollo/react-hooks" and import gql from 'graphql-tag';
68. In the client folder npm install graphql graphql-tag then in the home page import gql from 'graphql'
69. Before export default home build this function to get posts:
`const FETCH_POSTS_QUERY = gql``
{getPosts{
    id body createdAt username likeCount
    likes{
        username 
    }
    commentCount
    comments{
        id username createdAt body
    }
}
}``
70. Above the return in the Home page add:

  `const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if(data){
        console.log(data)
    }`

    this will console.log our data and show us it's coming in.
71. Now we can de-structure our data by changing our call to:
`const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);`
We are now getting posts and setting them to an alias of posts.
72. In order to display our posts we should get some sort of grid from semantic ui react (make sure it is semantic ui react). Clean it up so you only have one column and 1 row.
73. Now cut the grid column and inside that row we want to check and see if we are loading by using a terinary operator. `{ loading ? ( <h1>Loading Posts</h1>) : ( HERE is where iterate through our posts)}`
74. BUT FIRST! Before we display our posts, we need to check if it's returning anything, if it's truthy. so we runs posts && posts.map(post => (HERE is where iterate through our posts))
75. Past the grid columns back in and we will create another component called postcards inside the of the grid columns. So we creeate `<PostCard>` and then we pass it the value of posts (or is it post?) by setting it equal to `<PostCard post={post}> `
76. When we are iterating through it's important to pay a key value to our top most componemnt in the `<Grid.Column > insert key ={post.id}` Some steps may have been skipped but the general idea is the code should look something like the image below when done:

![HomePageReturn](Assets/Images/Code-creating/HomePageReturn.png)

77. import PostCard.js from components into Home page and then create the file. Copy paste from the login page and then select the word "login" from anywhere on the page and hit ctrl+shift+l to change it PostCard.
78. In PostCard.ks you will want to `import { Card, Icon, Label, Image} from 'semantic-ui-react'` at the top of the page.
79. Inside your parenthesis of the function PostCard you are going to want to de structure your post `{post:{ body , createdAt, id, username, likeCount, commentCount, likes}}`
80. Choose a card from  the Semantic UI react site to copy into your return section. If you want to use the image, you will want to drag it up from it's home and put in the search bar -this will give you an http to replace png file with in the src section.
81. replace the card.header name, in our case molly thomas, with `{username}` in order to get it to display the username.
82. in order to formant the iso string to go into the meta data we will need to install moment into the client side of our folder and them import moment from 'moment'. This will allow us to pass `{moment(createdAt).fromNow()}` into our meta data which will tell us how long ago something happened. 
83. In the `<Card.Description>' section we will want to fill the body of the card.
84. If you want to remove the 'ago' from the display we can set fromNow to true as it is auto set to false and this will make it go away. To allow the card to take up more space simply add the word fluid `<Card>` -> `<Card fluid>`
85. In order to to turn the time elapsed (the meta data) into a link to th post itself  ` <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>` -> `      <Card.Meta as= {Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>` and don't forget to import Link from react-router-dom. For the moment it won't lead anywhere -more exciting things to come!!
86. In order to make like and comment buttons -we will need to go to the semantic ui react site again. 

<!-- stopped at 2:52   Did not include notes on building buttons ect.-->
LOG IN AND REGISTER PAGE
Add noValidate to the beginning of the FORM ON Register page because HTML5 by default tries to validate email on forms.
