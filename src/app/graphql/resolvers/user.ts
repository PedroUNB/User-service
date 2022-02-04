import { UserService } from '@service/User.service';

const resolvers = {
  Query: {
    userHelloWorld: () => 'Hello world from Apollo Server',

    getUserById: (parent, { userId }) => {
      const userService = new UserService();
      return userService.getUserById(userId);
    },

    getUserList: (parent, { filter }) => {
      const userService = new UserService();
      return userService.getUserList(filter);
    }
  },
  Mutation: {
    createUser: (parent, { createUserInput }) => {
      const userService = new UserService();
      return userService.createUser(createUserInput);
    },

    updateUser: (parent, { userId, updateUserInput }) => {
      const userService = new UserService();
      return userService.updateUser(userId, updateUserInput);
    },

    removeUser: (parent, { userId }) => {
      const userService = new UserService();
      return userService.removeUser(userId);
    }
  }
};

export default resolvers;
