import { Bookshelf } from './Model';

class Client extends Bookshelf.Model {
  get tableName() {
    return 'clients';
  }

  get hasTimestamps() {
    return true;
  }

  get softDelete() {
    return ['deleted_at'];
  }

  get hidden() {
    return ['password', 'refresh_token'];
  }

  /** **********************************
   *           RELATIONS
   ********************************** */
}
export default Bookshelf.model('Client', Client);
