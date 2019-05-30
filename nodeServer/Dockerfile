FROM node:lts-jessie

RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y curl nano

RUN mkdir -p /usr/share/workdir/dbNodeserver

WORKDIR /usr/share/workdir/dbNodeserver

COPY ./config ./config
COPY ./models ./models
COPY ./routes ./routes
COPY ./app.js ./app.js
COPY ./package.json .

RUN npm install

RUN (ls && pwd && cd ./config && ls)

EXPOSE 4000