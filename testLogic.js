// testLogic.js

// gameLogic.js 파일에서 우리가 만든 함수들을 불러옵니다.
const { createMap, dragApple, calculateScore } = require('./server/handlers/gameLogic');

// --- 테스트 시작 ---

console.log("1. 맵 생성 테스트");
const testMap = createMap();
console.log("   - 생성된 맵의 첫 줄:", testMap[0]);
console.log("   - 맵 크기:", `${testMap.length}x${testMap[0].length}`);
console.log("------------------------------------");


console.log("2. 사과 드래그 테스트");
// 가상으로 (0,0) 부터 (2,1) 까지 드래그했다고 가정합니다.
const selectedApples = dragApple(0, 0, 1, 2, testMap);
console.log("   - 선택된 사과 좌표:", selectedApples);
console.log("------------------------------------");


console.log("3. 점수 계산 테스트");
const score = calculateScore(selectedApples, testMap);
// 선택된 사과들의 실제 값도 확인해봅시다.
let sum = 0;
const selectedValues = selectedApples.map(pos => {
    const val = testMap[pos[0]][pos[1]];
    sum += val;
    return val;
});
console.log("   - 선택된 사과들의 값:", selectedValues);
console.log("   - 값의 합:", sum);
console.log("   - 최종 점수:", score);
console.log("------------------------------------");