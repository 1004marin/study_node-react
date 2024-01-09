import React,{useState} from 'react'

function LoginPage() {
    const [Email, setEmail] = useState("")
    const [Password,setPassword] = useState("")


  return (
    <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
    display:'flex', justifyContent:'center', alignItems:'center'}}>
        
        <form style={{display:"flex", flexDirection:"column"}}>
            <label>Email</label>
            <input type="email" value={Email} onChange/>
            <label>Password</label>
            <input type="password" value={Password} onChange/>

            <br/>
            <button>
                login
            </button>
        </form>   
    </div>
  )
}

export default LoginPage