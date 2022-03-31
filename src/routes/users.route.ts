import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRepositoty from "../repositories/user.repositoty";

const usersRoute = Router();

usersRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userRepositoty.findAllUsers();
      res.status(StatusCodes.OK).send(users);
    } catch (error) {
      next(error);
    }
  }
);

usersRoute.get(
  "/users/:uuid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepositoty.findUserByUuid(uuid);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);    }
  }
);

usersRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = req.body;
      const user = await userRepositoty.createUser(newUser);
      res.status(StatusCodes.CREATED).send(user);
    } catch (error) {
      next(error);    }
  }
);

usersRoute.put(
  "/users/:uuid",
  async (req: Request<{ uuid: String }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const updatedUser = req.body;
      updatedUser.uuid = uuid;
      const user = await userRepositoty.updateUser(updatedUser);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);    }
  }
);

usersRoute.delete(
  "/users/:uuid",
  async (req: Request<{ uuid: String }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      await userRepositoty.deleteUser(uuid);
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);    }
  }
);

export default usersRoute;
