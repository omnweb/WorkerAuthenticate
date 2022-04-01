import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";

async function JWTAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken || !bearerToken.startsWith("Bearer")) {
      throw new ForbiddenError("Unauthenticated user ");
    }

    const [bearer, token] = bearerToken!.split(" ");
    const verifiedToken = JWT.verify(token, "my_secret_key");
    console.log(verifiedToken);

    if (typeof verifiedToken !== "object" || !verifiedToken.sub) {
      throw new ForbiddenError("Invalid Token");
    }


    // if(verifiedToken.sub === 'jwt expired') {
    //   throw new ForbiddenError("Token Expired");
    // }

    const user = {
      uuid: verifiedToken.sub,
      username: verifiedToken.username,
    };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default JWTAuthMiddleware;
