import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { search as searchApi } from 'src/services/student';
import { StudentQueryDto } from 'src/dto/student/studentQueryDto';

const search = async (req: Request, res: Response) => {
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

export default search;
