import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepositoty from "../repositories/user.repositoty";

async function BasicAuthMiddleware (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new ForbiddenError("No authorization header found", "Error");
    }
    // Basic YWRtaW46YWRtaW4=
    const [authType, token] = authHeader.split(" ");

    if (authType !== "Basic" || !token) {
      throw new ForbiddenError("Invalid authorization type", "Error");
    }

    // Decode token
    const decodeToken = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = decodeToken.split(":");

    if (!username || !password) {
      throw new ForbiddenError("Incomplete access data", "Error");
    }

    // Check if user exists
    const user = await userRepositoty.findUserByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new ForbiddenError("User not found", "Error");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default BasicAuthMiddleware;
