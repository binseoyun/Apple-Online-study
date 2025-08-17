const crypto = require('crypto');
const seedrandom = require('seedrandom'); //랜덤 숫자 생성을 위한 라이브러리


//10X17 크기의 맵을 생성하는 함수
function createMap() {
    const seed = crypto.randomBytes(16).toString('hex'); //무작위한 seed 값을 생성
    const rng = seedrandom(seed); //이 seed를 사용해 랜덤 숫자를 생성하는 함수 생성

    const mapData = []; //맵 데이터를 저장할 배열
    let sum = 0; //사과의 값의 합을 저장할 변수

    //10X17 크기의 맵을 채움
    for (let i = 0; i < 10; i++) {
        const newRow = []
        for (let j = 0; j < 17; j++) {
        //1부터 9까지의 랜덤 숫자를 생성하고, 이를 맵에 추가
            const randomValue = Math.floor(rng() * 9) + 1;
            sum = sum + randomValue;
            newRow.push(randomValue);
        }
        mapData.push(newRow);
    }

    //마지막 칸(9,16)의 값을 조정하여 사과의 값의 합이 10의 배수가 되도록 함
    const temp = mapData[9][16]; //마지막 칸의 기존 값을 저장
    sum = sum - temp; //마지막 칸의 값을 제외한 사과의 값의 합을 계산
    mapData[9][16] = 10 - (sum % 10); //마지막 칸의 값을 조정하여 사과의 값의 합이 10의 배수가 되도록 함
    
    return mapData;
}

// 드래그한 사과의 좌표를 반환하는 함수
function dragApple(x1, y1, x2, y2, mapData) {
    const apple_size = 1;
    const apple_list = [];

    const x_start = Math.max(0, Math.trunc(Math.min(x1, x2) / apple_size));
    const x_end = Math.min(16, Math.trunc(Math.max(x1, x2) / apple_size));
    const y_start = Math.max(0, Math.trunc(Math.min(y1, y2) / apple_size));
    const y_end = Math.min(9, Math.trunc(Math.max(y1, y2) / apple_size));

    const cnt = (x_end - x_start + 1) * (y_end - y_start + 1);

    if (cnt >= 10) {
        return apple_list;
    }

    if ((x_start <= x_end) && (y_start <= y_end)) {
        for (let i = y_start; i <= y_end; i++) {
            for (let j = x_start; j <= x_end; j++) {
                apple_list.push([i, j]);
            }
        }
    }

    return apple_list;
}
//dragApple로부터 받은 사과의 좌표를 이용해 점수를 계산하는 함수
function calculateScore(apple_list, mapData) {
    if (apple_list.length == 0) return 0;

    let sum = 0;
    let cnt = 0;
    for (const apple of apple_list) {
        if (Number(mapData[apple[0]][apple[1]]) != 0) {
            sum += Number(mapData[apple[0]][apple[1]]);
            cnt += 1;
        }
        if (sum > 10) return 0;
    }

    if (sum == 10) return cnt;
    else return 0;
}

module.exports = {
    createMap,
    dragApple,
    calculateScore,
};