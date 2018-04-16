const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InstituteAdmin = new Schema({
  name: {
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
  auth_id: {
    type: Schema.Types.ObjectId,
    required: false,
    unique: false
  },
  parent_trust_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Trust',
    unique: false
  },
  parent_institute_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Institute',
    unique: false
  }
});

module.exports = mongoose.model('InstituteAdmin', InstituteAdmin);
