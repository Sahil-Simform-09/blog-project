const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
