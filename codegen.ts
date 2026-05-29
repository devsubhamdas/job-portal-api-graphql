import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/**/*.graphql',
  generates: {
    './src/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true, // splits value vs type imports
        emitLegacyCommonJSImports: false, // adds .js extensions
        contextType: '../graphql/context/context.js#Context',
        defaultMappers: 'Partial<T>',
        mappers: {
          Job: '../generated/prisma/client.js#Job as PrismaJob',
        },
        scalars: {
          DateTime: 'Date',
        },
      },
    },
  },
};

export default config;
