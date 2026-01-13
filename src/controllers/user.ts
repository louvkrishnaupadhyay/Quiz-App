import type { RequestHandler } from "express";
import User from "../models/user.js";
import projectError from "../helper/error.js";

import type { returnResponse } from "../utils.js";

const getUser : RequestHandler= async (req, res, next) => {
  // console.log("query:", req.query);
  // console.log("params:", req.params.userId);

  let resp: returnResponse;
  // console.log(req.userId);

  try {
    const userId = req.params.userId;

    if (req.userId != req.params.userId) {
      const err = new projectError("you are not authorised");
      err.statusCode = 401;
      throw err;
    }
    const user = await User.findById(userId, { name: 1, email: 1 });
    if (!user) {
      const err = new projectError("User not found");
      err.statusCode = 401;
      throw err;
    } else {
      resp = { status: "success", message: "User found", data: { user: user } };
      res.status(200).send(resp);
    }
  } catch (error) {
    next(error);
  }
};

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

const updateUser : RequestHandler = async (req, res, next) => {
  let resp: returnResponse;
  try {
    if (req.userId != req.body._id) {
      const err = new projectError("you are not authorised");
      err.statusCode = 401;
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
    next(error);
  }
};

export { getUser, updateUser };
