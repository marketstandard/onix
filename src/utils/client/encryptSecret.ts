export async function encryptSecret({
  secret,
  publicKey,
}: {
  secret: string;
  publicKey: string;
}): Promise<string> {
  const pemKey = publicKey
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\n/g, '');

  const keyBuffer = str2ab(atob(pemKey));

  const encoder = new TextEncoder();
  const encodedSecret = encoder.encode(secret);

  const importedPublicKey = await window.crypto.subtle.importKey(
    'spki',
    keyBuffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    false,
    ['encrypt'],
  );

  const encryptedSecret = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    importedPublicKey,
    encodedSecret,
  );

  return btoa(String.fromCharCode(...new Uint8Array(encryptedSecret)));
}

function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
