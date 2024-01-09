import axios from "axios";
import { LOGIN_USER } from "./types"

//redux 사용 안할 시 axios..이하는 loginPage에서!
export function loginUser(dataTosubmit){
    
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data)
    //1) 서버에서 받은 데이터를 request에 저장

    //action은 type + response 형식
    //2) reducer에 보내야 함. reducer에서 preState와 action을 조합해서 다음 state를 만들어줌
    return {//user_action reducer로 보내기
        type: LOGIN_USER,//type +
        payload: request// response data. 즉 backend가 준 정보 넣어둠
    }
    
}