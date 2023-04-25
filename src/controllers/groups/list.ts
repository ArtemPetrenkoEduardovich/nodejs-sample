import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { listGroups as listGroupsApi } from 'src/services/group'

const listGroups = async (_: Request, res: Response) => {
	try {
		const result = await listGroupsApi();
		res.send(result);
	} catch (err) {
		log4js.getLogger().error('Error in retrieving groups.', err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
}

export default listGroups;
