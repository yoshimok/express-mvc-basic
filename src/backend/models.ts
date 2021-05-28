import { Request } from "express";

export interface RequestWithBodyType<T> extends Request {
  body: T;
}

export type FileDetails = {
  name: string;
  createdAt: Date;
};

// Requests

export type ReqBodyGetInfo = {
  targets: string[];
  cancelToken?: string;
};
