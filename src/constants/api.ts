import { getIsNativePlatform } from 'utils/mobile/getIsNativePlatform';
import { getCacheTimeInMs } from 'utils/shared';

const API_ROOT = getIsNativePlatform() ? process.env.REMOTE_API_URL : process.env.APP_URL;
export const API_URL = `${API_ROOT}/api`;
export const MAX_CACHE_TIME = getCacheTimeInMs(6);

export const KEEP_ALIVE_PACKET = '[KEEP_ALIVE]';
