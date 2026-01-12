import type { Request, Response, NextFunction } from "express";
import Quiz from "../models/quiz.js";
import projectError from "../helper/error.js";
import Result from "../models/result.js";

interface returnResponse {
  status: "success" | "error";
  message: String;
  data: {} | [];
}

const startExam = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId, {name:1, questions_list:1, is_published:1});

        if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

        if(!quiz.is_published){
            const err = new projectError("Qize not published");
            err.statusCode = 405;
            throw err;
        }
        const resp:returnResponse = {status:"success", message:"Quiz", data:{quiz}};
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }

}

const submitExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attempted_question = req.body.attempted_question;
    const quizId = req.body.quizId;

    const quiz = await Quiz.findById(quizId, { answers: 1 });
    if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

    const answers = quiz.answers;
    const userId = req.userId;
    const allQuestions = Object.keys(answers);
    const total = allQuestions.length;

    let score = 0;

    for (const question_number of allQuestions) {
      if (!!attempted_question[question_number] && answers[question_number] === attempted_question[question_number]) {
        score++;
      }
    }
    const result = new Result({quizId, userId, score, total});
    const data = await result.save();

    const resp:returnResponse = {status:"success", message:"Quiz", data:{ total, score, resultId:data._id }};
    res.status(200).send(resp);

  } catch (error) {
    next(error);
  }
};


export { startExam, submitExam };