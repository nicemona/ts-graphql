const { loadFiles } = require('graphql-import-files');

export const typeDefs = loadFiles('**/schemas/*.gql');
