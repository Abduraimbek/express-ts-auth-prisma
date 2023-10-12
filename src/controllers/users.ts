import express from 'express';

import { getUsers } from '../db/userModel';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
