const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
    first_name: {
        type: String,
        required: false,
        unique: false
    },
    last_name: {
        type: String,
        required: false,
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
        required: false,
        unique: false 
    },
    image_url: {
        type: String,
        required: false,
        default: 'https://expressjs.com/images/express-mw.png'
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    home_address: {
        type: String,
        required: true,
        unique: false
    },
    class: {
        type: String,
        required: false,
        unique: false
    },
    year: {
        type: String,
        required: false,
        unique: false
    },
    division: {
        type: String,
        required: false,
        unique: false
    },
    department: {
        type: String,
        required: false,
        unique: false
    },
    roll_no: {
        type: String,
        required: false,
        unique: false
    },
    admission_no: {
        type: String,
        required: false,
        unique: false
    },
    serial_no: {
        type: String,
        required: false,
        unique: false
    },
    degree: {
        type: String,
        required: false,
        unique: false
    },
    nationality: {
        type: String,
        required: false,
        unique: false
    },
    identity_card_number: {
        type: String,
        required: false,
        unique: false
    },
    date_of_birth: {
        type: String,
        required: false,
        unique: false
    },
    father_name: {
        type: String,
        required: false,
        unique: false
    },
    mother_name: {
        type: String,
        required: false,
        unique: false
    },
    father_phone: {
        type: String,
        required: false,
        unique: false
    },
    mother_phone: {
        type: String,
        required: false,
        unique: false
    },
    other_phone: {
        type: String,
        required: false,
        unique: false
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