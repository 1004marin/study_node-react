const express = require('express')
const app = express()//새로운 express앱만들기
const port = 9000

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {User} = require("./server/model/User.js");
const {auth} = require("./server/middleware/auth.js");

app.use(bodyParser.urlencoded({extended:true}))
//application/x-www-form-urlencoded된 데이터를 분석할 수 있게
app.use(bodyParser.json());
//aaplication/json타입으로 된 것을 분석할 수 있게
app.use(cookieParser());


const mongoose= require('mongoose')
const config = require('./server/config/key.js');

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(config, config.mongoURI))


app.get('/', (req, res) => res.send('녕안녕LD!'))

//엔드포인트 register
app.post('/api/users/register', async(req,res) => {


    const user = new User(req.body)

    try{
        await user.save();//save전 암호화 필요
        return res.status(200).json(
            {success: true})
        }
    catch (err){
        return res.json({success:false, err})
    }
    

})
app.post('/api/users/login', async(req,res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다. mongo 메서드
    User.findOne({email:req.body.email})
    .then((user) => {
        if(!user){
            return res.json({
                loginSucess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }else
        user.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSucess: false, message: "비밀번호가없어여"})
            else //비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {//400은 err
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지, 세션
                res.cookie("amu_name_forCookie", user.token)
                .status(200)
                .json({loginSucess: true, userId: user._id})
                console.log("로그인성공햇어염")
            })
        })
    })
    .catch((err)=> {
        return res.status(400).send(err);
    })
})


//role ->  일반 유저, role 0이 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {

    //auth 미들웨어: 엔드포인트에 요청을 받고 callback func하기 전에 중간 수행
    //여기까지 미들웨어를 통과해왔다 = auth가 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
        //이외에 user정보 다 리턴하면, 어떤페이지에서든지 유저정보 이용 가능
    })
})

//로그아웃
/*
app.get('api/users/logout', auth, (req,res) => {
    //로그아웃하려는 유저를 찾아서 데이터 업데이트 시켜주기

    //auth 미들웨어에서 넣어준 req.user에서 가져옴
    User.findOneAndUpdate({_id: req.user._id},
        {token:""}
        ,(err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({sucess: true})
        })
})
*/
app.get('/api/users/logout', auth, async(req, res) => {
    
    const user = await User.findOneAndUpdate({_id: req.user._id}, {token: ""});
    if (!user) {
      return res.json({success: false, err});
    }
    return res.status(200).send({success: true});
})

app.get('/api/hello', (req,res) => {
    res.send(".안뇽하세욤~~")
})
app.listen(port, () => console.log('Example app listening on port안뇽 $`{port}`!'))
