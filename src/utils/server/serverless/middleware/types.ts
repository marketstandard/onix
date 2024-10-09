import { NextApiRequest, NextApiResponse } from 'next';

export type NextServerlessHandlerFunction = (
  request: NextApiRequest,
  response: NextApiResponse,
) => unknown | Promise<unknown>;
