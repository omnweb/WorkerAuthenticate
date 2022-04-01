import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import BasicAuthMiddleware from "../middlewares/basic.auth.middleware";
import JWTAuthMiddleware from "../middlewares/jwt.auth.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authRoute = Router();

authRoute.post(
  "/token",
  BasicAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new ForbiddenError("Unauthenticated user ");
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

authRoute.post(
  "/token/validate",
  JWTAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

export default authRoute;
