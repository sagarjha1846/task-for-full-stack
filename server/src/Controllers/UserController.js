import sendResponse from '../Middleware/responseHandler.js';
import userService from '../Services/UserService.js';
import utils from '../utils/index.js';

const userControllers = {
  createUser: async (req, res, next) => {
    try {
      const { body } = req;
      const { password, ...rest } = body;
      let hashPassword = await utils.getHashedPassword(password);
      const user = await userService.createUser({
        ...rest,
        password: hashPassword,
      });
      sendResponse(
        res,
        { user, message: 'User was successfully created!' },
        201
      );
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { body } = req;
      const { email, password } = body;
      const resp = await userService.loginUser(email, password);
      sendResponse(res, resp, 200);
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const { newPassword, oldPassword } = body;
      const resp = await userService.resetPassword(
        newPassword,
        oldPassword,
        id
      );
      sendResponse(res, resp, 200);
    } catch (error) {
      next(error);
    }
  },
};

export default userControllers;
