FROM node:14-alpine

# set the working directory
WORKDIR /usr/src/Backend

# Install app dependencies
COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "node", "index.js" ]
