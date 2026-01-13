import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.js';
import {getReport} from '../controllers/report.js';

const router = express.Router();

// GET /report/reportId
router.get('/:reportId', isAuthenticated, getReport);

// for getting all report 
// GET /report/
router.get('/', isAuthenticated, getReport);


export default router;