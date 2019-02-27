/**
 * Helper module
 */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import hasher from 'wordpress-hash-node';

export default class Hash {
  /**
   * Generates hash of given value
   * @param value string
   * @returns hash string
   */
  static generateHash(value) {
    return hasher.HashPassword(value);
  }

  /**
   * @param value string
   * @param hash string
   */
  static compareHash(value, hash) {
    return hasher.CheckPassword(value, hash);
  }

  /**
   * Generates token of given value
   * @param obj Object
   * @param  expireTime string
   * @returns token
   */
  static generateToken(obj, expireTime) {
    return (expireTime) ? jwt.sign(obj, process.hope.app.key, { expiresIn: expireTime }) : jwt.sign(obj, process.hope.app.key);
  }


  /**
   * @param token string
   * @returns decoded data
   */
  static verifyToken(token) {
    return jwt.verify(token, process.hope.app.key);
  }

  /**
   * Encrypt data
   * @param data
   * @return encrypted data
   */
  static encrypt(data) {
    const cipher = crypto.createCipher(
      process.hope.hash.encrypt_algorithm,
      process.hope.app.key,
    );
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  /**
   * Decrypt data
   * @param encrypted data
   * @return decrypted data
   */
  static decrypt(encryptedData) {
    const decipher = crypto.createDecipher(
      process.hope.hash.encrypt_algorithm,
      process.hope.app.key,
    );
    let dec = decipher.update(encryptedData, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
