import { AuthStatus, HasuraClaims } from 'constants/auth';

export const EMPTY_ORG_ID = '00000000-0000-0000-0000-000000000000';

// TODO: Have a config param as well to load user settings from the DB
export interface Viewer {
  status: AuthStatus;
  config: null;
  claims: HasuraClaims | null;
  userId: string | null | undefined;
  orgId: string | null | undefined;
  orgRole: string | null | undefined;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Anonymous = 'anonymous',
}

export enum Theme {
  Dark = 'DARK',
  Light = 'LIGHT',
}

export const MAX_SNACKBARS = 3;
export const SHACKBAR_AUTOHIDE_DURATION = 2000; // ms
