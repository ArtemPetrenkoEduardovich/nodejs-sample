import express from "express";
import saveGroup from "./save";

const router = express.Router();

router.post('', saveGroup);

export default router;
