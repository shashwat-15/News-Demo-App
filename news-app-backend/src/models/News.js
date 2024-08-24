import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: String,
  source: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  description: String,
});

const News = mongoose.model('News', newsSchema);

export default News;
