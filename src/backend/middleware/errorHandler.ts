import { Request, Response, NextFunction } from "express";
import { errorLogger } from "../logger/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  errorLogger(err.message);

  res.status(500);
  res.json({
    message: err.message,
    error: err,
  });
};
