import type { Request, Response } from "express";
import User from "../models/user.js";

import bcrypt from "bcryptjs";

interface returnResponse {
    status: 'success' | 'error',
    message: String,
    data:{}
}

const resisterUser = async (req: Request, res: Response) =>{

    let resp:returnResponse;
    try {
        const email = req.body.email;
        const name  = req.body.name;
        
        const password = await bcrypt.hash(req.body.password,12);


        const user = new User({email, name, password});
        const result = await user.save();
        if(!result){
            resp = {status: 'error', message: "result not found", data:{}};
            res.send(resp);
        }
        else{
            resp = {status: 'success', message: "Registration Done!", data:{userId:result._id}}
            res.send(resp);
        }
    } catch (error) {
        // console.log(error)
        resp = {status: 'error', message: "something went wrong", data:{}}
        res.status(500).send(resp);
    }
    
    
}

const loginUser = async (req: Request, res: Response)=>{
    let resp:returnResponse;
    try {

        const email = req.body.email;
        const password = req.body.password;

        //find user with email
        const user = await User.findOne({email});

        if(!user){
            resp = { status: "error", message: "User not found", data: {} };
            return res.status(401).send(resp);
        }


        //verify password by bcrypt
        const status = await bcrypt.compare(password, user.password);

        //then decide
        if(status){
            resp = {status: 'success', message: "Logged In", data:{}};
            res.status(200).send(resp);
        } 
        else{
            resp = {status: 'error', message: "email/password mismatched", data:{}};
            res.status(401).send(resp);
        }

        
        
    } catch (error) {
        resp = {status: 'error', message: "something went wrong", data:{}}
        res.status(500).send(resp);
    }
}

const getUser = async (req: Request, res: Response) => {

    // console.log("query:", req.query);
    console.log("params:", req.params.userId);
    
    let resp:returnResponse;
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId,{name:1, email: 1});
        if(!user){
            resp = {status: 'error', message: "No user found", data:{}};
            res.send(resp);
        } else{
            resp = {status: 'success', message: "User found", data:{user:user}}
            res.send(resp);
        }
    } catch (error) {
        resp = {status: 'error', message: "something went wrong", data:{}}
        res.status(500).send(resp);
    }
    
}

// const updateUser = async (req: Request, res: Response) => {
//     let resp:returnResponse;
//     try {
//         const userId = req.body._id;
//         const user = await User.findById(userId);
//         user.name = req.body.name;
//         await user?.save();

//         resp = {status: "success", message: "Updat done", data:{}};
//         res.send(resp);
//     } catch (error) {
//         resp = {status: 'error', message: "something went wrong", data:{}}
//         res.status(500).send(resp);
//     }
    
// }


const updateUser = async (req: Request, res: Response) => {
    let resp: returnResponse;
    try {
        const userId = req.body._id;
        const user = await User.findById(userId);

        if (!user) {
            resp = { status: "error", message: "User not found", data: {} };
            return res.status(404).send(resp);
        }

        user.name = req.body.name;
        await user.save();

        resp = { status: "success", message: "Updat done", data: {} };
        res.send(resp);
    } catch (error) {
        resp = { status: 'error', message: "something went wrong", data: {} };
        res.status(500).send(resp);
    }
};


export {resisterUser, getUser, updateUser, loginUser};