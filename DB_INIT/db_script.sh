#!/bin/bash
####################################
#
# Initialisation of WoxDB 
#
####################################

## GIVE EXECUTE RIGHTS TO SCRIPT:
#$ chmod +x /path/to/yourscript.sh

## RUN SCRIPT:
#$ sudo ./db_script.sh

# Install mysql
sudo apt-get update
sudo apt-get install mysql-server

# MySql setup
sudo mysql_secure_installation utility

# Starting the MySql server
sudo systemctl start mysql

# Solves the access denied problem for the mysql database
sudo mysql -u root --password=acklw -e "source authProblem.sql"

# Initialises the DB with all needed tables
sudo mysql -u root --password=acklw -e "source tableInit.sql"



