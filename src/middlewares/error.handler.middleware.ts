import DatabaseError from "../models/errors/database.error.model";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

const errorHandller = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DatabaseError) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  } else if (error instanceof ForbiddenError) {
    res.status(StatusCodes.FORBIDDEN).send(error.message);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export default errorHandller;
