import { response } from 'express';
import React,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';

function LoginPage() {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password,setPassword] = useState("")

    const onEmailHandler = (e) =>{
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
       setPassword(e.currentTarget.value)
    }


    const onSubmitHandler = (e) => {
        e.preventDefault()//없으면 login클릭시 refresh됨. 원래 해야할 일들을 하지 못하고 새고해버림!
        
        let body = {
            email: Email,
            Password: Password
        }
        dispatch(loginUser(body))//loginUser라는 action

    }


  return (//form과 button에 모두 submit주는 이유는, and design때매!
    <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
    display:'flex', justifyContent:'center', alignItems:'center'}}
        onSubmit={onSubmitHandler}>
        
        <form style={{display:"flex", flexDirection:"column"}}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>

            <br/>
            <button type="submit">
                login
            </button>
        </form>   
    </div>
  )
}

export default LoginPage