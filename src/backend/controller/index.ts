import { Request, Response, NextFunction } from "express";
import { ReqBodyGetInfo, RequestWithBodyType } from "../models";
import {  } from "../repository/prisma";
import { getFiles, getFileDetails, getFileData } from "../common";
import { sample } from "../service";

export const UserCotroller = async (
  req: RequestWithBodyType<any>,
  res: Response,
  next: NextFunction
) => {
  try {

    await sample(req.body.targets);

    res.status(200).send(`complete`);
    next();
  } catch (error) {
    next(error);
  }
};
