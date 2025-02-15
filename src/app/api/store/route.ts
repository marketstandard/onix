import { Keypair, PublicKey } from '@solana/web3.js';
import { auth } from 'auth';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { ONIX_CHAT_FILE_EXTENSION, ONIX_INDEX_FILE_EXTENSION } from 'constants/app';
import { PostRequestPayload, PostResponsePayload } from 'constants/payloads/store';
import { getStaticAnchorProvider } from 'services/shared/solana';
import { decodeStorageUrl, getEscrowAccount } from 'services/shared/solana/escrowSol';
import { stringToFile } from 'utils/shared/stringToFile';
import { uuid } from 'utils/shared/uuid';

export const POST = auth(async (req: Request & { auth: Session }, res) => {
  /** @note remove this return to use this route */
  return new NextResponse('This route is not implemented yet', { status: 200 });

  const session: Session = req?.auth;
  const publicKey = session?.user?.publicKey;

  const payload = await req?.json();
  const { sizeBytes } = payload as PostRequestPayload;

  // generate a file name for this file
  const filename = `${uuid()}${ONIX_CHAT_FILE_EXTENSION}`;

  // fetch the storage url off the escrow account
  const keypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.WALLET_PRIVATE_KEY!)),
  );
  const provider = getStaticAnchorProvider(keypair);
  const { escrowAccount } = await getEscrowAccount({
    provider,
    signerPublicKey: new PublicKey(publicKey),
  });
  const storageUrl = escrowAccount?.storageUrl;

  let indexFileString: string = '';
  let indexFilename: string = '';
  if (storageUrl) {
    const decodedStorageUrl = decodeStorageUrl(storageUrl);
    const file = await (await fetch(decodedStorageUrl)).blob();
    indexFileString = await file.text();
    indexFilename = decodedStorageUrl.split('/').pop() || '';
  } else {
    indexFilename = `${uuid()}${ONIX_INDEX_FILE_EXTENSION}`;
  }

  // Append the new filename to the index
  indexFileString = indexFileString ? `${indexFileString}\n${filename}` : filename;
  const indexFile = stringToFile(indexFileString, indexFilename);

  // push new index file

  // sign the upload url for the user

  // return the signed url
});

export const DELETE = auth(async (req: Request & { auth: Session }, res) => {
  const session: Session = req?.auth;
  const payload = await req?.json();
});
