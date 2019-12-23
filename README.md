# WebTechProject

## Manual

This package uses docker and docker-compose.
It consists of two docker containers, one containing the node server and one containing the mysql database.
A connection will be established between these two containers, also the actual data the mysql container stores will be saved on the host such that the database is persistent.

Installation steps:

- install docker:

  - ubuntu: https://docs.docker.com/install/linux/docker-ce/ubuntu/
  - windows: https://docs.docker.com/docker-for-windows/install/

- install docker-compose: https://docs.docker.com/compose/install/

Running:

    - ubuntu:
        ```
        docker-compose up --build
        ```

    - windows:
        ```
        docker-compose up --build
        ```
