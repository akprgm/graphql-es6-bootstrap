/**
 * module for intialzing redis connection
 */

import redis from 'redis';

export default class Redis {
  /**
   * creates connection with redis server
   */
  constructor() {
    const proto = Object.getPrototypeOf(this);
    if (!proto.connection) {
      proto.connection = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        detect_buffers: true,
      });
    }
  }
}
