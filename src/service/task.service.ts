import { query } from './db.service';
import { v4 as uuidv4 } from 'uuid';
import { ResultSetHeader } from 'mysql2';
import { config } from '../config/enviroment';

export default interface Task {
  task_id: string;
  task_content: string;
  task_date_created: Date;
  task_date_updated: Date;
}

export const getAllTasks = (): Promise<Task[]> => {
  return query(
    `SELECT task_id, task_content, task_date_created, task_date_updated 
                    FROM task WHERE user_id = ?
                    ORDER BY task_date_updated DESC`,
    [config.currentUserId],
  ) as Promise<Task[]>;
};

export const getTask = (id: string): Promise<Task[]> => {
  return query(
    `SELECT task_id, task_content, task_date_created, task_date_updated 
                    FROM task WHERE user_id = ? AND task_id = ?`,
    [config.currentUserId, id],
  ) as Promise<Task[]>;
};

export const addTask = (content: string): Promise<ResultSetHeader> => {
  return query(
    `INSERT INTO task (task_id, task_content, task_date_created, task_date_updated, user_id) 
                    VALUES (?, ?, NOW(), NOW(), ?)`,
    [uuidv4(), content, config.currentUserId],
  ) as Promise<ResultSetHeader>;
};
