import mysql from 'mysql2';
import { config } from '../config/enviroment';

const db = mysql.createConnection(config.db);

export const query = (sql: string, args: string[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.execute(sql, args, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};
