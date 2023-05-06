# Nest API 

This backend application was built using Node.js and NestJS as main framework.
I chose to use this tool because it provides an easy integrations with packages for validating and transform data, besides provide an schema for well organized code, and many advantages

## Description

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

### Using docker
If you have docker installed, you can easily run this application
```bash
$ docker-compose up -d
```
This will create two containers, one for the database and the other will be the application itself.

It also creates a volume to persist data, the API will be listening on port 8090 (if this creates a conflict locally, you can modify docker-compose.yml file and .env.developmet)

## Notes

- .eslintrc.js and .prettierrc file contents are commented
- The file .env.development is provided in the repository