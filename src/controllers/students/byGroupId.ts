import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import {
	listStudentsByGroupId as listStudentsByGroupIdApi,
} from 'src/services/student'

const listStudentsByGroupId = async (req: Request, res: Response) => {
	const groupId = req.params.groupId;
	try {
		const result = await listStudentsByGroupIdApi(groupId);
		res.send({
			result,
		});
	} catch (err) {
		log4js.getLogger().error(`Error in retrieving student by group id ${groupId}.`, err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
}

export default listStudentsByGroupId;
