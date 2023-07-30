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
      type: mongoose.Schema.Types.ObjectId,
      createdAt: new Date(),
      index: false
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

// create search index
blogSchema.index(
  {
    title: 'text',
    content: 'text'
  }, {
    weights: {
      title: 2,
      content: 1
    }
  }
);
module.exports = mongoose.model('Blog', blogSchema);