// This file is used to store the database configuration
import { type ConnectionOptions } from 'mysql2/typings/mysql/lib/Connection';
import * as dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  db: ConnectionOptions;
  port: number;
  env?: string;
  loglevel?: string;
}

export const config: AppConfig = {
  db: {
    host: process.env.RDS_MYSQL_HOSTNAME,
    user: process.env.RDS_MYSQL_USERNAME,
    password: process.env.RDS_MYSQL_PASSWORD,
    database: process.env.RDS_MYSQL_DB_NAME,
    dateStrings: ['DATE', 'DATETIME'],
    timezone: '+00:00',
  },
  port: process.env.PORT_NUMBER != null ? parseInt(process.env.PORT_NUMBER) : 3000,
};
