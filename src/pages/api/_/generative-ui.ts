import { NextRequest } from 'next/server';
import { jsonGenAiComponentMappingDefinitions, jsonResponseSchema } from 'constants/genui';
import { responseJson200Success } from 'utils/server/edge/http';
import { HttpMethods, withHttpMethods } from 'utils/server/edge/middleware/withHttpMethods';

export const config = {
  runtime: 'edge',
};

const GET = function (request: NextRequest) {
  return responseJson200Success(request, {
    componentDefinitions: jsonGenAiComponentMappingDefinitions,
    outputOptionsAndStructure: jsonResponseSchema,
    outputExample: {
      ui: [
        {
          component: 'Weather',
          props: {
            temparature: '25',
            scale: 'C',
          },
        },
        // any number of additional UI components
      ],
    },
  });
};

export default withHttpMethods({
  [HttpMethods.Get]: GET,
});
