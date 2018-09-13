var mongoose= require('mongoose');
var bcrypt= require('bcrypt');
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
// Hash password before saving to database
UserSchema.pre('save',function(next){
    // before the save
    // user--the data that mongoose will write to mangoDB
    var user= this;

    // 10 - how many time to apply the encryption algorithm
    bcrypt.hash(user.password, 10, function(err,hash){
        if(err){
            return next(err);
        }
        user.password=hash;
        next();
    });
});

// To use the schema in application we need to export 
var User=mongoose.model('User',UserSchema);
module.exports=User;
