import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://bootcamp:bootcamp@cluster0-km39a.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})

export const User = mongoose.model ("user", userSchema);


