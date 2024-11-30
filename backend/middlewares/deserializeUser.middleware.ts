import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies["accessToken"];

  if (!accessToken) return next();

  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  res.locals.user = decoded;

  return next();
};

export default deserializeUser;
