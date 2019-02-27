import AuthService from '../../Services/AuthService';
import * as Exceptions from '../../Exceptions/Exceptions';

exports.resolver = {
  Query: {
    /**
     * login user
     * @param {*} root
     * @param {*} args
     * @param {*} context
     * @param {*} info
     * @returns client object
     */
    login(root, args) {
      const authService = new AuthService();
      return authService.login(args);
    },

    /**
     * get new access token
     * @param {*} root
     * @param {*} args
     * @param {*} context
     * @param {*} info
     * @return acess_token string
     */
    accessToken(root, args, context) {
      if (!context.client || context.client.get('refresh_token') !== context.token) {
        throw (new Exceptions.UnauthorizedException());
      }

      const authService = new AuthService();
      return authService.accessToken(context.client);
    },
  },

  Mutation: {
    /**
     * register client
     * @param {*} root
     * @param {*} args
     * @param {*} context
     * @param {*} info
     * @returns client object
     */
    register(root, args) {
      const authService = new AuthService();
      return authService.register(args);
    },

    /**
     * forgot password
     * @param {*} root
     * @param {*} args
     */
    forgotPassword(root, args) {
      const authService = new AuthService();
      return authService.forgotPassword(args);
    },

    /**
     * reset password
     * @param {*} root
     * @param {*} args
     */
    resetPassword(root, args) {
      const authService = new AuthService();
      return authService.resetPassword(args);
    },
  },
};
