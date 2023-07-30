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
  blogs: [{
    type: mongoose.Types.ObjectId,
    ref: "Blog"
  }],
  imgUrl: {
    type: String
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
