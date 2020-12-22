FROM node:12
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3005
CMD ["yarn", "start"]
