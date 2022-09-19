# To run the whole application

- run this command: \
  `npm run dev-start`

# To run the server

- install packages by this command \
  `npm install`

- run this command \
  `npm start`

# APIs docs

## login:

- route name: api/login
- body: email, password

## user:

## POST api/user

- route name: api/user
- body: name, email, password, confirm_password, birthdate

### GET api/user

- return all users

### GET api/user/:id

- return user w/ given id
- params: user id

## blog:

### POST api/blog

- header: auth-token

* body: title, body, category

### GET api/blog

- param: userId
- return all blogs
- example: [ \
   {\
   "\_id": "6316194128a4637970a4321a",\
   "author": "ahmed",\
   "authorId": "6316107d831fa86d15c7505c",\
   "title": "mooo is good",\
   "body": "you must do sport",\
   "category": "sport",\
   "comments": [],\
   "createdAt": "2022-09-05T15:44:01.340Z",\
   "updatedAt": "2022-09-05T15:44:01.340Z",\
   "**v": 0\
   },\
   {\
   "\_id": "63161b3228a4637970a43223",\
   "author": "ahmed",\
   "authorId": "6316197d28a4637970a4321e",\
   "title": "mooo is good",\
   "body": "you must do sport",\
   "category": "sport",\
   "comments": [],\
   "createdAt": "2022-09-05T15:52:18.826Z",\
   "updatedAt": "2022-09-05T15:52:18.826Z",\
   "**v": 0\
   }]

### GET api/blog

- param: blogId/:blogId
- return one blog with given id
- example:
  {\
   "\_id": "6316194128a4637970a4321a",\
   "author": "ahmed",\
   "authorId": "6316107d831fa86d15c7505c",\
   "title": "mooo is good",\
   "body": "you must do sport",\
   "category": "sports",\
   "comments": [],\
   "createdAt": "2022-09-05T15:44:01.340Z",\
   "updatedAt": "2022-09-05T15:44:01.340Z",\
   "\*\*v": 0\
   },

### PUT api/blog/:id

- params: blog id
- header: auth-token
- body: title, category, body

### DELETE api/blog/:id

- params: blog id
- header: auth-token

### DELETE api/blog

- header: auth-token
