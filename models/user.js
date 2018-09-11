var mongoose= require('mongoose');
var UserSchema= new mongoose.Schema({
   // email: String,

   email:{
       type: String,
       unique:true,
       required:true,
       //remove white space might type accidently
       trim:true
   },
   name:{
       type:String,
       required:true,
       trim:true
   },
   favoriteBook:{
       type:String,
       required:true,
       trim:true
   },
   password:{
       type:String,
       required:true
   }


})


// To use the schema in application we need to export 
var User=mongoose.model('User',UserSchema);
module.exports=User;