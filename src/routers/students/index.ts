import express from 'express';
import {
  getStudent,
  saveStudent,
  updateStudent,
  listStudentsByGroupId,
  search,
} from 'src/controllers/students';

const router = express.Router();

router.get('/:id', getStudent);
router.post('', saveStudent);
router.put('/:id', updateStudent);
router.get('/byGroupId/:groupId', listStudentsByGroupId);
router.post('/_search', search);

export default router;
