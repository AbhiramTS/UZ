

FROM node:lts-jessie

RUN apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y curl nano \
    && apt-get install -y nginx \
    && apt-get install build-essential

RUN npm install -g @angular/cli \
&& npm install -g truffle

RUN mkdir -p /usr/share/workdir/UI/src \
    && mkdir -p /usr/share/workdir/UI/truffle


WORKDIR /usr/share/workdir/UI

COPY ./e2e .
COPY ./angular.json .
COPY ./nginx.conf .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./patch.js .
COPY ./truffle ./truffle

RUN ls \
    && npm install

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 4200 
