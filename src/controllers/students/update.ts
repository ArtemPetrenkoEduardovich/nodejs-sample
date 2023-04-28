import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { updateStudent as updateStudentApi } from 'src/services/student'

const updateStudent = async (req: Request, res: Response) => {
	const student = req.body;
	const id = req.params.id;
	try {
		await updateStudentApi(id, student);
		res.send();
	} catch (err) {
		log4js.getLogger().error(`Error in updating student with id ${id}.`, err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
}

export default updateStudent;
