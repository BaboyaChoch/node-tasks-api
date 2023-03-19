import { type Request, type Response } from 'express';
import type Task from '../service/task.service';
import * as TaskService from '../service/task.service';
import { type ResultSetHeader } from 'mysql2';

const ERROR_WHILE_RETRIEVING_TASKS_MESSAGE = (message: string): string => `Error while retrieving tasks: ${message}`;
const TASK_NOT_FOUND_MESSAGE = (id: string): string => `Task with task_id(${id}) not found`;
const TASK_ID_NOT_PROVIDED_MESSAGE = 'Field task_id is required but is not provided';
const ERROR_WHILE_RETRIEVING_TASK_MESSAGE = (message: string): string => `Error while retrieving task: ${message}`;
const ERROR_WHILE_CREATING_TASK_MESSAGE = (message: string): string => `Error while creating task: ${message}`;
const TASK_CONTENT_NOT_PROVIDED_MESSAGE = 'Task content required but not provided';
const SUCCESSFULLY_CREATED_TASK_MESSAGE = 'Successfully created task';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  TaskService.getAllTasks()
    .then((results: Task[]) => {
      res.status(200).json({ data: results });
    })
    .catch((error: any) => {
      res.status(500).json({ message: ERROR_WHILE_RETRIEVING_TASKS_MESSAGE(error.message) });
    });
};

export const get = async (req: Request, res: Response): Promise<void> => {
  if (req.params.id !== '' || req.params.id !== undefined) {
    TaskService.getTask(req.params.id)
      .then((results: Task[]) => {
        if (results.length > 0) {
          res.status(200).json({ data: results[0] });
        } else {
          res.status(404).json({ message: TASK_NOT_FOUND_MESSAGE(req.params.id) });
        }
      })
      .catch((error: any) => {
        res.status(500).json({ message: ERROR_WHILE_RETRIEVING_TASK_MESSAGE(error.message) });
      });
  } else {
    res.status(400).json({ message: TASK_ID_NOT_PROVIDED_MESSAGE });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  if (req.body.content !== '' || req.body.content !== undefined) {
    TaskService.addTask(req.body.content)
      .then((results: ResultSetHeader) => {
        res.status(201).json({ message: SUCCESSFULLY_CREATED_TASK_MESSAGE });
      })
      .catch((error: any) => {
        res.status(500).json({ message: ERROR_WHILE_CREATING_TASK_MESSAGE(error.message) });
      });
  } else {
    res.status(400).json({ message: TASK_CONTENT_NOT_PROVIDED_MESSAGE });
  }
};
