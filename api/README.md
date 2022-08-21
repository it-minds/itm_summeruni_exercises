<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p> -->

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h1 align="center">🎓🎓🎓 Summer University 2022 🎓🎓🎓</p>

## Description

Summer University 2022 Twutter API!

## Installation

```bash
# install node dependencies
$ npm install
# setup the local environment variables based on the provided example.
$ cp .env.local.example .env.local
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Graphql Playground

http://localhost:8080/graphql

### Swagger

http://localhost:8080/swagger

### Authentication

This API has authentication implemented.
Use an existing user or create one with either `POST /authors` or `createAuthor(data: {username: "MYNAME", password: "MYPASS"})`
Then signin by getting a token with `POST /auth/login` or `login(loginData: {username: "MYNAME", password: "MYPASS"})`
And set the http header `"authorization": "Bearer eyJhb..."`
