import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import {
	listGroups as listGroupsApi,
	saveGroup as saveGroupApi,
} from 'src/services/group';

export const listGroups = async (_: Request, res: Response) => {
	try {
		const result = await listGroupsApi();
		res.send(result);
	} catch (err) {
		log4js.getLogger().error('Error in retrieving groups.', err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
};

export const saveGroup = async (req: Request, res: Response) => {
	try {
		const {
			name,
			startYear,
		} = req.body;
		const id = await saveGroupApi({
			name,
			startYear,
		});
		res.status(httpStatus.CREATED).send({
			id,
		});
	} catch (err) {
		log4js.getLogger().error('Error in creating group.', err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
};
