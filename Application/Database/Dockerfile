FROM postgres:13-alpine

ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /seeds/ /docker-entrypoint-initdb.d/seeds/
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/

CMD ["postgres", "-c", "max_connections=500", "-c", "shared_buffers=256MB"]