import { mergeResolvers, mergeTypeDefs } from '@graphql-toolkit/schema-merging';
import { loadFilesSync } from '@graphql-tools/load-files';

import path from 'path';

const typesArray = loadFilesSync(path.join(__dirname, 'schemas', '**'));
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(path.join(__dirname, 'resolvers', '**'));
const resolvers = mergeResolvers(resolversArray);

export { typeDefs, resolvers };
