import express from 'express';
import saveGroup from './save';
import listGroups from './list';

const router = express.Router();

router.get('', listGroups);
router.post('', saveGroup);

export default router;
