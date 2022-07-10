import { getUsers } from '../../utils';

export const userResolver = {
  Query: {
    users: () => getUsers(),
  },
};
