# NestJS Demo Project

## Considerations
In this demonstration project of NestJS I decided to use MongoDB as a database, because in the project scenario it was the best solution.

The project is basically to manage cargo delivery quotes. We store sender, recipient and cargo data. But since there is a precept that the cargo data varies depending on the type of transport chosen, MongoDB makes more sense in this scenario.

Implemented data validation (With DTOs and Class Validator), used Mongoose as ORM, and Swagger to document the API. NestJS is the base framework of the project, in addition to Cypress to perform the API tests. There is Docker-Compose to facilitate local application development. There is also a Web GUI for accessing MongoDB and querying the data structure.

There is a file in the "json" folder that contains a payload expected by the endpoint that persists the data (```POST /shipment```).

## Running
To run with Docker Compose, use this command:

```docker-compose up -d```

## Acessing

Local address will be:

```http://localhost:3000```

## Services

Acess the local [Swagger API Documentation](http://localhost:3000/api).

Acess the local [MongoDB Explorer](http://localhost:8081)

## Tests

To run the API testing, use this command:

```npm i && npm run test```

## Stack
[NodeJS](https://nodejs.org/)

[Typescript](https://www.typescriptlang.org/)

[NestJS](https://nestjs.com/)

[Cypress](https://www.cypress.io/)

[MongoDB](https://www.mongodb.com)