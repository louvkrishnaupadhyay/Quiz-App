import type { Request, Response } from "express";
import User from "../models/user.js";

interface returnResponse {
    status: 'success' | 'error',
    message: String,
    data:{}
}

const resisterUser = async (req: Request, res: Response) =>{

    let resp:returnResponse;
    try {
        const user = new User(req.body);
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

const getUser = (req: Request, res: Response) => {
    console.log("params:", req.params);
    console.log("query:", req.query);
    res.send("done");
}

export {resisterUser, getUser};