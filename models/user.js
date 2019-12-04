import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

const User = mongoose.model ("user", userSchema);
module.exports = User;