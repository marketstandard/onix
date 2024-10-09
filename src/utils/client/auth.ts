import * as cookie from 'cookie';
import { NextPageContext } from 'next';

export const getCookie = (context = {} as NextPageContext) => {
  let userCookie = '';

  if (typeof window !== 'undefined') {
    userCookie = document.cookie;
  }

  if (context.req && context.req.headers) {
    userCookie = context.req.headers.cookie || '';
  }

  return userCookie;
};

export const getToken = (context = {} as NextPageContext, token = process.env.JWT_TOKEN_NAME!) => {
  const cookieString = getCookie(context);

  if (cookieString) {
    const parsedCookie = cookie.parse(cookieString);
    return parsedCookie[token] || '';
  } else {
    return '';
  }
};

export const getAuthHeaderFromToken = (token: string) => {
  let authHeader = '';

  if (token) {
    authHeader = `Bearer ${token}`;
  }

  return authHeader;
};
