import * as cookie from 'cookie';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import { HttpMethods } from 'constants/http';

const CROSS_DOMAIN_COOKIE =
  process.env.APP_STAGE === 'development' ? 'localhost' : '.CHANGE_ME.com';

export const getDestinationPagePath = (redirectPath: string | string[] = '/') => {
  let location = '';

  if (Array.isArray(redirectPath)) {
    location = redirectPath.join('/');
  } else {
    location = redirectPath;
  }

  if (location[0] !== '/') {
    return `/${location}`;
  }

  return location;
};

export const getIpAddress = (req: IncomingMessage) => requestIp.getClientIp(req) || '';
// req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || '';

export const getReferralUrl = (req: IncomingMessage) => req.headers.referer || '';

interface SetCookie extends cookie.CookieSerializeOptions {
  res: ServerResponse;
  name: string;
  value: string;
}

export const setCookie = ({
  res,
  name,
  value,
  maxAge,
  domain = process.env.ROOT_DOMAIN!,
  path = '/',
  secure,
  httpOnly,
  sameSite,
}: SetCookie) => {
  let cookiesToSet = [
    cookie.serialize(name, value, {
      maxAge,
      domain,
      path,
      secure,
      httpOnly,
      sameSite,
    }),
  ];
  let existingCookieHeaders = res.getHeader('Set-Cookie');

  if (Array.isArray(existingCookieHeaders)) {
    cookiesToSet = [...cookiesToSet, ...existingCookieHeaders];
  } else if (typeof existingCookieHeaders === 'string') {
    cookiesToSet.push(existingCookieHeaders);
  }

  res.setHeader('Set-Cookie', cookiesToSet);
};

const AFFILIATE_COOKIE_NAME = 'CHANGE_ME_AFFILIATE_COOKIE_NAME';
const REFERR_ID_COOKIE_NAME = 'CHANGE_ME_REFERRER_ID_COOKIE_NAME';
const WEEK = 60 * 60 * 24 * 7;
const AFFILIATE_COOKIE_AGE_WEEKS = 4 * WEEK;
export const setAffiliateCookie = (res: ServerResponse, value: string) => {
  setCookie({
    res,
    name: AFFILIATE_COOKIE_NAME,
    value,
    maxAge: AFFILIATE_COOKIE_AGE_WEEKS,
    domain: CROSS_DOMAIN_COOKIE,
  });
};

export const getAffiliateCookie = (req: NextApiRequest) => {
  return req.cookies[AFFILIATE_COOKIE_NAME];
};

export const setAffiliateReferralIdCookie = (res: ServerResponse, value: string) => {
  setCookie({
    res,
    name: REFERR_ID_COOKIE_NAME,
    value,
    maxAge: AFFILIATE_COOKIE_AGE_WEEKS,
    domain: CROSS_DOMAIN_COOKIE,
  });
};

export const getAffiliateReferralIdCookie = (req: NextApiRequest) => {
  return req.cookies[REFERR_ID_COOKIE_NAME];
};

const DAY = 60 * 60 * 24;
const OAUTH_COOKIE_AGE_DAY = 0.25 * DAY;
export const setOauthStateCookie = (res: ServerResponse, name: string, value: string) => {
  setCookie({
    res,
    name,
    value,
    maxAge: OAUTH_COOKIE_AGE_DAY,
  });
};

export const expireCookie = (res: ServerResponse, name: string) => {
  setCookie({
    res,
    name,
    value: '',
    maxAge: 0,
  });
};

interface ErrorObject {
  statusCode?: number;
  message?: string;
}
export const createErrorObject = (errorObject: ErrorObject) => errorObject;
export const response400BadRequestError = (res: NextApiResponse, message: string) =>
  res.status(400).send(
    createErrorObject({
      message: message,
      statusCode: 400,
    }),
  );
export const response401UnauthorizedError = (res: NextApiResponse, message: string) =>
  res.status(401).send(
    createErrorObject({
      message: message,
      statusCode: 401,
    }),
  );
export const response403ForbiddenError = (res: NextApiResponse, message: string) =>
  res.status(403).send(
    createErrorObject({
      message: message,
      statusCode: 403,
    }),
  );
export const response405InvalidMethodError = (res: NextApiResponse, message: string) =>
  res.status(405).send(
    createErrorObject({
      message: message,
      statusCode: 405,
    }),
  );

export const response500ServerError = (res: NextApiResponse, message: string) =>
  res.status(500).send(
    createErrorObject({
      message: message,
      statusCode: 500,
    }),
  );

export const responseJson200Success = <T = any>(res: NextApiResponse, data: T) =>
  res.status(200).send(data);

type serverlessFunctionHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<T>;
export const allowCors =
  (fn: serverlessFunctionHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    );

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    return await fn(req, res);
  };
