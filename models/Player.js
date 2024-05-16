const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let PlayerSchema=new Schema({
    name:{type:String,required:true,max:40},
    info:{type:String,required:true},
    team:{type:String,required:true}
});
module.exports=mongoose.model('Player',PlayerSchema);