import { query } from './db.service';
import { v4 as uuidv4 } from 'uuid';
import { type ResultSetHeader } from 'mysql2';

export default interface Task {
  task_id: string;
  task_content: string;
  task_date_created: Date;
  task_date_updated: Date;
}

export const getAllTasks = async (userId: string): Promise<Task[]> => {
  return (await query(
    `SELECT task_id, task_content, task_date_created, task_date_updated
                    FROM task WHERE user_id = ?
                    ORDER BY task_date_created DESC`,
    [userId],
  )) as Task[];
};

export const getTask = async (userId: string, taskId: string): Promise<Task[]> => {
  return (await query(
    `SELECT task_id, task_content, task_date_created, task_date_updated
                    FROM task WHERE user_id = ? AND task_id = ?`,
    [userId, taskId],
  )) as Task[];
};

export const addTask = async (userId: string, content: string): Promise<ResultSetHeader[]> => {
  return (await query(
    `INSERT INTO task (task_id, task_content, task_date_created, task_date_updated, user_id)
                    VALUES (?, ?, NOW(), NOW(), ?)`,
    [uuidv4(), content, userId],
  )) as ResultSetHeader[];
};
