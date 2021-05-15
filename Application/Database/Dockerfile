FROM postgres:13-alpine

ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /seeds/ /docker-entrypoint-initdb.d/seeds/
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/


COPY postgresql.conf      /tmp/postgresql.conf
COPY updateConfig.sh      /docker-entrypoint-initdb.d/_updateConfig.sh
