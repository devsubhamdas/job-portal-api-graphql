import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/**/*.graphql',
  generates: {
    './src/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../graphql/context/context#Context',
        defaultMappers: 'Partial<T>',
        mappers: {
          Job: '../generated/prisma/client#Job',
        },
        scalars: {
          DateTime: 'Date',
        },
      },
    },
  },
};

export default config;
