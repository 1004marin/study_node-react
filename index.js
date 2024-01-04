const express = require('express')
const app = express()//새로운 express앱만들기
const port = 9000

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {User} = require("./model/User");


app.use(bodyParser.urlencoded({extended:true}))
//application/x-www-form-urlencoded된 데이터를 분석할 수 있게
app.use(bodyParser.json());
//aaplication/json타입으로 된 것을 분석할 수 있게
app.use(cookieParser());


const mongoose= require('mongoose')
const config = require('./config/key.js');

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(config, config.mongoURI))


app.get('/', (req, res) => res.send('녕안녕LD!'))

//엔드포인트 register
app.post('/register', async(req,res) => {


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
app.post('/login', async(req,res) => {
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
            })
        })
    })
    .catch((err)=> {
        return res.status(400).send(err);
    })
})
        
  



app.listen(port, () => console.log('Example app listening on port안뇽 $`{port}`!'))
