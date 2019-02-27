import Client from '../Models/Client';

export default class ClientRepository {
  /**
   * find client
   * @param {*} clientObj
   * @returns collection
   */
  find(clientObj = {}) {
    return Client.where(clientObj).fetch({ withDeleted: true });
  }

  /**
   * create client method
   * @param {*} clientObj
   * @returns collection
   */
  create(clientObj) {
    return new Client().save(clientObj);
  }
}
