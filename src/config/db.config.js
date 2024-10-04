import mongoose from 'mongoose';

const dbConfig = {
  url: 'mongodb://localhost:27017/mydb'
};

// Connect to MongoDB using the URL
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });
