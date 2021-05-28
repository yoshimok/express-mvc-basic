import express from "express";
import { addUser, getUser } from "./controller"
export const  userRouter = express.Router();

userRouter.get("/:id",  getUser);
userRouter.post("/",  addUser);

