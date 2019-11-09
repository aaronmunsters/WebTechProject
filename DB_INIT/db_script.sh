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

# Prompt for the password to use later
echo Enter a root password for the database:
read -s pass
# Save the password in local environment
echo DB_PASS = $pass >> ../server_side_package/.env

# Starting the MySql server
sudo systemctl start mysql

# Solves the access denied problem for the mysql database
sudo mysql -u root -e "source authProblem.sql"

# THIS WILL START THE MAIN SQL SETUP, 
# reommended settings: 
#   - password validator             = NO
#   - removing anonymous users       = YES
#   - disallow remote root acces     = YES
#   - removing test database         = YES
#   - reload privileges              = YES
sudo mysql_secure_installation utility

# Initialises the DB with all needed tables
sudo mysql -u root --password=$pass -e "source tableInit.sql"