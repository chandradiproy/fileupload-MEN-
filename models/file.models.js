const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filetype:{
        type:String
    },
    size:{type:Number},
    uploadedBy:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    uploadedAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('File',fileSchema);