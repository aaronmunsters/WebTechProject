FROM mysql

# Environment variables
ENV MYSQL_DATABASE=WoxDB \
    MYSQL_ROOT_PASSWORD=test

ADD tableInit.sql /docker-entrypoint-initdb.d

EXPOSE 3307