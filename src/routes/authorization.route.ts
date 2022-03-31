import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response, Router } from "express";
import JWT from "jsonwebtoken";
import BasicAuthMiddleware from "../middlewares/basic.auth.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authRoute = Router();
authRoute.post(
  "/token",
  BasicAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {      
      const user = req.user;
      if (!user) {
        throw new ForbiddenError("Unauthenticated user ", "Error");
      }

      const jwtPayload = { username: user?.username };
      const jwtOptions = {
        subject: user?.uuid,
        expiresIn: "1h",
        algorithm: "HS256",
      };
      const jwtKey = "my_secret_key";

      const jwt = JWT.sign(jwtPayload, jwtKey, {
        subject: jwtOptions.subject,
        expiresIn: jwtOptions.expiresIn,
      });

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authRoute;
