import type { NextFunction, Request, Response } from "express";
import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import projectError from "../helper/error.js";
import { validationResult } from "express-validator";

interface returnResponse {
  status: "success" | "error";
  message: String;
  data: {} | [];
}

const resisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp: returnResponse;
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new projectError("validation failed!");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }
    const email = req.body.email;
    const name = req.body.name;

    const password = await bcrypt.hash(req.body.password, 12);

    const user = new User({ email, name, password });
    const result = await user.save();
    if (!result) {
      resp = { status: "error", message: "result not found", data: {} };
      res.send(resp);
    } else {
      resp = {
        status: "success",
        message: "Registration Done!",
        data: { userId: result._id },
      };
      res.send(resp);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  let resp: returnResponse;
  try {
    const email = req.body.email;
    const password = req.body.password;

    //find user with email
    const user = await User.findOne({ email });

    if (!user) {
      const err = new projectError("User not found");
      err.statusCode = 401;
      throw err;
    }

    //verify password by bcrypt
    const status = await bcrypt.compare(password, user.password);

    //then decide
    if (status) {
      const token = jwt.sign({ userId: user._id }, "secret key", {
        expiresIn: "1h",
      });

      resp = { status: "success", message: "Logged In", data: { token } };
      res.status(200).send(resp);
    } else {
      const err = new projectError("email/password mismatched");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const isUserExist = async (email: String) => {
  //find user with email
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }
  return true;
};

export { resisterUser, loginUser, isUserExist };
