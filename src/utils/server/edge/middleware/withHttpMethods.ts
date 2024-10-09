import { NextRequest, NextResponse } from 'next/server';
import { HttpMethods } from 'constants/http';
import { response405InvalidMethodError } from 'utils/server/edge/http';

export const withHttpMethods = (handlers) => async (req: NextRequest, res: NextResponse) => {
  const method = req.method as HttpMethods | undefined;
  if (!method) {
    return response405InvalidMethodError(req, `Method ${method} not allowed`);
  }

  const handler = handlers[method];
  if (!handler) {
    return response405InvalidMethodError(req, `Method ${method} not allowed`);
  }

  return handler(req, res);
};

export { HttpMethods };
