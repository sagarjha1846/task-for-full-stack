import Joi from 'joi';

const reEmail =
  /^(([^'{}<>()\[\]\\._\-$%^*?\-|=`/~+&!,#;:\s@"]+(\.[^'{}<>()\[\]\\._\-$%^*/~+&?=`\-|!,#;:\s@"]+)*)|(".+"))@(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,})$/;
const rePassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

const userSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().pattern(reEmail).message('Invalid Email').required(),
    password: Joi.string()
      .pattern(rePassword)
      .message(
        'Use 8-16 characters with mix of letters (A-z),(a-z), numbers (0-9) and special characters'
      )
      .required(),
  });

const userLoginSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().pattern(reEmail).message('Invalid Email').required(),
    password: Joi.string().required(),
  });

const resetPasswordSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .pattern(rePassword)
      .message(
        'Use 8-16 characters with mix of letters (A-z),(a-z), numbers (0-9) and special characters'
      )
      .required(),
  });

const validateSchema = (body, model) => {
  const { error } = model.validate(body);
  if (error) {
    const errorList = [];
    error.details.forEach((err) => {
      errorList.push({
        code: err.path[0],
        message: err.message.replace(/['"]+/g, ''),
      });
    });

    throw errorList;
  } else {
    return true;
  }
};

// Validate user data against the schema
const validateUser = (req, res, next) => {
  try {
    validateSchema(req.body, userSchema);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        message: error || ' error in validating token (connection error) ',
      },
    });
  }
};

const validateLoginUser = (req, res, next) => {
  try {
    validateSchema(req.body, userLoginSchema);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        message: error || ' error in validating token (connection error) ',
      },
    });
  }
};

const validateResetPassword = (req, res, next) => {
  try {
    validateSchema(req.body, resetPasswordSchema);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        message: error || ' error in validating token (connection error) ',
      },
    });
  }
};

const dataValidations = {
  validateUser,
  validateLoginUser,
  validateResetPassword,
};

export default dataValidations;
