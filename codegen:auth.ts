import type { CodegenConfig } from '@graphql-codegen/cli';

export default {
  overwrite: true,
  schema: {
    'http://localhost:8080/v1/graphql': {
      headers: {
        'X-Hasura-Admin-Secret': 'localsecret1',
        'Content-Type': 'application/json',
      },
    },
  },
  emitLegacyCommonJSImports: false,
  documents: 'src/services/server/graphql/auth/*.ts',
  generates: {
    'src/types/generated/auth/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        skipTypename: true,
        enumsAsTypes: true,
        strictScalars: true,
        useTypeImports: true,
        scalars: {
          timestamptz: 'string',
          uuid: 'string',
          jsonb: 'Record<string, any>',
        },
      },
    },
  },
} satisfies CodegenConfig;
