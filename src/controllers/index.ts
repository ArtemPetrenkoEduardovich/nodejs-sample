import express from 'express';
import ping from "./ping";
import health from "./health";

const router = express.Router();

router.get('/health', health);
router.get('/ping', ping);

export default router;
