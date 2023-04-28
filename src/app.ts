import express from 'express';
import controllers from './controllers';
import config from './config';
import log4js, {Configuration} from 'log4js';
import mongoose, {ConnectOptions} from "mongoose";
import Consul, {ConsulOptions} from 'consul';

const consulServer = new Consul(config.consul.server as ConsulOptions);

const prefix = `config/${config.consul.service.name}`;

type ConsulResult = {
	Value: any,
};

const getConsulValue = async (key: string) => {
	const result: ConsulResult = await consulServer.kv.get(`${prefix}/${key}`);
	return result?.Value;
}

export default async () => {
	let app = express();

	log4js.configure(config.log4js as Configuration);

	// to disable caching of requests returning 304 instead of 200
	app.disable('etag');

	app.use(express.json());

	app.use((req, _, next) => {
		const dateReviver = (_: string, value: any) => {
			if (value && typeof value === 'string') {
				const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
				if (dateRegex.test(value)) {
					return new Date(value);
				}
			}
			return value;
		};

		req.body = JSON.parse(JSON.stringify(req.body), dateReviver);
		next();
	});

	app.use('/', controllers);

	const port = await getConsulValue('port');
	const address = await getConsulValue('address');
	app.listen(port, address, () => {
		log4js.getLogger().info(`Example app listening on port ${address}:${port}`);
	});

	const mongoAddress = await getConsulValue('mongo.address');
	await mongoose.connect(mongoAddress, {
		useNewUrlParser: true,
		socketTimeoutMS: 30000,
	} as ConnectOptions);

	return app;
};
