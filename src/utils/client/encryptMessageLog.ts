import { Message } from '@ai-sdk/react';

interface EncryptParams {
  key: CryptoKey;
  messages: Message[];
  title?: string;
}

interface DecryptParams {
  key: CryptoKey;
  encryptedData: string;
}

interface EncryptedData {
  messages: Message[];
  title?: string;
}

export const encryptMessageLog = async ({ key, messages, title }: EncryptParams) => {
  const data: EncryptedData = {
    messages,
    title,
  };
  const stringifiedData = JSON.stringify(data);
  const encryptedMessages = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    key,
    new TextEncoder().encode(stringifiedData),
  );

  return Buffer.from(encryptedMessages).toString('base64');
};

export const decryptMessageLog = async ({
  key,
  encryptedData,
}: DecryptParams): Promise<EncryptedData> => {
  const encryptedBuffer = Buffer.from(encryptedData, 'base64');
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    key,
    encryptedBuffer,
  );

  const decryptedString = new TextDecoder().decode(decryptedData);
  return JSON.parse(decryptedString);
};
