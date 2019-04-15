import mongoose from 'mongoose';

let UsersSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { type: Array, default: [ 'user' ] },
  created_at: {type: Date, default: Date.now},

  updated_at: {type: Date, default: Date.now},
});

export default mongoose.model('users', UsersSchema);