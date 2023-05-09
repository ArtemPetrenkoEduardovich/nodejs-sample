# nodejs-sample
This is an example node js project using typescript, consul, express, mongoose, mocha

# Configuration

Add to consul these key-values:

`config/nodejs-sample/address` : `localhost`

`config/nodejs-sample/port` : `8888`

`config/nodejs-sample/mongo.address` : `mongodb://127.0.0.1:27017`

# Setup
Run `npm install` in the terminal

# How to run

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
