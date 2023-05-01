import { OK } from 'http-status';
import { Request, Response } from 'express';

/**
 * Ping endpoint used to check if the service can be reached.
 *
 * @param _ The request
 * @param  {Object} res The response
 */
async function ping(_: Request, res: Response) {
  res.status(OK).send('PONG');
}

export default ping;
