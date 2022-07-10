import { users } from '../../../database/mockdb';
export const userResolver = {
  Query: {
    users: () => users,
  },
};
