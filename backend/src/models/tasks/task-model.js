const mongoose  =   require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide a title'],
    },
    description:{
        type:String,
        required:[true,'Please provide a description'],
    },
    dueDate:{
        type:Date,
        default:Date.now(),
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active',
    },
    completed:{
        type:Boolean,
        default:false,
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'low',
    },
    user:{
        // type:mongoose.Schema.ObjectId,
        // ref:'User',
        type:String,
        required:true,
    },
},
{timestamps:true,minimize:true}
)
const Task = mongoose.model('Task',TaskSchema);

module.exports = Task;