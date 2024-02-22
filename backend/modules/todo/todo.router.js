// Importing Router from Express
import {Router} from 'express';
// Importing Auth Middleware
import {auth} from '../../middleware/auth.js'
// Importing user controller module
import * as todoController from './controller/todo.controller.js';

// Creating a new router instance
const router = Router();
// Define endpoints
router.post('/create',auth(),todoController.create);
router.patch('/update/:id',auth(),todoController.update);
router.delete('/delete/:id',auth(),todoController.remove);
router.get('/',auth(),todoController.getAll);
router.get('/:id',auth(),todoController.getById);
router.patch('/update/status/:id',auth(),todoController.updateStatus);

export default router