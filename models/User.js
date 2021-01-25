const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const saltRounds =10
const jwt =require('jsonwebtoken')



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


userSchema.methods.generateToken =function(cb){
    //jsonwebtoken 을 이용해서 token 생성
    var user =this;
    var token = jwt.sign(user._id.toHexString(),'secretToken')//_id 는 db에 있는 아이디

    //user._id + 'secretToken ' = token
    user.token = token 
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken =function(token,cb){
    var user= this;

    //user._id + '' = token
    //토큰을 Decode 한다
    jwt.verify(token,'secretToken',function(err,decoded){
        //유저아이디를 이용해서
        //유저를 찾은 다음에 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지
        //확인

        user.findOne({"_id":decoded,"token": token},function(err, user){
            if(err) return cb(err);
            cb (null, user)

        })

    })


    jwt.verify(token,'shhhh',function(err,decoded){
        console.log(decoded.foo)//bar
        //유저 아이디를 이용해서 유저를 찾은 ㅇ다음에 
        //클라이언트에서 가져온 token 과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded ,"token":token},function(err,user){
            
        }
        )
    });
}
const User = mongoose.model('User', userSchema)
module.exports ={User} 