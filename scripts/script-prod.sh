#!/bin/bash 
#run containers in detached mode for production 
#Note: mongodb image will run automatically since app depends on mongodb
docker-compose up -d  --build app