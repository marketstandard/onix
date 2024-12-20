// import { generateId } from '@ai-sdk/ui-utils';
// import { OllamaFunctions } from '@langchain/community/experimental/chat_models/ollama_functions';
// import { Ollama } from '@langchain/community/llms/ollama';
// import { BaseMessage, HumanMessage, MessageType, SystemMessage } from '@langchain/core/messages';
// import { ChatPromptTemplate } from '@langchain/core/prompts';
// import { ChatOllama } from '@langchain/ollama';
// import { ChatOpenAI } from '@langchain/openai';
import {
  // LangChainAdapter,
  // StreamData,
  // StreamObjectResult,
  streamText, // tool,
} from 'ai';
import { auth } from 'auth';
// import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
// import * as mathjs from 'mathjs';
import { Session } from 'next-auth';
// import { z } from 'zod';
// import { jsonGenAiComponentMappingDefinitions, jsonResponseSchema } from 'constants/genui';
import { getModel } from 'services/server/ai';

export const maxDuration = 90;

const IS_FREE_BETA_USAGE = true;
const IS_RATE_LIMIT = false;
const IS_LANGCHAIN = false;

// GenUI structure in Python:
// def classify_and_build_components(self, content):
//   self.fetch_component_definitions()
//   content = "This is the content of the response:\n\n" + content
//   response = self.classify(content=content)
//   components = self.extract_lists_from_string(response)
//   compo_lst = components[0]
//   ui_payload = self.prepare_ui_payload(compo_lst, content)
//   return ui_payload
//
// - take response and classify it
// - find matching components
// - prepare UI payload

/**
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 * @note Ollama langchain as broken, so holding off until there is a working version for more complex chains. This is true for outside of Vercel, it's in langchain itself.
 */

const SYSTEM_MESSAGE = `You are a generally helpful assistant. You may be given tools that you can call for functions and specific results, but if a tool doesn't match the prompt, you should not use them. DO NOT DISCUSS THE TOOLS IN ANY WAY - THEY SHOULD ONLY BE USED IN THE BACKGROUND AND NOT TO BOTHER THE CHAT EXPERIENCE. If you do use a tool, always respond with some text as well to preface it or present the result.`;

// const TOOLS = {
//   weather: tool({
//     description:
//       'Get the weather in a location. Only use this if they provide something that looks like a specific city or zipcode.',
//     parameters: z.object({
//       location: z.string().describe('The location to get the weather for'),
//     }),
//     execute: async ({ location }) => ({
//       location,
//       temperature: 72 + Math.floor(Math.random() * 21) - 10,
//     }),
//   }),
//   calculate: tool({
//     description:
//       'A tool for evaluating mathematical expressions. ' +
//       'Example expressions: ' +
//       "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
//     parameters: z.object({ expression: z.string() }),
//     execute: async ({ expression }) => {
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       console.log('++++++++ IN TOOL CALL *&*^&*^*^%*&^%&*^%');
//       return mathjs.evaluate(expression);
//     },
//   }),
//   //
//   // client-side tool that is automatically executed on the client:
//   doge: {
//     description: 'Display the price of doge and dogecoin.',
//     parameters: z.object({}),
//   },
//   getLocation: {
//     description: 'Get the user location. Always ask for confirmation before using this tool.',
//     parameters: z.object({}),
//   },
// };

export const POST = auth(async (req: Request & { auth: Session }, res) => {
  const session: Session = req.auth;

  if (!session?.user) {
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

  const payload = await req.json();

  console.log('payload', payload);

  const messages = payload.messages;

  // if (IS_LANGCHAIN) {
  //   // LANGCHAIN
  //   const ollamaLangchainChat = new ChatOllama({
  //     model: 'ollama',
  //   });
  //   // .bind({
  //   //   tools: [
  //   //     {
  //   //       type: 'function',
  //   //       function: {
  //   //         name: 'calculator',
  //   //         description: 'Can perform mathematical operations.',
  //   //         parameters: {
  //   //           type: 'object',
  //   //           properties: {
  //   //             operation: {
  //   //               type: 'string',
  //   //               description: 'The type of operation to execute.',
  //   //               enum: ['add', 'subtract', 'multiply', 'divide'],
  //   //             },
  //   //             number1: { type: 'number', description: 'First integer' },
  //   //             number2: { type: 'number', description: 'Second integer' },
  //   //           },
  //   //           required: ['number1', 'number2'],
  //   //         },
  //   //       },
  //   //     },
  //   //   ],
  //   // });

  //   // const loader = new CheerioWebBaseLoader('https://docs.smith.langchain.com/user_guide');

  //   // const docs = await loader.load();

  //   const prompt = ChatPromptTemplate.fromMessages([
  //     new SystemMessage({
  //       content: 'You are a math bot',
  //     }),
  //     new HumanMessage({
  //       content: 'what is 3.2 * 7.54',
  //     }),
  //     // new SystemMessage({
  //     //   content: 'You are a world class technical documentation writer.',
  //     // }),
  //     // new HumanMessage({
  //     //   content: 'What is langsmith?',
  //     // }),
  //   ]);

  //   // @ts-ignore This doesn't have all the necessary bindings but still functions
  //   const chain = prompt.pipe(ollamaLangchainChat);

  //   // const langchainStream = await chain.stream([
  //   //   new SystemMessage({
  //   //     content: 'You are a weather bot',
  //   //   }),
  //   //   new HumanMessage({
  //   //     content: "What's the weather in TN?",
  //   //   }),
  //   // ]);
  //   const langchainStream = await chain.stream({});
  //   const aiStream = LangChainAdapter.toAIStream(langchainStream);
  //   return new StreamingTextResponse(aiStream);
  // } else {
  /**
   * @todo Look at using maxToolRoundtrips for generative UI
   * @todo Look at using maxToolRoundtrips for generative UI
   * @todo Look at using maxToolRoundtrips for generative UI
   * @todo Look at using maxToolRoundtrips for generative UI
   * @todo Look at using maxToolRoundtrips for generative UI
   * @todo Look at using maxToolRoundtrips for generative UI
   */

  const result = await streamText({
    system: SYSTEM_MESSAGE,
    model: getModel(),
    // model: createOpenAI({})('gpt-3.5-turbo'),
    messages,
    // tools: TOOLS,
  });
  return result.toDataStreamResponse();

  // const data = new StreamData();

  // const stream = result.toAIStream({
  //   async onFinal(completion) {
  //     console.log('completion', completion);
  //     if (!!completion && messages.length === 1) {
  //       const result = await generateText({
  //         model: model,
  //         system:
  //           'You are an assistant that helps create the names of conversations. Create a short and accurate name for the text using brief and simple plain language, using at most 5 words.',
  //         prompt: completion,
  //       });
  //       console.log('naming result', JSON.stringify(result, null, 2));
  //       data.append({
  //         chatName: result.text,
  //       });
  //     }
  //     // const generatedToolsText = await generateText({
  //     //   model: model,
  //     //   system:
  //     //     'You are an assistant that looks to see if any tools can be used to help the user.',
  //     //   /**
  //     //    * @todo genui here
  //     //    */
  //     //   tools: TOOLS,
  //     //   prompt: completion,
  //     // });
  //     // console.log(JSON.stringify(generatedToolsText, null, 2));
  //     console.log(
  //       '--- result = ',
  //       await Promise.all([
  //         result.toolCalls,
  //         result.toolResults,
  //         result.fullStream,
  //         result.usage,
  //       ]),
  //     );
  //     data.close();
  //   },
  // });

  // return new StreamingTextResponse(stream, {});
  // return new StreamingTextResponse(stream, {}, data);
  // }
});
