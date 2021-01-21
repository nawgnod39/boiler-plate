const express =require ("express")
const app = express()
const port = 5000
const bodyParser =require('body-parser');

const config = require('./config/key');
const {User} = require("./models/User");
app.use(bodyParser.urlencoded({extended:true}))//바디파서 가 클라이언트에서 오는 정보를  서버에서 분석해서 가져올수있도록해줌  application /w -www-from-urlencoded 로된걸 분석해줌 

app.use(bodyParser.json());//applicaiton/json

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false
}).then(()=> console.log('mongodb connected...'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>res.send('hello world'))



//register router
app.post('/register',(req,res)=>{
    //회원 가입 할 때 필요한정보 가져오면 그것을 데이터 베이스에 넣어준다.

    const user =new User(req.body) 

    user.save((err,userInfo) => {//비밀번호를 save 하기전에 암호화가 되야한다.
        if(err) return res.json ({ success: false ,err})
        return res.status(200).json({
            success: true
        })
})
})


app.post('/login',(req, res) =>{
//요청된 이메일을 데이터베이스에서 있는지 찾는다.
User.findOne({email:req.body.email},(err,user) =>{
    if(!user){
        return res.json({
            loginSuccess: false,
            message:"제공된 이메일에 해당하는 유저가 없습니다."
        })
    }
//요청된 이메일을 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body,password,(err,isMatch)=>{
        if(!isMatch)
        return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})


        //비밀번호 까지 맞다면 토큰 생성하기.

        user.generateToken((err,user)=>{

        })
    })


})
//요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
//비밀번호가 맞다면 token 생성

})


app.listen(port, () => console.log('Example app listening on port ${port}!'))