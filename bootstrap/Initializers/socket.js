/**
 * module for opening socket port
 */
import SCClient from 'socketcluster-client';

export default class Socket {
  /**
   * Initialising Socket Connection
   */
  constructor() {
    if (process.env.IS_SOCKET === 'true') {
      const proto = Object.getPrototypeOf(this);
      if (!proto.socket) {
        this.socket = SCClient.connect({
          hostname: process.env.SOCKET_HOSTNAME || 'localhost',
          port: process.env.SOCKET_PORT || '4000',
          rejectUnauthorized: process.env.SOCKET_AUTHORIZED || true,
        });
      }
    }
  }
}
