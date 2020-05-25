# TS-GraphQL boilerplate / starter kit

#### A GraphQl server based solution made with node js,typescript,graphql,typeORM,jwt,docker,docker-compose,mongodb

## Requirments

- docker 19+
- docker-compose 1.21.0+

## Installation

- clone the projet from the git repository

- under the projet directory execute

```
$ npm install
```

## Running in development enviroment

```
$ docker-compose up --build
```

- Run node js using nodemon ( we use nodemon to watch for file changes and restart the server )

> note that we use the flag -L to be able to restart the server inside the docker container

- Graphql playground interface will be displayed on http://localhost:4000/graphql

- Mongo admin ui will be displayed on http://localhost:8082/

- Add random connection name and put (mongodb://mongodb:27017/myappdb) on connection string section

> We are working on providing a solution for production enviroment so this repo will be updated in the future
