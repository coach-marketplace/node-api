FROM node

MAINTAINER kevtss/coach-marketplace.api

WORKDIR /usr/app/

COPY package.json /usr/app/

RUN npm install

COPY . /usr/app/

EXPOSE 5555

CMD ['npm', 'run', 'start:local']