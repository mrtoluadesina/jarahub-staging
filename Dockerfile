FROM node:12

WORKDIR /app

# ADD package.json /usr/src/app/package.json
COPY package.json .

RUN yarn
RUN yarn build

COPY . .
EXPOSE 3005
CMD ["yarn", "start"]
