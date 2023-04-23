import log4js from 'log4js';
import httpStatus from 'http-status';
import { createGroup as createGroupApi } from '../../services/group'

const saveGroup = async (req, res) => {
	try {
		const {
			name,
			startYear,
		} = req.body;
		const result = await createGroupApi({
			name,
			startYear,
		});
		res.send({
			status: httpStatus.OK,
			result,
		});
	} catch (err) {
		log4js.getLogger()
			.error('Error in getting category.', err);
		res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
			message: err.statusText || err.message,
		});
	}
}

export default saveGroup;
