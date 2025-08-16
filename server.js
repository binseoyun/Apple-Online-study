//서버 코드 작성하기
// server.js

// 1. express 라이브러리를 불러옵니다.
const express = require('express');
const http = require('http'); // Node.js 기본 http 모듈
const { Server } = require("socket.io"); // socket.io의 Server 클래스

// 2. express 앱을 생성하고, 이를 사용해 http 서버를 만듭니다.
const app = express();
const server = http.createServer(app); //Express 앱을 직접 실행하는 대신, Node.js의 기본 http 서버 위에서 실행되도록(Scoket.io는 이 http 서버 위에서 작동합니다).

//3.http 서버에 socket.io를 연결합니다.
const io = new Server(server, { //방금 만든 http 서버에 Scoket.io를 연결합니다.
    cors: {
        origin: "*", // 모든 도메인에서의 요청을 허용합니다.
        //origin: "https://www.applegame.shop", // 허용할 도메인
        methods: ["GET", "POST"], // 허용할 HTTP 메소드
        credentials: true // 쿠키를 포함한 요청을 허용합니다.
    }
    });

const port = 3000; // 서버를 3000번 포트에서 실행합니다.

// 4. 클라이언트에게 제공할 기본 HTML 파일을 설정합니다.
//__dirname은 현재 파일의 디렉토리를 나타냅니다.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 5. 소켓 이벤트를 설정합니다.
io.on('connection', (socket) => { //클라이언트가 웹페이지에 접속해서 연결이 성공하는 순간 실행
  console.log('🎉 새로운 유저가 접속했습니다!');

//scoket.on('이벤트이름', 콜백함수) 형태로 이벤트를 설정합니다.

  // 클라이언트가 연결을 끊었을 때 실행됩니다.
  socket.on('disconnect', () => {
    console.log('👋 유저가 접속을 끊었습니다.');
  });

  // 'chat message' 라는 이름의 이벤트를 클라이언트로부터 받습니다.
  socket.on('chat message', (msg) => {
    console.log('받은 메시지: ' + msg);
    
    // 메시지를 보낸 클라이언트를 포함한 모든 클라이언트에게
    // 'chat message' 이벤트를 다시 보냅니다. (방송, broadcast)
    io.emit('chat message', msg); //접속된 모든 클라이언트에게 이벤트 전송
  });
});


// 4. 서버를 실행하고 요청을 기다립니다.
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});