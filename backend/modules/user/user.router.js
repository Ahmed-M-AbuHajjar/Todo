// Importing Router from Express
import {Router} from 'express';
// Importing user controller module
import * as userController from './controller/user.controller.js'

// Creating a new router instance
const router = Router();

// Define endpoints
router.post('/signup', userController.signUp);
router.post('/signin',userController.signIn);

export default router