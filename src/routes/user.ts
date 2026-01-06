import express from "express";
import {resisterUser, getUser, updateUser, loginUser} from '../controllers/user.js';

const router = express.Router();

// POST /user/
router.post('/', resisterUser);

router.post('/login', loginUser)

//get /user/:userId
router.get('/:userId', getUser);

//PUT /user/
router.put('/', updateUser);

export default router;