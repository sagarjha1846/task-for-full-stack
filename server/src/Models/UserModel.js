import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    message: 'First Name is required',
  },
  lastName: {
    type: String,
    required: true,
    message: 'Last Name is required',
  },
  password: {
    type: String,
    required: true,
    message: 'Password is required',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: { msg: 'Email address already in use!' },
    validate: {
      validator: function (value) {
        // Custom email validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.plugin(uniqueValidator, {
  errors: {
    email: {
      properties: {
        message: 'Email already in use!',
        type: 'unique',
        path: 'email',
        value: 'iam@t.com',
      },
      kind: 'unique',
      path: 'email',
      value: 'iam@t.com',
    },
  },
  _message: 'Error',
  message: 'Email already in use!',
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
