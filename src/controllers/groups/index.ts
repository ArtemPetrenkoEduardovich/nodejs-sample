import log4js from 'log4js';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import {
  listGroups as listGroupsApi,
  saveGroup as saveGroupApi,
} from 'src/services/group';
import { GroupSaveDto } from 'src/dto/group/groupSaveDto';
import { InternalError } from 'src/system/internalError';

export const listGroups = async (_: Request, res: Response) => {
  try {
    const result = await listGroupsApi();
    res.send(result);
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in retrieving groups.', err);
    res.status(status).send({ message });
  }
};

export const saveGroup = async (req: Request, res: Response) => {
  try {
    const {
      name,
      startYear,
    } = new GroupSaveDto(req.body);
    const id = await saveGroupApi({
      name,
      startYear,
    });
    res.status(httpStatus.CREATED).send({
      id,
    });
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in creating group.', err);
    res.status(status).send({ message });
  }
};
