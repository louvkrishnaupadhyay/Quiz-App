import type {Request, Response, NextFunction, response} from "express";
import Quiz from "../models/quiz.js";
import projectError from "../helper/error.js";


interface returnResponse {
  status: "success" | "error";
  message: String;
  data: {} | [];
}

const createQuiz = async (req: Request,res: Response, next:NextFunction) => {
    
    try {
        const created_by = req.userId;                   //isAuthenticated ke last me se userId mil rhi hai
        const name = req.body.name;
        const questions_list = req.body.questions_list;
        const answers = req.body.answers;

        const quiz = new Quiz({name,questions_list,answers,created_by});
        const result = await quiz.save();
        const resp:returnResponse = {status:"success", message:"Quiz created succesfully", data:{quizId:result._id}};
        res.status(201).send(resp);
    } catch (error) {
        next(error)
    }
} 


const getQuiz = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

        const resp:returnResponse = {status:"success", message:"Quiz", data:{quiz}};
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}


const updateQuiz = (req:Request, res:Response) => {
    res.send(req.body);
}


const deleteQuiz = (req:Request,res:Response) => {
    res.send(req.params.quizId);
}

const publishQuiz = (req:Request,res:Response) => {
    res.send(req.body)
}

export {createQuiz,updateQuiz,deleteQuiz,publishQuiz,getQuiz}