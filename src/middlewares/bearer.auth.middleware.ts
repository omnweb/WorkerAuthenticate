import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";

async function BearerAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken || !bearerToken.startsWith("Bearer")) {
      res.status(StatusCodes.FORBIDDEN).send("Unauthorized access");
    }

    const [bearer, token] = bearerToken!.split(" ");
    const verifiedToken = JWT.verify(token, "my_secret_key");

    if (typeof verifiedToken !== "object" || !verifiedToken.sub) {
      throw new Error("Invalid Token");
    }

    const user = {
      uuid: verifiedToken.sub,
      username: verifiedToken.username
    };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default BearerAuthMiddleware;
