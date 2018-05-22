const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const UserAuthModel = new Schema(
    {
        username: {type: String, required: true, unique: false},
        password: {type: String, required: true, unique: false},
        registered_id: {type: Schema.Types.ObjectId, required: true, unique: true},
        email: {type: String, required: true, unique:true},
        phone: {type: String, required: true, unique: true},
        user_type: {type: String, required: true, unique: false},
        status: {
            tag: {type: String, enum: ['ACTIVE', 'DELETED'], default: 'ACTIVE'},
            toggled_by: {username: String, userAuth_id: Schema.Types.ObjectId}
          }
    }
);



module.exports = Mongoose.model('UserAuth', UserAuthModel, 'Authentication');