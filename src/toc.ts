const { DataSource } = require('typeorm');
const { User } = require('./user/user.entity');
import { Migrations1713711005925 } from './migrations/1713711005925-migrations';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'test',
  entities: [User],
  migrations: [Migrations1713711005925],
  synchronize: true,
});
module.exports = dataSource;
