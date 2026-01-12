import express from 'express';
import { isAuthenticated } from "../middlewares/isAuth.js";

import { startExam, submitExam } from "../controllers/exam.js"; 

const router = express.Router();

// GET /exam/quizId
router.get('/:quizId', isAuthenticated, startExam);

// POST /exam/
router.post('/', isAuthenticated, submitExam);

export default router;