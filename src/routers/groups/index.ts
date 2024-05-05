import express from 'express';
import {
  listGroups,
  saveGroup,
} from 'src/controllers/groups';

const router = express.Router();

router.get('', listGroups);
router.post('', saveGroup);

export default router;
