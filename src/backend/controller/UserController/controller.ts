import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { RequestWithBodyType } from "../../models";
import { createUser } from "../../repository/prisma";
import { getUsers } from "../../service/user";

export const getUser = async (req: RequestWithBodyType<any>, res: Response, next: NextFunction) => {
  try {
    const users = getUsers();
    res.json(users);
    next();
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req: Request<User>, res: Response, next: NextFunction) => {
  try {
    await createUser(req.body);
    res.status(201)
    next();
  } catch (error) {
    next(error);
  }
};
