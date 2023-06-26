const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);