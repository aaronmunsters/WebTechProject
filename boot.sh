#!/bin/bash

## This is a simple script that boots the application, both the MySQL database and de node express server
##
## DONT FORGET TO GIVE THE SCRIPT EXECUTING RIGHTS:
#
# $ chmod +x boot.sh


## Stop containers and removes containers, networks, volumes, and images created by `up`
docker system prune -f
docker-compose down --rmi local

docker-compose build
docker-compose up