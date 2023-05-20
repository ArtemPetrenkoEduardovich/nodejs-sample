# nodejs-sample
This is an example node js project using typescript, consul, express, mongoose, mocha

# Configuration

Create a network for consul, mongoDB and nodejs-sample services:
`docker network create app-network`

Run `docker-compose up` in order to create containers for consul, mongoDB and nodejs-sample
// todo try to add kv automatically
The first time nodejs-sample will crash, you need to add k/v to consul:
Open consul ui (by default `localhost:8501`)
Add to consul these key-values:

`config/nodejs-sample/address` : `0.0.0.0`

`config/nodejs-sample/port` : `8888`

`config/nodejs-sample/mongo.address` : `mongodb://db:27017`

run nodejs-sample again

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
