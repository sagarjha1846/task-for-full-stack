import genericServices from '../GenericServices/genericService.js';
import UserModel from '../Models/UserModel.js';
import utils from '../utils/index.js';

const userService = {
  createUser: async (data) => {
    const resp = await genericServices.create(data, UserModel);
    return resp;
  },
  loginUser: async (email, password) => {
    try {
      const getUserDetail = await genericServices.fetch({ email }, UserModel);
      if (getUserDetail) {
        const compareHashPassword = await utils.compareHashPassword(
          password,
          getUserDetail.password
        );
        if (compareHashPassword) {
          const token = await utils.generateToken({ id: getUserDetail.id });
          return { ...getUserDetail, token };
        } else {
          throw {
            statusCode: 403,
            message: 'Email or Password is incorrect!',
          };
        }
      } else {
        throw {
          statusCode: 403,
          message: 'User not found!',
        };
      }

     
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (newPassword, oldPassword, id) => {
    try {
      const getUserDetail = await genericServices.fetch({ _id: id }, UserModel);
      const compareHashPassword = await utils.compareHashPassword(
        oldPassword,
        getUserDetail.password
      );
      if (compareHashPassword) {
        const hashPassword = await utils.getHashedPassword(newPassword);
        const updatePassword = await genericServices.update(
          { _id: id },
          { password: hashPassword },
          UserModel
        );
        return updatePassword;
      }
      throw { statusCode: 403, message: 'Password is incorrect!' };
    } catch (error) {
      throw { message: error.message };
    }
  },
};

export default userService;
