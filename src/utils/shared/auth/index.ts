import { HASURA_CLAIMS_KEY, HasuraClaimKey } from 'constants/auth';

const decodeBase64 = (str: string) => {
  if (typeof window !== 'undefined') {
    return atob(str);
  } else {
    return Buffer.from(str, 'base64').toString();
  }
};

export interface Viewer {
  id: string;
}

export const getValidViewerFromToken = (token: string = '') => {
  let viewer: Viewer = { id: '' };

  if (token) {
    try {
      const jwt = token.split('.')[1];
      const decodedJwt = decodeBase64(jwt);
      const user = JSON.parse(decodedJwt);
      viewer.id = user[HASURA_CLAIMS_KEY][HasuraClaimKey.UserID];
    } catch (_e) {}
  }

  return viewer;
};
