import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minLength: [5, 'name cannot have less than 5 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'invalid email {VALUE} provided'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
    minLength: [8, 'password must of alteast 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm password is required'],
    validate: {
      validator: function (v) {
        return this.password === v;
      },
      message: 'confirm passsword - {VALUE} and password doest match',
    },
  },
  roles: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} is invalid role',
    },
    default: 'user',
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
  }
});

userSchema.methods.checkPassword = async function (postedPassword, dbPassword) {
  const isCorrect = await bcrypt.compare(postedPassword, dbPassword);
  return isCorrect;
};

export default mongoose.models.Pusher || mongoose.model('Pusher', userSchema);
