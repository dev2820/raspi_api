FROM node:latest
LABEL name="dev2820"

# /app directory create
RUN mkdir -p /app

# set current work directory as /app
WORKDIR /app

# add current files in /app
ADD ./ /app

# node package download
RUN npm install

CMD npm start


