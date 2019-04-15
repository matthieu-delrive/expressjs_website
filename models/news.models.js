import mongoose from 'mongoose';

let NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  image: { type: String, required: true },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});

export default mongoose.model('news', NewsSchema);