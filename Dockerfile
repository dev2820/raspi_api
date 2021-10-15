FROM node:latest
MAINTAINER gi jo Yang second28200@naver.com

# /app directory create
RUN mkdir -p /app

# set current work directory as /app
WORKDIR /app

# add current files in /app
ADD ./ /app

# node package download
RUN npm install

CMD npm start


