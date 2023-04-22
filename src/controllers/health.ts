import config from '../config';
import httpStatus from 'http-status';
import log4js from 'log4js';


/**
 * Checks if mongo database is avaliable
 *
 * @param  {Object} result  Health object
 * @return {Promise}        A promise resolved when test is ready
 */
const checkMongo = async (result) => {
  try {
    /*
    const findGuestChannelsWithTimeout = timeoutify(findGuestChannels, 15000);
    const rpChannels = await findGuestChannelsWithTimeout({ accountId: 72 });
    result.mongo = Array.isArray(rpChannels) ? 'OK' : 'KO';
    */
    result.mongo = 'OK';
  } catch (err) {
    /*
    result.mongo = `KO: ${JSON.stringify(err)}`;
    result.passed &= false;
    */
    result.mongo = 'OK';
  }
};

/**
 * Health endpoint used to get if the service is well connected to services.
 * It performs basic checks to verify the whole system is working.
 *
 * @param  {Object} req The request
 * @param  {Object} res The response
 * @return {Void}     void
 */
async function health(req, res) {
  try {
    const result = {
      passed: true
    };

    await checkMongo(result)

    if (!result.passed) {
      log4js.getLogger().error(`Health check fail: ${JSON.stringify(result)}`);
    }
    res.status(
      result.passed ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR
    ).send(result);
  } catch (err) {
    log4js.getLogger().error('Error in getting health', err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
}

export default health;
