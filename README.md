# WebTechProject
Mini CMS as a school project


## Functional requirements
- User login
- Tokens per user (to gain acces to subdomain per user)
- Admin can edit site
  - Add pictures
  - Edit site elements; pictures, posts, ...
  - User rights
  
Standard pages: posts, pictures
Quality: should be easily expandable

## Documentation - Process highly inspired by [Wix](https://www.wix.com)
Upon installing the software, you should visit ```www.website.com/admin``` where ```website``` is your own domain name (or IP-adress).

From here onwards, select a certain template. Choosing ```No template``` will allow you to create everything from scratch. However this might take longer.

<!-- As this project is just a beginner project, only several templates are available. Luckily these can be easily inserted by other contributors -->
<!-- These might be templates at first, but should become categories when there are many templates in the long run, such as "business" and "blog" -->


## Manual
This project uses docker and docker-compose. 
It consists of two docker containers, one containing the node server and one containing the mysql database. 
A connection will be established between these two containers, also the actual data the mysql container stores will be saved on the host such that the database is persistent. 

Installation steps:

- install docker: 
    - ubuntu:  https://docs.docker.com/install/linux/docker-ce/ubuntu/
    - windows: https://docs.docker.com/docker-for-windows/install/

- install docker-compose: https://docs.docker.com/compose/install/


Running:

    - ubuntu: 
        ```
        docker-compose up -d
        ```

    - windows:
        ```
        docker-compose up -d
        ```

