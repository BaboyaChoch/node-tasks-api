import { Router } from 'express';
import * as TaskController from '../controller/task.controller';

const router = Router();

/* GET all tasks. */
router.get('/', TaskController.getAll);

/* GET task. */
router.get('/:id', TaskController.get);

/* POST task. */
router.post('/', TaskController.create);

export default router;
