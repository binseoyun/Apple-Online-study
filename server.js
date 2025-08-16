//서버 코드 작성하기
// server.js

// 1. express 라이브러리를 불러옵니다.
const express = require('express');

// 2. express 앱을 생성합니다.
const app = express();
const port = 3000; // 서버를 3000번 포트에서 실행합니다.

// 3. GET 요청에 대한 응답을 설정합니다.
// 누군가 우리 서버의 기본 주소('/')로 접속(GET 요청)하면,
// "Hello World!" 라는 텍스트를 응답으로 보내줍니다.
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 4. 서버를 실행하고 요청을 기다립니다.
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});