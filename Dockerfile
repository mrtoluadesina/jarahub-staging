FROM node:12
WORKDIR /app
COPY package.json ./
COPY . ./
RUN yarn
RUN yarn tsc
EXPOSE 3005
CMD ["yarn", "start"]
