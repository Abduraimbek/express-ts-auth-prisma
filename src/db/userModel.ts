import { User } from '@prisma/client';
import { prisma } from './prisma';

const hideUserFields = (user: User) => {
  user.password = null;
  user.salt = null;
  user.sessionToken = null;
  return user;
};

export const getUsers = async () => {
  let users = await prisma.user.findMany({});
  users = users.map(hideUserFields);
  return users;
};

export const getUserByEmail = async (email: string) => {
  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return hideUserFields(user);
};

export const getUserBySessionToken = async (sessionToken: string) => {
  let user = await prisma.user.findFirst({
    where: {
      sessionToken,
    },
  });
  return hideUserFields(user);
};

export const getUserById = async (id: string) => {
  let user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return hideUserFields(user);
};

export const createUser = async (values: Record<string, any>) => {
  let user = await prisma.user.create({
    data: {
      username: values.username,
      email: values.email,
      password: values.password,
      salt: values.salt,
      sessionToken: values.sessionToken,
    },
  });
  return hideUserFields(user);
};

export const deleteUserById = async (id: string) => {
  let user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return hideUserFields(user);
};

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  let user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...values,
    },
  });
  return hideUserFields(user);
};
