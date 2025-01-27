import { Keypair } from '@solana/web3.js';
import { NextRequest } from 'next/server';
import { getStaticAnchorProvider } from 'services/shared/solana';
import { adjustRate } from 'services/shared/solana/escrowSol';
import { response401UnauthorizedError, responseJson200Success } from 'utils/server/edge/http';
import { response500ServerError } from 'utils/server/edge/http';
import { withHttpMethods } from 'utils/server/edge/middleware/withHttpMethods';
import { HttpMethods } from 'utils/server/serverless/middleware/withHttpMethods';

export const config = {
  runtime: 'edge',
};

interface RequestPayload {
  rateLamports: number;
}

const POST = async function (request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.INTERNAL_API_KEY}`;

  if (!authHeader || authHeader !== expectedAuth) {
    return response401UnauthorizedError(request, 'Unauthorized');
  }

  try {
    const { rateLamports } = (await request.json()) as RequestPayload;

    const keypair = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(process.env.WALLET_PRIVATE_KEY!)),
    );
    const provider = getStaticAnchorProvider(keypair);

    const { config } = await adjustRate({
      provider,
      newRateLamports: rateLamports,
      signer: keypair,
    });

    return responseJson200Success(request, { config });
  } catch (error) {
    console.error('Failed to adjust rate:', error);
    return response500ServerError(request, 'Failed to adjust rate');
  }
};

export default withHttpMethods({
  [HttpMethods.Post]: POST,
});
