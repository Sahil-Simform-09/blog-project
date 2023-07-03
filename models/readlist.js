const mongoose = require('mongoose');

const readListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  blogList: [{
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
  }]
}, {timestamps: true});

module.exports = mongoose.model('ReadList', readListSchema);