const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Container = new Schema({
    trust_id : {
        type : Schema.Types.ObjectId,
        required : true,
        unique : false,
        ref : 'Trust'
    },
    institution_id : {
        type : Schema.Types.ObjectId,
        required : true,
        unique : false,
        ref : 'Institute'
    },
    parent_entity_id:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    container_name : {
        type: String,
        required : true,
        unique : false
    },
    academic_year: {
        type: String,
        required : true,
        unique : false
    },
    performance_report_ids:[{
        type: Schema.Types.ObjectId,
        required: false,
        unique: false
    }],
    student_ids:[{
        type: Schema.Types.ObjectId,
        required: false,
        unique: false,
        ref: 'Student'
    }],
    status:{
        type: String,
        required: true,
        unique: false,
        enum: ['ACTIVE', 'DELETED']
    }
})

// Container.pre('save',(next)=>{
//     if(this.trust_id 
//         && this.institution_id 
//         && this.container_name
//         && this.parent_entity_id
//         && this.academic_year
//     ){
//         next();
//     }else{
//         throw new Error({message: "Data not adequate"});
//     }
// })

module.exports = mongoose.model('Container', Container);