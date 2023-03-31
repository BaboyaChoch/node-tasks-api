import { type Request, type Response } from 'express';
import { type ResultSetHeader } from 'mysql2';
import type Task from '../service/user.service';
import { getAllTasks, getTask, addTask } from '../service/user.service';

const ERROR_WHILE_RETRIEVING_TASKS_MESSAGE: string = 'Error while retrieving tasks';
const ERROR_USER_ID_NOT_PROVIDED_MESSAGE: string = 'Field user_id is required but is not provided';
const ERROR_TASK_ID_NOT_PROVIDED_MESSAGE: string = 'Field task_id is required but is not provided';
const ERROR_TASK_NOT_FOUND_MESSAGE: string = 'Task with provided task_id not found';
const ERROR_WHILE_RETRIEVING_TASK_MESSAGE: string = 'Error while retrieving task';
const ERROR_WHILE_CREATING_TASK_MESSAGE: string = 'Error while creating task';
const ERROR_TASK_CONTENT_NOT_PROVIDED_MESSAGE: string = 'Task content required but not provided';
const SUCCESSFULLY_CREATED_TASK_MESSAGE: string = 'Successfully created task';

export const getAllTasksForUser = (req: Request, res: Response): void => {
  const userId: string = req.params.userId;

  if (userId === '' || userId === undefined) {
    res.status(400).json({ message: ERROR_USER_ID_NOT_PROVIDED_MESSAGE });
    return;
  }

  getAllTasks(userId)
    .then((results: Task[]) => {
      res.status(200).json({ data: results });
    })
    .catch((_error: any) => {
      res.status(500).json({ message: ERROR_WHILE_RETRIEVING_TASKS_MESSAGE });
    });
};

export const getTaskForUser = (req: Request, res: Response): void => {
  const userId: string = req.params.userId;
  const taskId: string = req.params.taskId;

  if (userId === '' || userId === undefined) {
    res.status(400).json({ message: ERROR_USER_ID_NOT_PROVIDED_MESSAGE });
    return;
  }

  if (taskId === '' || taskId === undefined) {
    res.status(400).json({ message: ERROR_TASK_ID_NOT_PROVIDED_MESSAGE });
    return;
  }

  getTask(userId, taskId)
    .then((results: Task[]) => {
      if (results.length > 0) {
        res.status(200).json({ data: results[0] });
      } else {
        res.status(404).json({ message: ERROR_TASK_NOT_FOUND_MESSAGE });
      }
    })
    .catch((_error: any) => {
      res.status(500).json({ message: ERROR_WHILE_RETRIEVING_TASK_MESSAGE });
    });
};

export const postTaskForUser = (req: Request, res: Response): void => {
  const userId: string = req.params.userId;
  const content: string = req.body.content;

  if (userId === '' || userId === undefined) {
    res.status(400).json({ message: ERROR_USER_ID_NOT_PROVIDED_MESSAGE });
    return;
  }

  if (content === '' || content === undefined) {
    res.status(400).json({ message: ERROR_TASK_CONTENT_NOT_PROVIDED_MESSAGE });
    return;
  }

  addTask(userId, content)
    .then((_results: ResultSetHeader[]) => {
      res.status(201).json({ message: SUCCESSFULLY_CREATED_TASK_MESSAGE });
    })
    .catch((_error: any) => {
      res.status(500).json({ message: ERROR_WHILE_CREATING_TASK_MESSAGE });
    });
};
