const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Institute = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: string,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: false,
    unique: true
  },
  created_by: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    created_on: {
      type: Date,
      default: Date.now
    }
  },
  website: {
    type: String,
    required: false
  },
  document_link: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Institute', Institute);
