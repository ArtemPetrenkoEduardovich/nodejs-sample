# nodejs-sample
This is an example node js project using typescript, consul, express, mongoose, mocha.

# How to run "for the prod"

Just execute `docker-compose up`

It will run all services in containers (nodejs-sample, db and consul).
Once consul is running, all key-values will be added automatically.
Once consul and db are running, nodejs-sample will be started.

After that you can check the service by calling
GET: `http://localhost:8888/ping`
response will be `PONG`

All consul kv's and mongoDB data will be stored in docker/data/...
Thus, when the containers are restarted, data will not be lost.

# Configuration

If for some reason consul kv's were not added, and you need to add it manually:

Open consul ui (by default `localhost:8501`)
Add to consul these key-values:

for "prod" version

`config/nodejs-sample/prod/address` : `0.0.0.0`

`config/nodejs-sample/prod/port` : `8888`

`config/nodejs-sample/prod/mongo.address` : `mongodb://db:27017`


for "dev" version

`config/nodejs-sample/dev/address` : `localhost`

`config/nodejs-sample/dev/port` : `8888`

`config/nodejs-sample/dev/mongo.address` : `mongodb://127.0.0.1:27018`


run nodejs-sample again

# Setup
Run `npm install` in the terminal

# How to run for the prod

When consul and mongoDB containers are running
```
npm run start
```

If everything is fine, you will see:
"Example app listening on port localhost:8888"

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
