import express from "express";
import { resisterUser, getUser } from '../controllers/user.js';
const router = express.Router();
// POST /user/
router.post('/', resisterUser);
//get /user/:userId
router.get('/:userId', getUser);
export default router;
//# sourceMappingURL=user.js.map