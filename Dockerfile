FROM node

MAINTAINER kevtss/coach-marketplace.api

WORKDIR /usr/app/

COPY . /usr/app/

RUN npm install

EXPOSE 5555
