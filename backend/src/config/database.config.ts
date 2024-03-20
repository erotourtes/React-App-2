import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getOrThrow } from './utils/getOrThrow';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    username: getOrThrow('DATABASE_USERNAME'),
    password: getOrThrow('DATABASE_PASSWORD'),
    database: getOrThrow('DATABASE_NAME'),
    host: getOrThrow('DATABASE_HOST'),
    port: +getOrThrow('DATABASE_PORT'),
    synchronize: true,
    ssl: getOrThrow('DATABASE_SSL') === 'true',
  }),
);
