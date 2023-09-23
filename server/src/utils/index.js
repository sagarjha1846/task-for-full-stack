import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;

const utils = {
  compareHashPassword: async (password, dbPassword) => {
    const doesPasswordMatch = await bcrypt.compare(password, dbPassword);
    return doesPasswordMatch;
  },
  getHashedPassword: async (password) => {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // Store the hashed password in your database or use it as needed

      return hash;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  generateToken: async (id) => {
    try {
      return await jwt.sign(id, secretKey, { expiresIn: '1h' });
    } catch (error) {
      throw error;
    }
  },
};

export default utils;
