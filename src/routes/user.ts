import express from "express";
import { getUser, updateUser} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/isAuth.js'

const router = express.Router();



// User shoud be authenticate 
// User should be authorized
//get /user/:userId
router.get('/:userId', isAuthenticated, getUser);


// User shoud be authenticate 
// User should be authorized
//PUT /user/
router.put('/', updateUser);

export default router;