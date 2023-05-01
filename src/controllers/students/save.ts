import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createStudent as createStudentApi } from 'src/services/student';

const saveStudent = async (req: Request, res: Response) => {
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

export default saveStudent;
