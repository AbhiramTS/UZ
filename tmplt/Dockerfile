
FROM node:lts-jessie

RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y curl nano

RUN mkdir -p /usr/share/workdir/tmplt

WORKDIR /usr/share/workdir/tmplt

COPY app.js .
COPY package.json .
COPY preview.js .
COPY templating.js .

RUN npm install

EXPOSE 3000
