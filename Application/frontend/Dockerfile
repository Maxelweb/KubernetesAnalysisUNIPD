FROM node:14-alpine

# set the working directory
WORKDIR /usr/src/Frontend

# Install app dependencies
COPY package*.json ./

COPY . .

RUN npm install
RUN npm run-script build

ADD start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]