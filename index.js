const express = require('express')//express모듈 가져오기
const app = express()//새로운 express앱만들기
const port = 9000//port는 내맘대로. 백서버로 두는 포트임

const bodyParser = require('body-parser');
const {User} = require("./model/User");



//bodyparser 설정
app.use(bodyParser.urlencoded({extended:true}))
//application/x-www-form-urlencoded된 데이터를 분석할 수 있게

app.use(bodyParser.json());
//aaplication/json타입으로 된 것을 분석할 수 있게




const mongoose= require('mongoose')
const config = require('./config/key.js');

mongoose.connect(config.mongoURI,{
    //useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true, useFinedAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(config, config.mongoURI))
//use~안쓰면 에러 뜨기도


app.get('/', (req, res) => res.send('녕안녕LD!'))//'/'루트 디렉토리에 오면 hello world가 출력되도록 함

//엔드포인트 register
app.post('/register', async(req,res) => {
//회원가입할 때 필요한 정보를 client에서 가져오면
//그것들을 db에 넣어준다.
//=> user모델가져와야함

    const user = new User(req.body)//req.body에 json형식으로 데이터있음. 있을 수 있는 것은 bodyparser덕분

    try{
        await user.save();
        return res.status(200).json(
            {success: true})
        }
    catch (err){
        return res.json({success:false, err})
    }
    
/*
    user.save((err) => {//mongodb 메서드로
        if(err) return res.json({success: false}, err)
        return res.status(200).json(
                                {success: true})
    })
    //if 저장시 에러가 있다면 json형식으로 client에게 성공실패 응답 & err메시지
    //if 성공시 200(성공의 의미)
    */
})

app.listen(port, () => console.log('Example app listening on port안뇽 ${port}!'))
//5000번 에서 이 앱을 실행하는 것임.
//의 의미: app이 port(3000)에 listen을 하면 콘솔이 프린트 되는 것임S