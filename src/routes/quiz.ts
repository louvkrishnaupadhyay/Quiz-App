import express from "express";
import {createQuiz,updateQuiz,deleteQuiz,publishQuiz,getQuiz} from "../controllers/quiz.js"
import { isAuthenticated } from '../middlewares/isAuth.js'


const router = express.Router();

//create
// POST /quiz/
router.post("/", isAuthenticated, createQuiz)

//get
// GET /quiz/:Id
router.get("/:quizId", isAuthenticated, getQuiz)

//update
// PUT /quiz
router.put("/", isAuthenticated, updateQuiz)

//delete
// DELETE /quiz/:quizId
router.delete("/:quizId", isAuthenticated, deleteQuiz)


//publish
// PATCH /quiz/:quizId
router.patch("/publish", isAuthenticated, publishQuiz)


export default router;