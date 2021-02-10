## Infos
https://www.udemy.com/course/construindo-um-backend-escalavel-com-nestjs-aws-e-pivotalws
https://medium.com/swlh/guide-to-nest-js-rabbitmq-microservices-e1e8655d2853

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## RabbitMQ Docker

docker run -d --hostname rabbit-project --name rabbit-project -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -e RABBITMQ_NODENAME=rabbit@rabbit-project -p 15672:15672 -p 5672:5672 rabbitmq:3-management

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
