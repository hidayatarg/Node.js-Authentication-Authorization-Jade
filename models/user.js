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


});

// Login authentication  
// Authenticate input against database 
UserSchema.statics.authenticate= function (email, password, callback){
    User.findOne({email: email})
    .exec(function (error, user) {
        // error with query simply return
        if (error){
            return callback(error);
        }
        else if(!user){
            // No user with supplied email
            var err = new Error ('User not found.');
            err.status=401;
            return callback(err);
        }

        // There is a user (password, hash password retirved from that user)
        bcrypt.compare(password, user.password, function(error, result){
            // Pasword match
            if(result===true){
                return callback(null, user);
            }
            else{
                return callback();
            }
        })       
    });
}
// call the upper method from index.js



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
