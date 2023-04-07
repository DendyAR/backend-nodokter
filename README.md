## kurangguru-backend
This is a ExpressJs-based API for [frontend project](https://github.com/MemorableTeam/kurangguru-frontend.git). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/MemorableTeam/kurangguru-backend.git`
* `cd kurangguru-backend`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js` to start the local server

## Folder Structure

    ├── controllers                    
    │   ├── auth.js              
    │   ├── ProductController.js              
    │   ├── ReviewProduct.js             
    |   └── UserController.js
    ├── Config
    |   └── verifyToken.js
    ├── Middleware
    |   └── AuthUser.js
    ├── models
    │   ├── ProductModel.js              
    │   ├── ReviewProduct.js              
    |   └── UserModel.js
    ├── routes
    │   ├── AuthRoutes.js                     
    │   ├── ProductRoute.js
    |   ├── ReviewProduct.js
    |   └── UserRoute.js
    └── app.js
    
## Endpoints
auth endpoint

    POST      /me
    POST      /login
    POST      /logout

Product endpoint

    GET      /products
    GET      /products/:id
    POST     /products
    PATCH    /Products/:id
    DELETE   /products/:id
    
Review endpoint

    GET       /products/review/:id
    POST      /products/review/:id
    PATCH     /products/review/:id
    DELETE    /products/review/:id
    
topics endpoint

    GET      /topics
    POST     /topics
    PATCH    /topics
    DEL      /topics
    
user endpoint

    GET      /users
    GET      /users/:id
    POST     /users
    PATCH    /users/:id
    DELETE   /users/:id
    
when put under a domain with `prefix`, it would look like:
