import { NextRequest, NextResponse } from 'next/server';

export type NextEdgeHandlerFunction = (
  request: NextRequest,
  response: NextResponse,
) => unknown | Promise<unknown>;
