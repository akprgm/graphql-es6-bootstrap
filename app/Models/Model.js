import bookshelf from 'bookshelf';
import bookshelfparanoia from 'bookshelf-paranoia';
import { Mysql } from '../Helpers/Database';

const Knex = (new Mysql()).connection;
const Bookshelf = bookshelf(Knex);
Bookshelf.plugin(bookshelfparanoia);
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');
Bookshelf.plugin('pagination');

export { Knex, Bookshelf };
