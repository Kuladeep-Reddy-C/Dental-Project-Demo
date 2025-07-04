import express from 'express';
import { roles, setRole } from '../controllers/roles.controller.js';

const router = express.Router();

router.get('/', roles);
router.post('/', setRole);
export default router;