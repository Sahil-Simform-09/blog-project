const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    const err = new Error(error); 
    err.httpStatusCode = 500;
    throw err;
  }
};
module.exports = connectDB;
