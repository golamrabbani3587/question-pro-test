import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Migrations1713605424582 } from './migrations/1713605424582-migrations';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'test',
  entities: [User],
  migrations: [Migrations1713605424582],
  synchronize: true,
};

export default typeOrmConfig;
