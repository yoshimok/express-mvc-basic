import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// https://www.prisma.io/docs/concepts/components/prisma-client/crud
export const getUser = async () => {
  const users = await prisma.user.findMany()
  return users;
};

export const createUser = async (user: User) => {
  const users = await prisma.user.create( {data:user})
  return users;
};
