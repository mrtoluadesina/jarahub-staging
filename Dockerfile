FROM node:12

WORKDIR /app

# ADD package.json /usr/src/app/package.json
COPY package.json .

RUN ls -a

RUN yarn
RUN yarn build

COPY . .
EXPOSE 27017
CMD ["yarn", "start"]
