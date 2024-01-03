const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 50

    },
    email:{
        type:String,
        trim: true,//스페이스를 없애줌
        unique: 1//같은 이메일은 못쓰게
    },
    password:{
        type:String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength: 50
    },
    role: {//0과1로 관리자인지 유저인지 구분
        type:Number,
        default: 0
    },
    image: String,

    token: {//유효성관리용 토큰
        type: String
    },
    tokenExp: {//토큰 사용 기간
        type:Number
    }
});

const User = mongoose.model('User',userSchema)//(모델의이름,스키마이름)
module.exports = {User} //이 모델을 다른데에서도 사용 가능하게