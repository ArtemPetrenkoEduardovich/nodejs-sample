import express from 'express';
import saveStudent from './save';
import getStudent from './get';
import updateStudent from './update';
import byGroupId from './byGroupId';
import search from './search';

const router = express.Router();

router.get('/:id', getStudent);
router.post('', saveStudent);
router.put('/:id', updateStudent);
router.get('/byGroupId/:groupId', byGroupId);
router.post('/_search', search);

export default router;
