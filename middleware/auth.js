const {User} = require('../models/Userx')
let auth =(req, res ,next) =>{

    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token =req.cookies.x_auth

    //토큰은을 복호화 한후 유저를 찾는다.

    User.findByToken()

    // 유저가 있으면 인증 OKAY


    //유저가 없으면 인증 NO

}

module.exports ={auth};