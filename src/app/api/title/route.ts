import { generateText, streamText } from 'ai';
import { auth } from 'auth';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { getModel } from 'services/server/ai';

export const maxDuration = 90;

const model = getModel();
const SYSTEM_MESSAGE = `You are a helpful assistant with a single purpose. You are to create simple, human-readables titles for conversations. The title should be short, accurate, and use plain language. The focus shoulld be on the users question, with some slight modification based on the response. You should use at most 5 words. Respond only with the title in plain text (NO MARKDOWN EVER) and nothing else.`;

export const POST = auth(async (req: Request & { auth: Session }, res) => {
  // @NOTE commenting this out for now
  // probably necessary however i don't want to deal with
  // implementing auth for wallets on this endpoint.
  // perhaps combine with /api/chat route? would be better

  // const session: Session = req.auth;

  // if (!session?.user) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    system: SYSTEM_MESSAGE,
    model: model,
    prompt,
  });

  return Response.json({ text });
});
