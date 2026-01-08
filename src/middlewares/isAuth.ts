import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    //header --> token
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const err = new Error("Not authenticated");
      throw err;
      // res.status(401).send("Not authenticated");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      const err = new Error("Not authenticated");
      throw err;
    }
    //jwt --> decode using sign "secret key"
    let decodedToken: { userId: String; iat: Number; exp: Number };

    try {
      decodedToken = <any>jwt.verify(token, "secret key"); //by this we get user id
    } catch (error) {
      const err = new Error("Not authenticated");
      throw err;
    }

    if (!decodedToken) {
      const err = new Error("Not authenticated");
      throw err;
    }
    //user id
    req.userId = decodedToken.userId; //req me userId nahi hota so interface change krna hai to abse acccha hota hai ki main file me jake globaly add kr do Express me

    next();
  } catch (error) {
    next(error);
  }
};

export { isAuthenticated };
