import {React, useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
    //landing page에 들어오자마자 아래를 실행
    useEffect(()=> {
        axios.get('http://localhost:9000/api/users/hello')
        .then(response => console.log(response.data))
    },[])

  return (
    <div>LandingPage.입니다용</div>
  )
}

export default LandingPage