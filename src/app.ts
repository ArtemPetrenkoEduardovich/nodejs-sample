import express from 'express';
import routers from './routers';
import config from './config';
import log4js, { Configuration } from 'log4js';
import mongoose, { ConnectOptions } from 'mongoose';
import Consul, { ConsulOptions } from 'consul';

type EnvType = 'dev' | 'prod';

let env: EnvType = 'prod';
if (String(process.env.NODE_ENV).trim() === 'dev') {
  env = 'dev';
}

const consulServer = new Consul(config.consul.server[env] as ConsulOptions);

const prefix = `config/${config.consul.service.name}`;

type ConsulResult = {
	Value: string | number,
};

const getConsulValue = async (key: string) => {
  const result: ConsulResult = await consulServer.kv.get(`${prefix}/${key}`);
  return result?.Value;
};

export default async () => {
  const app = express();

  log4js.configure(config.log4js as Configuration);

  // to disable caching of requests returning 304 instead of 200
  app.disable('etag');

  app.use(express.json({ limit: '1mb' }));

  app.use((req, _, next) => {
    const dateReviver = (_: string, value: unknown) => {
      if (value && typeof value === 'string') {
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (dateRegex.test(value)) {
          return new Date(value);
        }
      }
      return value;
    };

    req.body = JSON.parse(JSON.stringify(req.body), dateReviver);
    next();
  });

  app.use('/', routers);

  const port = await getConsulValue(`${env}/port`) as number;
  const address = await getConsulValue(`${env}/address`) as string;
  app.listen(port, address, () => {
    log4js.getLogger().info(`Example app listening on port ${address}:${port}`);
  });

  const mongoAddress = await getConsulValue(`${env}/mongo.address`) as string;
  await mongoose.connect(mongoAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
  } as ConnectOptions);

  return app;
};
