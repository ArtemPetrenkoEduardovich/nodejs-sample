import express from 'express';
import ping from "./ping";
import health from "./health";
import group from './group';

const router = express.Router();

router.get('/health', health);
router.get('/ping', ping);

router.use('/group', group);

export default router;
