import mysql from 'mysql2';
import { config } from '../config/enviroment';

const db = mysql.createPool(config.db);

export const query = async (sql: string, args: string[] = []): Promise<any[]> => {
  const [rows] = await db.promise().query(sql, args);
  return rows;
};
