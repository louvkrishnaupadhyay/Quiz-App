import type {RequestHandler} from "express";
import { validationResult } from "express-validator";

import Quiz from "../models/quiz.js";
import projectError from "../helper/error.js";


import type { returnResponse } from "../utils.js";

const createQuiz : RequestHandler = async (req,res, next) => {
    
    try {

        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
          const err = new projectError("validation failed!");
          err.statusCode = 422;
          err.data = validationError.array();
          throw err;
        }

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


const getQuiz :RequestHandler = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId,{name:1, questions_list:1, answers:1, created_by:1});

        if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

        if(req.userId !== quiz.created_by.toString()){
            const err = new projectError("You are not authorised");
            err.statusCode = 403;
            throw err;
        }

        const resp:returnResponse = {status:"success", message:"Quiz", data:{quiz}};
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}


const updateQuiz : RequestHandler = async (req, res, next) => {
    try {
        
        const validationError = validationResult(req);              //this is compulsary before applying the limitation on the update quiz
        if (!validationError.isEmpty()) {
          const err = new projectError("validation failed!");
          err.statusCode = 422;
          err.data = validationError.array();
          throw err;
        }

        const quizId = req.body._id;
        
        const quiz = await Quiz.findById(quizId);

        if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

        if(req.userId !== quiz.created_by.toString()){
            const err = new projectError("You are not authorised");
            err.statusCode = 403;
            throw err;
        }

        if(quiz.is_published){
            const err = new projectError("You cannot update the published quiz!");
            err.statusCode = 405;
            throw err;
        }

        quiz.name = req.body.name;
        quiz.questions_list = req.body.questions_list;
        quiz.answers = req.body.answers;

        await quiz.save();
        const resp:returnResponse = {status:"success", message:"Quiz updated", data:{}};
        res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
    
}


const deleteQuiz : RequestHandler= async (req,res, next) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);

        if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

        if(req.userId !== quiz.created_by.toString()){
            const err = new projectError("You are not authorised");
            err.statusCode = 403;
            throw err;
        }

        if(quiz.is_published){
            const err = new projectError("You cannot delete the published quiz!");
            err.statusCode = 405;
            throw err;
        }

        await Quiz.deleteOne({_id:quizId});
        const resp:returnResponse = {status:"success", message:"Quiz deleted successfully", data:{}};
        res.status(200).send(resp);

    } catch (error) {
        next(error);
    }
}

const publishQuiz : RequestHandler= async (req,res, next) => {
    try {
        const quizId = req.body.quizId;
        const quiz = await Quiz.findById(quizId);
        console.log(quiz);

        if(!quiz){
            const err = new projectError("Quiz not found");
            err.statusCode = 404;
            throw err;
        }

        if(req.userId !== quiz.created_by.toString()){
            const err = new projectError("You are not authorised");
            err.statusCode = 403;
            throw err;
        }
        quiz.is_published = true;
        await quiz.save();
        const resp:returnResponse = {status:"success", message:"Quiz published", data:{}};
        res.status(200).send(resp);

    } catch (error) {
        next(error);
    }
}

export {createQuiz,updateQuiz,deleteQuiz,publishQuiz,getQuiz}