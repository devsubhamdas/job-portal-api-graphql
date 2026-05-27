import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/**/*.graphql',
  generates: {
    './src/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        defaultMappers: 'Partial<T>',
      },
    },
  },
};

export default config;
