import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from 'constants/http';
import { response405InvalidMethodError } from 'utils/server/serverless/http';

export const withHttpMethods = (handlers) => async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as HttpMethods | undefined;
  if (!method) {
    return response405InvalidMethodError(res, `Method ${method} not allowed`);
  }

  const handler = handlers[method];
  if (!handler) {
    return response405InvalidMethodError(res, `Method ${method} not allowed`);
  }

  return handler(req, res);
};

export { HttpMethods };
