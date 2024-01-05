const {User} = require('../model/User')

let auth = (req, res, next) => {
    //인증 처리를 하는 곳

    //client 쿠키에서 토큰 가져온다. 
    let token = req.cookies.amu_name_forCookie;

    //토큰을 복호화 한 후, 유저를 찾는다.
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, errorr: true})

        req.token = token;//index.js에서 사용가능하게
        req.user = user;
        next();//auth 미들웨어 이후 진행가능하게. 없으면 계속 auth에만 갇힘

    })
    //유저가 있으면 인증 okay

    //유저가 없으면 인증 NO!
}
module.exports =  {auth};