import { OK } from 'http-status';

/**
 * Ping endpoint used to check if the service can be reached.
 *
 * @param  {Object} req The request
 * @param  {Object} res The response
 * @return {Void}     void
 */
async function ping(req, res) {
	res.status(OK).send('PONG');
}

export default ping;
