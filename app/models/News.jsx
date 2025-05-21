// models/News.jsx
import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  date: Date,
  source: String,
});

export default mongoose.models.News || mongoose.model('News', NewsSchema);
