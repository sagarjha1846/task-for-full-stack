import express from 'express';
import userControllers from '../Controllers/UserController.js';
import validations from '../Validations/UserValidation.js';
import protect from '../Middleware/authHandler.js';

const router = express.Router();

router.post('/', validations.validateUser, userControllers.createUser);
router.post('/login', validations.validateLoginUser, userControllers.loginUser);
router.put(
  '/reset-password/:id',
  protect,
  validations.validateResetPassword,
  userControllers.resetPassword
);

export default router;
