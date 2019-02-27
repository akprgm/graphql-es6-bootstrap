/**
 * module for creating mongodb connection
 */

import mongoose from 'mongoose';

export default class Mongo {
  /**
   * creates connection with mongodb
   */
  constructor() {
    const proto = Object.getPrototypeOf(this);
    if (!proto.connection) {
      proto.connection = mongoose.connect(`mongodb://${process.hope.db.user}:${process.hope.db.password}@${process.hope.db.host}:${process.hope.db.port}/${process.hope.db.database}`);
    }
  }
}
