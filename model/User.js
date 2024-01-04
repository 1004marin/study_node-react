const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;//10자리인 salt를 이용해서 암호화
const jwt = require('jsonwebtoken');

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
        minlength: 5,
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



userSchema.pre('save', function(next){//save 메서드 실행되기 전
    //비밀번호를 암호화 시킨다.
    var user = this;//위의 스키마 가리키
    
    if(user.isModified('password')){//닉네임변경시엔 재암호화되지 않도록, 비번변경시에만 재암호화

    
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    });
    } else{//비번이 아니라 다른 정보 변경시
        next()
    }
})
//mongoose 메소드
//유저 모델에 유저 정보 저장 전에 function을 할 것이다.
//=> 이 작업이 끝나고 index.js에서 모델 save(즉 이것을 next function으로 선언)




userSchema.methods.comparePassword = function(plainPassword, cb){//cb는 콜백함수

    //plainPassword 12345 암호화된 비번$2b$10$H3ebswqZHjzg8RPERhTJd.qrkU3/Bv7GE1PUvxgaVVU3pFJpBWi0K"
    //암호화된 비번을 복호화 불가능. -> plain을 암호화해서 비교해야함
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        else cb(null, isMatch)//에러가 없다와 true
    })
}
userSchema.methods.generateToken = async function(cb){//콜백변수 하나

    var user = this//es5문법

    //jsonwebtoken을 이용해서 token을 생성하기
    //user._id + this~를 토큰에 넣어주고, 토큰에서 this~로 user._id판별 => 'this~'도 기억해야함
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;


    async function saveUser(user) {
        try {
          await user.save();
          const savedUser = await User.findById(user);
          return savedUser;
        } catch (err) {
          throw err;
        }
      }
      
      try {
        const savedUser = await saveUser(user);
        cb(null, savedUser);
      } catch (err) {
        cb(err);
      }
    
    /*
    user.token = token
    
    user.save(function (err, user){
        if(err) cb(err)
        else cb(null, user)
    })
    */

}


const User = mongoose.model('User',userSchema)//(모델의이름,스키마이름)
module.exports = {User} //이 모델을 다른데에서도 사용 가능하게