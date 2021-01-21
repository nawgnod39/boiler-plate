const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const saltRounds =10


const userSchema =mongoose.Schema({
    name :{
        type : String,
        maxlength:50

    },
    email:{
        type :String,
        trim: true,
        unique:1

    },
    password:{
        type:String,
        minlength:5

    },
    lastname:{
        type:String,
        maxlength:50
    },
    roel:{
        type: Number,
        default: 0

    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type:Number
    }
})

//유저정보를 저장하기전에  라우터에서 function줘서 함수가 끝나고 진행함.
userSchema.pre('save',function(next){
    var user = this;
    
    if (user.isModified('password')){
        //모델안에서 password가변환될때 암호화를한다.


    bcrypt.genSalt(saltRounds,function(err, salt){
        if(err) return next(err) 
        bcrypt.hash(user.password,salt, function(err,hash){
            if(err) return next(err)
            user.password=hash
            next()
            //비밀번호의 암호화
        })    // plain password 임
    })
}else{
    next()//이게없을시 위에서 멈춤
}
})


userSchema.methods.comparPassword = function(plainPassword,cb){
    //plainPassword  가 암호화된 비밀번호가 맞는지확인한다 .
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err),
            cb(null,isMatch)
    })
}

const User = mongoose.model('User', userSchema)
module.exports ={User} 