import express from 'express';
import { testing } from '../controllers/testing.controller.js';

const router = express.Router();

router.get('/', testing);
export default router;

