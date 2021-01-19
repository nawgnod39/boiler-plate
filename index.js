const express =require ("express")
const app = express()
const port = 5000

const {User} = require()
const mongoose = require('mongoose')

mongoose.connect('mongodb://takdongwan:ekfrrkfql1@boiler-plate-shard-00-00.8rzdm.mongodb.net:27017,boiler-plate-shard-00-01.8rzdm.mongodb.net:27017,boiler-plate-shard-00-02.8rzdm.mongodb.net:27017/boiler-plate?ssl=true&replicaSet=atlas-zozl20-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false
}).then(()=> console.log('mongodb connected...'))
.catch(err=>console.log(err))


app.get('/',(req,res)=>res.send('hello world'))


app.post('/register',(req,res)=>{
    //회원 가입 할 때 필요한정보 가져오면 그것을 데이터 베이스에 넣어준다.
    
}


)
app.listen(port, () => console.log('Example app listening on port ${port}!'))