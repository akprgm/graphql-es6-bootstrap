/**
 * module for intializing all service required by app
 */

import Mongo from './Initializers/mongo';
import Mysql from './Initializers/mysql';
import Redis from './Initializers/redis';
// import Socket from './Initializers/socket';

export default class Bootstrap {
  static intializeServices() {
    const promiseStack = [];
    // checks if mongo connection required by app
    if (process.env.IS_MONGO === 'true' && process.hope.db.connection === 'mongo') {
      const mongoPromise = new Promise((resolve, reject) => {
        try {
          const mongo = new Mongo();
          resolve(mongo.connection);
        } catch (error) {
          reject(new Error('Unable to create connection with mongo, please make sure mongo server is running.'));
        }
      });
      promiseStack.push(mongoPromise);
    }

    // checks if mysql connection required by app
    if (process.hope.db.connection === 'mysql') {
      const mysqlPromise = new Promise((resolve, reject) => {
        const mysql = new Mysql();
        mysql.connection.raw('select 1+1 as result').then(() => {
          resolve(mysql.connection);
        }).catch(() => {
          reject(new Error('Unable to create connection with mysql, please make sure mysql server is running.'));
        });
      });
      promiseStack.push(mysqlPromise);
    }

    // checks if redis connection required by app
    if (process.env.IS_REDIS === 'true' && process.hope.queue_driver === 'redis') {
      const redisPromise = new Promise((resolve, reject) => {
        const redis = new Redis();
        redis.connection.on('error', (error) => {
          if (error) {
            reject(new Error('Unable to create connection with redis, please make sure redis server is running.'));
          }
          resolve(redis.connection);
        });
      });
      promiseStack.push(redisPromise);
    }

    // Checks for socket connection
    // if (process.env.IS_SOCKET === 'true') {
    //   const socketPromise = new Promise((resolve, reject) => {
    //     try {
    //       const socket = new Socket();
    //       resolve(socket.connection);
    //     } catch (error) {
    //       reject(new Error('Unable to create connection with socket server, please make sure socket server is running.'));
    //     }
        
    //   });
    //   promiseStack.push(socketPromise);
    // }
    return promiseStack;
  }
}
