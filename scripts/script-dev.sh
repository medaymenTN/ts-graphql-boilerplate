#!/bin/bash

#Running in development env require installing nodemodules on volumes 
#We only run the services graphql-dev and mongo (mongo will run automatically since graphql-dev depends on it)

docker-compose run --rm graphql-dev npm install && docker-compose up --build graphql-dev admin-mongo