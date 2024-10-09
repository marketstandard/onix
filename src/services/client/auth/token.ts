import { HASURA_CLAIMS_KEY } from 'constants/auth';
import { HasuraClaims } from 'constants/auth';

type TokenOrNull = string | null;
interface UpdateResponse {
  token: TokenOrNull;
  userId: string | null | undefined;
  orgId: string | null | undefined;
  orgRole: string | null | undefined;
  claims: HasuraClaims | null;
}

// const MINUTE = 60 * 1000;
// const HOUR = 60 * MINUTE;
// const DAY = 24 * HOUR;
// const MAX_LOGIN_TIME = 7 * DAY;

let token: TokenOrNull = null;

export const getViewerToken = async () => {
  /**
   * @todo Append JWT token to clientside Apollo
   */
  return '';
};

export const getAuthHeaders = async () => {
  const token = await getViewerToken();

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
