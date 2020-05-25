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
$ bash /scripts/script-dev.sh
```

- Run node js using nodemon ( we use nodemon to watch for file changes and restart the server )

> note that we use the flag -L to be able to restart the server inside the docker container

- Graphql playground interface will be displayed on http://localhost:4000/graphql<br/>

![Test Image 7](https://github.com/medaymenTN/ts-graphql-boilerplate/blob/master/docs/gql-playground.PNG)<br/>

- Mongo admin ui will be displayed on http://localhost:8082/

- Add random connection name and put (mongodb://mongodb/myappdb) on connection string section</br>

![Test Image 7](https://github.com/medaymenTN/ts-graphql-boilerplate/blob/master/docs/admin-mongo.PNG)<br/>

## Running in production enviroment

```
$ bash /scripts/script-prod.sh
```

- triggering multistage build on docker container and running the project on production mode

* Graphql playground interface will be displayed on http://localhost:4000/graphql
