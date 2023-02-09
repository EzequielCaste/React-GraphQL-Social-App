# React GraphQL - Social Media App

Build a Social Media App to learn **GraphQL** following the classes of [Ahmed Hadjou](https://github.com/hidjou)'s Youtube channel [Classed](https://www.youtube.com/playlist?list=PLMhAeHCz8S3_pgb-j51QnCEhXNj5oyl8n)

## Description

Basically a social media app clone where users can register, login, create posts, like posts, and comment on them.

## Features

I'm going to add the following features to improve on the base project:
- [X] Allow user to edit their post
- [X] Responsive layout for Mobile and Tablet
- [X] Light/Dark Theme Selector
- [X] User Profile
- [X] Admin privileges, delete posts and comments



### Deployed to Netlify

[Visit the app](https://ezecaste-social-app.netlify.app/)

### Installing

```
git clone git@github.com:EzequielCaste/React-GraphQL-Social-App.git
cd React-GraphQL-Social-App/server
npm install

Open a new terminal in React-GraphQL-Social-App/client
npm install
```

### Start the server
```
cd React-GraphQL-Social-App/server
node index.js
```

### Strart the Client
```
cd React-GraphQL-Social-App/client
npm run dev
```
### Libraries
- Client:
  - [Vite](https://vitejs.dev/)
  - [Apollo Client](https://www.apollographql.com/docs/react/)
  - [GraphQL](https://graphql.org/learn/)
  - [React Router DOM v6](https://reactrouter.com/en/main)
  - [JWT Decode](https://www.npmjs.com/package/jwt-decode)
  - [Moment.js](https://momentjs.com/docs/)
  - [Semantic UI](https://semantic-ui.com/introduction/getting-started.html)
- Server: 
  - [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started)
  - [GraphQL](https://graphql.org/learn/)
  - [Mongoose](https://mongoosejs.com/docs/guide.html)
  - [JSON Web Token](https://jwt.io/introduction)
  - [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
  
### Deployment
- Client deployed to [Netlify](https://ezecaste-social-app.netlify.app/)
- Server deployed to Fly.io
