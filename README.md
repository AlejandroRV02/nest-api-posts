# Nest API 

This backend application was built using Node.js and NestJS as main framework.
I chose to use this tool because it provides an easy integrations with packages for validating and transform data, besides provide an schema for well organized code, and many advantages

## Description

This application was created *trying* to follow a clean architecture approach.


This API has three main entities:
- Users
- Posts
- Comments

### Relations

- Users 1 - N Posts
- Posts 1 - N Comments


## How to run this application
- Clone this repository on your local computer
- To have a *.env.development* file (included in this repo) - (Only file able to run the application)

### First time running the application

The first time the app is ran, it seeds the database.
- Creates 10 random user following the structure { email: 'user1@mail.com', password: 'password'} (user2@mail.com, user3@mail.com) (All 10 users have the same password = "password")
- Fetches posts from https://jsonplaceholder.typicode.com/posts and store them in database
- Fetches commets from https://jsonplaceholder.typicode.com/comments and store them in database

### Using docker
If you have docker installed, you can easily run this application
```bash
$ docker-compose up -d
```
This will create two containers, one for the database and the other will be the application itself.

It also creates a volume to persist data, the API will be listening on port 8090 and database will use port 5432 (if this creates a conflict locally, you can modify docker-compose.yml file and .env.developmet)

## Docs and endpoints

Once you have the application runnning you can go to /api/docs
You will see a Swagger Document where you can test the endpoints

## How to build the application
This command will run:
- Unit test 
- Integration test
- Build the application

```bash
$ npm run build
```

## Notes

- .eslintrc.js and .prettierrc file contents are commented
- The file .env.development is provided in the repository

## Important

- I only wrote tests for authentication
- The integration test (auth) passes all test the first time, then it doesnt because of duplicated email (signup)
- Important to have Node.js and Docker installed