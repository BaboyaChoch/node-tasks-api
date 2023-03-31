import { Router } from 'express';
import * as TaskController from '../controller/user.controller';

const router = Router();

/* GET all tasks. */
router.get('/:userId/tasks', TaskController.getAllTasksForUser);

/* GET task. */
router.get('/:userId/tasks/:taskId', TaskController.getTaskForUser);

/* POST task. */
router.post('/:userId/tasks', TaskController.postTaskForUser);

export default router;
