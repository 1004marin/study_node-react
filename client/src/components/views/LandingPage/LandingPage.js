import {React, useEffect} from 'react';
import axios from 'axios';


function LandingPage() {
    //landing page에 들어오자마자 아래를 실행
    useEffect(()=> {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    },[])

  return (
    <div style={{height:'100vh', width:'100%', backgroundColor:"pink",
    display:'flex', justifyContent:'center', alignItems:'center'}}>
        LandingPage.입니다용
    </div>
  )
}

export default LandingPage