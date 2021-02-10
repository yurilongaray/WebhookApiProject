## Infos
https://www.udemy.com/course/construindo-um-backend-escalavel-com-nestjs-aws-e-pivotalws
https://medium.com/swlh/guide-to-nest-js-rabbitmq-microservices-e1e8655d2853

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## RabbitMQ Docker

docker run -d --hostname rabbit-project --name rabbit-project -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -e RABBITMQ_NODENAME=rabbit@rabbit-project -p 15672:15672 -p 5672:5672 rabbitmq:3-management

## MongoDB Docker

You can see (or change) configurations by going at: 'consumer/src/connections/mongo.connection.ts'

https://hub.docker.com/_/mongo

## Installation

- You can run these commands into folders: consumer/ and publiser/:
```bash
$ npm install
```

## Running the apps

- You can run these commands into folders: consumer/ and publiser/:

```bash
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running a Http Test

Start mongo and rabbitmq service;
Goes to: http://localhost:3000/test into your chrome.

These acceess will will call for publisher/app.controller -> sendTest
This sendTest method will create a RabbitMQ Event.
The consumer will receive the RabbitMQ Event and send a request to a third party system.


## Test Command

- You can run these commands into folders: consumer/ and publiser/:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## ToDo
- Implement unit and integrated tests for both consumer and publisher