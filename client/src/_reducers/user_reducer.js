import {LOGIN_USER} from '../_actions/types';

//prevState + action을 가졌으니, nextState 돌려주기
export default function (state={}, action) {
    console.log('유저리듀서에용',action.payload)
    switch (action.type) {//why 스위치문법? action의 type이Login_user만은 아니니까 타입마다 다른 조치 취하기
        case LOGIN_USER:
            return {...state, loginSucess: action.payload}//...위를 그대로 가져옴. 빈상태

    
        default:
            return state;
            
    }
}