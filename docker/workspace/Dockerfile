FROM phusion/baseimage:0.9.19

RUN apt-get update && \
    apt-get install -y npm \
        mysql-client \
        sqlite3 \
        iputils-ping && \
    npm install -g n

##
## Timezone
##

ARG TZ=UTC
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

##
## Node
##

ARG NODE_VERSION=latest

# Install the specified NODE_VERSION or grab latest
RUN n "$NODE_VERSION"

##
## Cron
##

COPY ./crontab /var/spool/cron/crontabs

WORKDIR /home/www-app


ENTRYPOINT sleep infinity