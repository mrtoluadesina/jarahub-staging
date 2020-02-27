FROM node:12

WORKDIR /app

# ADD package.json /usr/src/app/package.json
COPY package.json .

RUN yarn

COPY . .
EXPOSE 27017
CMD ["yarn", "start:dev"]