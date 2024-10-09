import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * Base
 */
const BaseUiDefinition = z.object({
  component: z.string().describe('Key of the component'),
  description: z
    .string()
    .describe('Description of the component so that the LLM can decide if it should be used'),
});

/**
 * Sources
 */
export const SOURCES_GENUI_NAME = 'Sources';
const sourcesName = z.literal(SOURCES_GENUI_NAME);

export const SourcesComponentSchema = z.object({
  sources: z.array(
    z.object({
      url: z.string().describe('URL of the source'),
      name: z
        .string()
        .describe(
          "Name of the source. If name can't be determined, use the URL. Try to use an organization name or publication name rather than the title of the source.",
        ),
      title: z
        .string()
        .describe(
          "Title of the publication, article or media. If title can't be determined, use the URL.",
        )
        .optional(),
      published: z
        .string()
        .describe(
          'The date of publication of the source. If date of publication cannot be determined, use a blank string.',
        )
        .optional(),
      copyrightInformation: z
        .string()
        .describe(
          'Who the source is currently copyrighted by. If copyright cannot be determined, return a blank string',
        )
        .optional(),
      fileId: z
        .string()
        .describe(
          'The fileId used as a reference for the response. This will be a UUID. "NA" if not applicable.',
        )
        .optional(),
    }),
  ),
});

export type SourcesComponentProps = z.infer<typeof SourcesComponentSchema>;

const sourcesDefinition = BaseUiDefinition.extend({
  component: z.literal('Sources'),
  description: z.literal('If a list of sources is used, this component will display their links.'),
  props: SourcesComponentSchema,
});

/**
 * Weather
 */
export const WEATHER_GENUI_NAME = 'Weather';
export const weatherName = z.literal(WEATHER_GENUI_NAME);

export const WeatherComponentSchema = z.object({
  temperature: z.number().describe('Temperature in the given scale'),
  scale: z.enum(['F', 'C']).describe('Scale of the temperature: F for Fahrenheit, C for Celsius'),
});

export type WeatherComponentProps = z.infer<typeof WeatherComponentSchema>;

const weatherDefinition = BaseUiDefinition.extend({
  component: weatherName,
  description: z.literal('Weather component to display weather information (test component)'),
  props: WeatherComponentSchema,
});

/**
 * Mapping JSON definition
 * This is what the Python server will read from
 */
export const genAiComponentMappingDefinitions = z.discriminatedUnion('component', [
  sourcesDefinition,
  weatherDefinition,
]);

/**
 * AI response payload
 */

export const genAiResponsePayload = z.discriminatedUnion('component', [
  z.object({
    component: sourcesName,
    props: SourcesComponentSchema,
  }),
  z.object({
    component: weatherName,
    props: WeatherComponentSchema,
  }),
]);

export type GenerativeUserInterfaceProps = z.infer<typeof genAiResponsePayload>;

export const exampleResponse = z.object({
  otherFields: z.string(),
  ui: genAiResponsePayload,
});

/**
 * Example server final payload
 * {
 *   ... other things
 *   ui: [
 *     {
 *        component: 'Weather',
 *        props: {
 *          temparature: '25',
 *          scale: 'C'
 *        }
 *     }
 *   ]
 * }
 */

export const jsonGenAiComponentMappingDefinitions = zodToJsonSchema(
  genAiComponentMappingDefinitions,
);
export const jsonResponseSchema = zodToJsonSchema(genAiResponsePayload);

// export const example_readOnServerToSelectComponets = {
//   anyOf: [
//     {
//       type: 'object',
//       properties: {
//         component: { type: 'string', const: 'Sources' },
//         description: {
//           type: 'string',
//           const: 'If a list of sources is used, this component will display their links.',
//         },
//         props: {
//           type: 'object',
//           properties: {
//             sources: {
//               type: 'array',
//               items: {
//                 type: 'object',
//                 properties: { name: { type: 'string' }, url: { type: 'string' } },
//                 required: ['name', 'url'],
//                 additionalProperties: false,
//               },
//             },
//           },
//           required: ['sources'],
//           additionalProperties: false,
//         },
//       },
//       required: ['component', 'description', 'props'],
//       additionalProperties: false,
//     },
//     {
//       type: 'object',
//       properties: {
//         component: { type: 'string', const: 'Weather' },
//         description: {
//           type: 'string',
//           const: 'Weather component to display weather information (test component)',
//         },
//         props: {
//           type: 'object',
//           properties: { temperature: { type: 'string' }, scale: { type: 'string' } },
//           required: ['temperature', 'scale'],
//           additionalProperties: false,
//         },
//       },
//       required: ['component', 'description', 'props'],
//       additionalProperties: false,
//     },
//   ],
//   $schema: 'http://json-schema.org/draft-07/schema#',
// };

// export const example_readOnServerToShapeResponse = {
//   anyOf: [
//     {
//       type: 'object',
//       properties: {
//         component: { type: 'string', const: 'Sources' },
//         props: {
//           type: 'object',
//           properties: {
//             sources: {
//               type: 'array',
//               items: {
//                 type: 'object',
//                 properties: { name: { type: 'string' }, url: { type: 'string' } },
//                 required: ['name', 'url'],
//                 additionalProperties: false,
//               },
//             },
//           },
//           required: ['sources'],
//           additionalProperties: false,
//         },
//       },
//       required: ['component', 'props'],
//       additionalProperties: false,
//     },
//     {
//       type: 'object',
//       properties: {
//         component: { type: 'string', const: 'Weather' },
//         props: {
//           type: 'object',
//           properties: { temperature: { type: 'string' }, scale: { type: 'string' } },
//           required: ['temperature', 'scale'],
//           additionalProperties: false,
//         },
//       },
//       required: ['component', 'props'],
//       additionalProperties: false,
//     },
//   ],
//   $schema: 'http://json-schema.org/draft-07/schema#',
// };
