import * as ed25519 from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import { Keypair, PublicKey } from '@solana/web3.js';
import { createDataStreamResponse, generateText, streamText } from 'ai';
import { auth } from 'auth';
import { Session } from 'next-auth';
import { MAX_RESPONSE_TOKENS } from 'constants/app';
import { getModel } from 'services/server/ai';
import { getStaticAnchorProvider } from 'services/shared/solana';
import { debit, hold } from 'services/shared/solana/escrowSol';
import { countLlmTokens } from 'utils/ai/countLlmTokens';

ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));

export const maxDuration = 90;

const IS_FREE_BETA_USAGE = true;
const IS_RATE_LIMIT = false;

const SYSTEM_MESSAGE = `You are a generally helpful assistant. You may be given tools that you can call for functions and specific results, but if a tool doesn't match the prompt, you should not use them. DO NOT DISCUSS THE TOOLS IN ANY WAY - THEY SHOULD ONLY BE USED IN THE BACKGROUND AND NOT TO BOTHER THE CHAT EXPERIENCE. If you do use a tool, always respond with some text as well to preface it or present the result.`;

export const POST = auth(async (req: Request & { auth: Session }, res) => {
  const session: Session = req?.auth;
  const payload = await req?.json();

  const { messages } = payload;

  const keypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.WALLET_PRIVATE_KEY!)),
  );
  const provider = getStaticAnchorProvider(keypair);

  let messageTokens = 0;
  let billSolana = false;
  let holdPda: PublicKey | null = null;
  const publicKey = session?.user?.publicKey;

  if (publicKey) {
    billSolana = true;

    // compute # of tokens
    messageTokens = messages.reduce((total, msg) => {
      const roleOverhead = 4;
      return total + roleOverhead + countLlmTokens(msg.content);
    }, 0);
    const totalTokens = messageTokens + MAX_RESPONSE_TOKENS;

    // create hold account
    const { holdPda: holdPdaFromHoldInstruction } = await hold({
      provider,
      signer: keypair,
      amountLlmTokens: totalTokens,
      ownerPublicKey: new PublicKey(publicKey),
    });
    holdPda = holdPdaFromHoldInstruction;
  } else if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  /**
   * @todo Rate limit to have 1 active chat at a time
   */
  if (IS_RATE_LIMIT) {
    return new Response('Unauthorized', { status: 401 });
  }

  /**
   * @todo Only allow subscribed users to submit. Maybe give a limited number of free chats.
   */
  if (!session?.user?.hasActiveSubscription && !IS_FREE_BETA_USAGE) {
    return new Response('Unauthorized', { status: 401 });
  }

  const isFirstMessage = messages.length === 1;

  // Use createDataStreamResponse to handle both the chat response and title generation
  return createDataStreamResponse({
    execute: async (dataStream) => {
      // Start the main chat response
      const result = streamText({
        system: SYSTEM_MESSAGE,
        model: getModel(),
        messages,
        onFinish: async (completion) => {
          if (billSolana) {
            const finalTokenCount = countLlmTokens(completion.text);
            const totalTokens = messageTokens + finalTokenCount;

            const { holdAccount } = await debit({
              provider,
              signer: keypair,
              amountLlmTokens: totalTokens,
              holdPda: holdPda,
            });

            if (holdAccount !== null) throw new Error('Failed to debit and close hold account.');
          }

          if (isFirstMessage) {
            const titleResult = await generateText({
              model: getModel(),
              system: `You are a helpful assistant with a single purpose. You are to create simple, human-readables titles for conversations. The title should be short, accurate, and use plain language. The focus shoulld be on the users question, with some slight modification based on the response. You should use at most 6 words. Respond only with the title in plain text (NO MARKDOWN EVER) and nothing else. Don't use quotation marks or put the word "title" in the response. ALWAYS respond with some title and never an empty string. IN THE THREAD ARE THE MESSAGES OF THE CONVERATION THAT SHOULD GIVE A TITLE TO.`,
              messages: [{ role: 'user', content: `Thread: ${JSON.stringify(messages, null, 2)}` }],
              maxTokens: 100,
            });

            // Stream the title as additional data
            dataStream.writeData({
              type: 'title',
              title: titleResult.text,
            });
          }
        },
      });

      // Merge the chat response into the data stream
      result.mergeIntoDataStream(dataStream);
    },
  });
});
