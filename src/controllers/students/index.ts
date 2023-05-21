import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import {
	createStudent as createStudentApi,
	getStudent as getStudentApi,
	listStudentsByGroupId as listStudentsByGroupIdApi,
	search as searchApi,
	updateStudent as updateStudentApi,
} from 'src/services/student';
import { StudentQueryDto } from 'src/dto/student/studentQueryDto';

export const getStudent = async (req: Request, res: Response) => {
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
};

export const saveStudent = async (req: Request, res: Response) => {
	try {
		const student = req.body;
		const id = await createStudentApi({
			...student,
		});
		res.status(httpStatus.CREATED).send({
			id,
		});
	} catch (err) {
		log4js.getLogger().error('Error in creating student.', err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
};

export const search = async (req: Request, res: Response) => {
	try {
		const query = new StudentQueryDto(req.body);
		const result = await searchApi(query);
		res.send({
			result,
		});
	} catch (err) {
		log4js.getLogger().error(`Error in searching students.`, err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
};

export const updateStudent = async (req: Request, res: Response) => {
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
};

export const listStudentsByGroupId = async (req: Request, res: Response) => {
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
};
