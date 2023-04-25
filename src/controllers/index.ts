import express from 'express';
import ping from "./ping";
import groups from './groups';

const router = express.Router();

router.get('/ping', ping);

router.use('/groups', groups);

export default router;
