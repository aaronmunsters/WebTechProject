# WebTechProject

Mini CMS as a school project

## Functional requirements

```
The ultimate goal of your website is to allowing users to view, search, create, manage and share information.
- view: website.com
- search: overview of website (pages)
- manage: site.com/admin
- share: by publishing it
```

- Users need to register to be able to use your application.
  They should fill in a form and enter details (username, password, email) => afterwards log in and log out

- Each user has a basic profile where they see an overview of their account details.
- User should be able to view, search, create and modify the information (list/grid, search based on title/name/author/genre/date/...)
- Social aspect should be clear in presentation
- Crowd sourcing should be present (commenting, rating, tagging)

- AJAX should be used
- Form validity
- CSS
- HTML5 (at least 3)
- Make use of one Web Service => GRAVATAR
- We should provide one web-service
- Leaflet

---

## How these requirements will be met:

`/admin` provides a tool for the admin to register anyone (**form validity**). They will start at the lowest tier and the admin can change their tier. On the `/admin`-page, once logged in, they can do the following:

- log in and log out
- view basic profile (overview of their account details, last logged in, should be able to update your password!)
- view, search, create and modify the site content (list/grid, search based on title/name/author/genre/date/...)
- comment, rate and tag other pages/components/layouts
- upload pictures with location (**leaflet**)
  <br/><br/>
- AJAX is used when loading a page, all components get loaded dynamically
- HTML5 (at least 3)
- Make use of one Web Service => render photos from different API's
- We should provide one web-service admin can make use of API for other sites

## Documentation - Process highly inspired by [Wix](https://www.wix.com)

Upon installing the software, you should visit `www.website.com/admin` where `website` is your own domain name (or IP-adress).

From here onwards, select a certain template. Choosing `No template` will allow you to create everything from scratch. However this might take longer.

<!-- As this project is just a beginner project, only several templates are available. Luckily these can be easily inserted by other contributors -->
<!-- These might be templates at first, but should become categories when there are many templates in the long run, such as "business" and "blog" -->

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
