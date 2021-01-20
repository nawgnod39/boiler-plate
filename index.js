const express =require ("express")
const app = express()
const port = 5000
const bodyParser =require('body-parser');
const {User} = require("./models/User");
app.use(bodyParser.urlencoded({extended:true}))//바디파서 가 클라이언트에서 오는 정보를  서버에서 분석해서 가져올수있도록해줌  application /w -www-from-urlencoded 로된걸 분석해줌 

app.use(bodyParser.json());//applicaiton/json

const mongoose = require('mongoose')

mongoose.connect('mongodb://takdongwan:ekfrrkfql1@boiler-plate-shard-00-00.8rzdm.mongodb.net:27017,boiler-plate-shard-00-01.8rzdm.mongodb.net:27017,boiler-plate-shard-00-02.8rzdm.mongodb.net:27017/boiler-plate?ssl=true&replicaSet=atlas-zozl20-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false
}).then(()=> console.log('mongodb connected...'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>res.send('hello world'))


app.post('/register',(req,res)=>{
    //회원 가입 할 때 필요한정보 가져오면 그것을 데이터 베이스에 넣어준다.

    const user =new User(req.body)

    user.save((err,userInfo) => {
        if(err) return res.json ({ success: false ,err})
        return res.status(200).json({
            success: true
        })
})
})


app.listen(port, () => console.log('Example app listening on port ${port}!'))