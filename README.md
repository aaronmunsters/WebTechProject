# WebTechProject

## Manual

This package uses docker and docker-compose to run a web service.
It consists of two docker containers, one containing an express server and one containing a mysql database.
A connection will be established between these two containers, also the actual data the mysql container stores will be saved on the host such that the database is persistent.

### Installation steps:

- unzip the package

- install docker:

  - ubuntu: https://docs.docker.com/install/linux/docker-ce/ubuntu/
  - windows: https://docs.docker.com/docker-for-windows/install/

- install docker-compose: https://docs.docker.com/compose/install/

### Running:

First open a terminal and navigate to the package folder.
Then call following command:

* ubuntu:
        ```
        docker-compose up --build
        ```

* windows:
        ```
        docker-compose up --build
        ```

The ```
    --build
      ``` parameter is only required when booting the package for the first time.
When taking the server down and booting it again later, this parameter can be omitted.
If a permission error occurs try running the script with administrator privileges.

