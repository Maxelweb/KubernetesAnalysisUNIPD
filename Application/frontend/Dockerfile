FROM node:14-alpine

# set the working directory
WORKDIR /usr/src/Frontend

# Install app dependencies
COPY package*.json ./

COPY . .

RUN npm install

CMD [ "npm", "start" ]