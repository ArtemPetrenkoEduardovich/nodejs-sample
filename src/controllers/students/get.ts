import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { getStudent as getStudentApi } from 'src/services/student'

const getStudent = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const result = await getStudentApi(id);
		if (!result) {
			res.status(httpStatus.NOT_FOUND).send();
		} else {
			res.send({
				result,
			});
		}
	} catch (err) {
		log4js.getLogger().error(`Error in retrieving student with id ${id}.`, err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
}

export default getStudent;
