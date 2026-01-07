import express from "express";
import {resisterUser, loginUser} from '../controllers/auth.js';

const router = express.Router();


// POST /auth/
router.post('/', resisterUser);

// POST /auth/login
router.post('/login', loginUser)

export default router;