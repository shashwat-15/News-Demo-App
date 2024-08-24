import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'News'
  }],
  searchHistory: [{
    query: String,
    date: { type: Date, default: Date.now }
  }]
});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
