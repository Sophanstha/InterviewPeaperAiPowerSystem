import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import blacklistingToken from "../model/TokenBlackListing.ts";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try 
  {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(400).json({
        message: "invaalid token",
      });
    }
    const bToken = await blacklistingToken.findOne({token});
    if (bToken) {
      return res.status(400).json({
        message: "invaalid token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    console.log(req.user.id)
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  }
};
