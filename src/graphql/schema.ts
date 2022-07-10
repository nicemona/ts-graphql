const glob = require('glob');
const fs = require('fs');
const path = require('path');

const files = glob.sync('*.gql', { cwd: path.join(__dirname, './schemas') });
export const typeDefs = files
  .map((file: string) => {
    return fs.readFileSync(path.join(__dirname, './schemas', file), 'utf8');
  })
  .join('\n');
