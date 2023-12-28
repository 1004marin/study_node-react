const express = require('express')//express모듈 가져오기
const app = express()//새로운 express앱만들기
const port = 9000//port는 내맘대로. 백서버로 두는 포트임

app.get('/', (req, res) => res.send('HELLO WOR안녕안녕LD!'))//'/'루트 디렉토리에 오면 hello world가 출력되도록 함

app.listen(port, () => console.log('Example app listening on port안뇽 ${port}!'))
//5000번 에서 이 앱을 실행하는 것임.
//의 의미: app이 port(3000)에 listen을 하면 콘솔이 프린트 되는 것임