# GaraHub

[![CircleCI](https://circleci.com/gh/bondz/node-express-react-ts.svg?style=svg)](https://circleci.com/gh/bondz/node-express-react-ts)

Run the server with

```bash
yarn

#Start with nodemon
yarn start:dev

#Start without nodemon
yarn start

```

---

Then run the client

```bash
cd client
yarn

#build and start client
yarn start:dev
```

---

---

Docker

```bash

#run compose
docker-compose up

#stop compose
docker-compose stop

```

---

The server part of this system is already designed and exposes a set of REST endpoints via the `/api` route and a GraphQL endpoint.

The client has been setup to consumes with graphql.
