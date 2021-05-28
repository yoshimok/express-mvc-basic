import { User } from "@prisma/client";
import { findUsers } from "../repository/prisma";

export const getUsers = async (): Promise<User[]> => {
  return await findUsers()
};
