const express = require('express')
const app = express()//새로운 express앱만들기
const port = 9000

const bodyParser = require('body-parser');
const {User} = require("./model/User");




app.use(bodyParser.urlencoded({extended:true}))
//application/x-www-form-urlencoded된 데이터를 분석할 수 있게

app.use(bodyParser.json());
//aaplication/json타입으로 된 것을 분석할 수 있게




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
        await user.save();
        return res.status(200).json(
            {success: true})
        }
    catch (err){
        return res.json({success:false, err})
    }
    

})

app.listen(port, () => console.log('Example app listening on port안뇽 ${port}!'))
