const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName : {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userImg: {
    type: String
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
