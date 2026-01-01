import express from "express";
import { resisterUser, getUser, updateUser } from '../controllers/user.js';
const router = express.Router();
// POST /user/
router.post('/', resisterUser);
//get /user/:userId
router.get('/:userId', getUser);
//PUT /user/
router.put('/', updateUser);
export default router;
//# sourceMappingURL=user.js.map