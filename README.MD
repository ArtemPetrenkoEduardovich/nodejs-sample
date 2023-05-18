# nodejs-sample
This is an example node js project using typescript, consul, express, mongoose, mocha

# Configuration

Run `docker-compose up` in order to create the container with consul and mongoDB

Open consul ui (by default `localhost:8501`)

Add to consul these key-values:

`config/nodejs-sample/address` : `localhost`

`config/nodejs-sample/port` : `8888`

`config/nodejs-sample/mongo.address` : `mongodb://127.0.0.1:27018`

# Setup
Run `npm install` in the terminal

# How to run

When your consul and mongoDB containers are running
```
npm run start
```

If everything is fine, you will see:
"Example app listening on port localhost:8888"

You can check the service by calling
GET: `http://localhost:8888/ping`
response will be `PONG`

# How to develop

```
npm run devel
```

# How to build

```
npm run build
```

# How to run tests

```
npm run test
```

If everything is fine, you should see the list of passed tests

# How to check coverage

```
npm run coverage
```
If everything is fine, you should see the table with coverage after passed tests
