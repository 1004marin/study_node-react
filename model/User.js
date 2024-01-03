const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;//10자리인 salt를 이용해서 암호화
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

userSchema.pre('save', function(next){
    //비밀번호를 암호화 시킨다.
    var user = this;//위의 스키마 가리키
    
    if(user.isModified('password')){//닉네임변경시엔 재암호화되지 않도록, 비번변경시에만 재암호화

    
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    });
    }
})
//mongoose 메소드
//유저 모델에 유저 정보 저장 전에 function을 할 것이다.
//=> 이 작업이 끝나고 index.js에서 모델 save(즉 이것을 next function으로 선언)

const User = mongoose.model('User',userSchema)//(모델의이름,스키마이름)
module.exports = {User} //이 모델을 다른데에서도 사용 가능하게