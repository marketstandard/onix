import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

export enum AuthStatus {
  Loading = 'LOADING',
  User = 'USER',
  Anonymous = 'ANONYMOUS',
}

export const HASURA_CLAIMS_KEY = 'https://hasura.io/jwt/claims';
// This should actually be an enum?
export enum HasuraClaimKey {
  AllowedRoles = 'x-hasura-allowed-roles',
  DefaultRole = 'x-hasura-default-role',
  UserID = 'x-hasura-user-id',
  Subscriptions = 'x-hasura-subscriptions',
}

export interface HasuraClaims {
  [HasuraClaimKey.AllowedRoles]: string[];
  [HasuraClaimKey.DefaultRole]: string;
  [HasuraClaimKey.UserID]: string;
  [HasuraClaimKey.Subscriptions]: string;
}

export interface CustomClaims {
  userId: string;
  [HASURA_CLAIMS_KEY]: HasuraClaims;
}

export enum Company {
  Facebook = 'facebook',
  Twitter = 'twitter',
  Google = 'google',
  Linkedin = 'linkedin',
  Discord = 'discord',
}

export interface IncomingMessageWithCookies extends IncomingMessage {
  cookies: {
    [key: string]: string;
  };
}

export const UNABLE_TO_OAUTH = {
  message: 'Unable to register your account using OAuth',
};

export enum OauthProvider {
  // Facebook = 'facebook',
  // Github = 'github',
  // Google = 'google',
  Discord = 'discord',
}

export type NextOauthApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  auth: any, // NOTE: Use union "|" if more providers are added
) => void | Promise<void>;

export interface StoredState {
  state: string;
  query?: string;
}

export const AUTH_FORMS_INITIAL_VALUES = { email: '', password: '' };
