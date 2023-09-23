import jwt from 'jsonwebtoken';
const validateToken = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  return jwt.decode(token);
};

const protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization ? authorization.split(' ')[1] : null;
    await validateToken(token);
    next();
  } catch (error) {
    const err = {
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    };

    next(err);
  }
};

export default protect;
