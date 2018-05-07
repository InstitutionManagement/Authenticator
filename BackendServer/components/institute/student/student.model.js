const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true 
  },
  image_url: {
    type: String,
    required: false,
    default: 'https://expressjs.com/images/express-mw.png'
  },
  address: {
    type: String,
    required: true,
    unique: false
  },
  class: {
    type: String,
    required: true,
    unique: false
  },
  roll_no: {
    type: String,
    required: true,
    unique: false
  },
  student_id: {
    type: String,
    required: true,
    unique: true
  },
  registration_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  status: {
    tag: {
      type: String,
      enum: ['ACTIVE', 'DELETED'],
      default: 'ACTIVE'
    },
    toggled_by: {
      username: String,
      userAuth_id: Schema.Types.ObjectId
    }
  }
});

module.exports = mongoose.model('Student', Student);