import jwt from 'jsonwebtoken';
import Hash from '../Helpers/Hash';
import Client from '../Models/Client';
import Logger from '../Helpers/Logger';

export default function isAuth(request, response, next) {
  request.context = {
    client: null,
  };
  const token = request.headers['x-refresh-token'] || request.headers['x-access-token'];
  jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
    if (!err) {
      const email = Hash.decrypt(decoded.email);
      (Client.where({ email }).fetch()).then((client) => {
        request.context.token = token;
        request.context.client = client;

        const refreshToken = request.headers['x-refresh-token'];
        if (refreshToken && refreshToken !== client.get('refresh_token')) {
          request.context.client = null;
        }

        next();
      }).catch((error) => {
        Logger.error(error);
        next();
      });
    } else {
      next();
    }
  });
}
