const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      timestamps: true
    }   
  }], 
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    comment: {
      type: String
    },
    createdAt: {
      type: Date
    }
  },]
}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);