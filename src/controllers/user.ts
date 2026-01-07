import type { Request, Response } from "express";
import User from "../models/user.js";


interface returnResponse {
    status: 'success' | 'error',
    message: String,
    data:{}
}



const getUser = async (req: Request, res: Response) => {

    // console.log("query:", req.query);
    // console.log("params:", req.params.userId);
    
    let resp:returnResponse;
    // console.log(req.userId);

    try {
        const userId = req.params.userId;

        if(req.userId != req.params.userId){
            const err = new Error("you are not authorised");
            throw err;
        }
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

        if(req.userId != req.body._id){
            const err = new Error("you are not authorised");
            throw err;
        }
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


export { getUser, updateUser};