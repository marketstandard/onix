export const deriveCryptoKeyFromMessage = async (message: Uint8Array) => {
  const hash = await crypto.subtle.digest('SHA-256', message);

  const key = await crypto.subtle.importKey('raw', hash, { name: 'AES-GCM', length: 256 }, true, [
    'encrypt',
    'decrypt',
  ]);

  return key;
};
