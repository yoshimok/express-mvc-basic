import { Request, Response, NextFunction } from "express";
import { performance } from "perf_hooks";
import { infoLogger } from "../logger/logger";

export const customLogger = async (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.startTime) {
    // request時に実行
    res.locals.startTime = performance.now();
    infoLogger("start API");
    infoLogger("number of urls: " + req.body.targets.length);
    next();
  } else {
    // response時に実行
    const endTime = performance.now();
    infoLogger("Complete! " + (endTime - res.locals.startTime) + "ms");
  }
};
