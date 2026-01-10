import express from "express";
import { resisterUser, loginUser, isUserExist } from "../controllers/auth.js";
import { body } from "express-validator";
import projectError from "../helper/error.js";

const router = express.Router();

// POST /auth/
router.post(
  "/",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Please enter the valid name , minimum 4 character"),
    body("email")
      .trim()
      .isEmail()
      .custom((emailId) => {
        return isUserExist(emailId)
          .then((status) => {
            if(status){
                return Promise.reject("user already exist");
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      })

      .normalizeEmail(),
      body('password')
      .trim()
      .isLength({min:8})
      .withMessage("Please enter the valid name , minimum 4 character"),
      body('confirm_password')
      .trim()
      .custom((value, {req}) =>{
        if(value != req.body.password){
          return Promise.reject("Password mismatch!");
        }
      })
  ],
  resisterUser
);

// POST /auth/login
router.post("/login", loginUser);

export default router;
