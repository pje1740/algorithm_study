## 위장
### 문제접근
- 문제를 보고 경우의 수를 떠올렸습니다.
- 옷이 100개가 들어오더라도 100개의 옷이 모두 상의면 100가지 경우의 수 밖에 없을 것이고, 옷이 50개 들어오더라도 50개의 종류가 모두 다르면 많은 경우의 수가 생길거라고 생각했습니다.
- 그래서 저는 ```Map```을 만들고 ```Map```에 옷의 이름이 아닌 종류를 ```key```로 사용하고 등장횟수를 ```value```로 사용했습니다.
```javascript
  const map = new Map();

  for (let i = 0; i < clothes.length; i++) {
    if (map.has(clothes[i][1])) {
      map.set(clothes[i][1], parseInt(map.get(clothes[i][1])) + 1);
    } else {
      map.set(clothes[i][1], 1);
    }
  }
```
- 그 다음 value를 ```...```으로 해체해서 ```arr```에 담아줬습니다.
```javascript
  const arr = [...map.values()];
```
- 마지막으로 ```key```가 하나일 때, 즉 ```arr.length === 1```일 때는 바로 하나의 값을 리턴하고 두 개 이상일 때는 ```result```라는 변수를 선언 후 곱한 다음에 리턴해주었습니다.
```javascript
  if (arr.length === 1) {
    return arr[0];
  }

  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    result *= arr[i] + 1;
  }
  return result - 1;
}
```
___
### 정답 코드
```javascript
function solution(clothes) {
  const map = new Map();

  for (let i = 0; i < clothes.length; i++) {
    if (map.has(clothes[i][1])) {
      map.set(clothes[i][1], parseInt(map.get(clothes[i][1])) + 1);
    } else {
      map.set(clothes[i][1], 1);
    }
  }

  const arr = [...map.values()];

  if (arr.length === 1) {
    return arr[0];
  }

  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    result *= arr[i] + 1;
  }
  return result - 1;
}

// test code

const clothes1 = [
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"],
];

const clothes2 = [
  ["crow_mask", "face"],
  ["blue_sunglasses", "face"],
  ["smoky_makeup", "face"],
];

const clothes3 = [[]];

console.log(solution(clothes1)); // output : 5
console.log(solution(clothes2)); // output : 3
console.log(solution(clothes3)); // output : 1

```
___
## 완주하지 못한 선수
### 문제접근
- 참가자, 완주자가 입력으로 들어왔을 때 완주하지 못한 선수를 찾는 문제입니다.
- 저는 참가자와 완주자 배열을 정렬후
```javascript
  participant.sort();
  completion.sort();
```
- 반복문을 통해 두 배열의 값이 다른지점을 반환했습니다.
```javascript
  for (let i in participant) {
    if (participant[i] !== completion[i]) return participant[i];
  }
```
___
### 정답 코드
```javascript
function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i in participant) {
    if (participant[i] !== completion[i]) return participant[i];
  }
}

// test code

const p1 = ["leo", "kiki", "eden"];
const p2 = ["marina", "josipa", "nikola", "vinko", "filipa"];
const p3 = ["mislav", "stanko", "mislav", "ana"];
const c1 = ["eden", "kiki"];
const c2 = ["josipa", "fillipa", "marina", "nikola"];
const c3 = ["stanko", "ana", "mislav"];

console.log(solution(p1, c1)); // output : "leo"
console.log(solution(p2, c2)); // output : "vinko"
console.log(solution(p3, c3)); // output : "mislav"
```
___
## 베스트 앨범
### 문제접근
- 여러 조건이 많아 까다로운 문제였습니다.
- 저는 먼저 들어오는 여러 장르들을 ```Map```과 ```Array```를 이용해 input으로 들어오는 genre와 plays를 가공했습니다.
```javascript
  const genreMap = new Map();
  let playsArr = [];

  for (let i = 0; i < genres.length; i++) {
    // 각 장르별 플레이수를 담은 맵을 만든다
    if (genreMap.has(genres[i])) {
      genreMap.set(genres[i], genreMap.get(genres[i]) + plays[i]);
    } else {
      genreMap.set(genres[i], plays[i]);
    }
	// 배열에 장르, 플레이수, 고유번호(index)를 담는다.
    playsArr[i] = [genres[i], plays[i], i];
  }
```
- 그 다음 ```genreMap```은 분해 후 정렬을 통해 가장 많이 플레이된 장르순서대로 정렬되도록 했습니다.
```javascript
  const sortedGenreMap = [...genreMap].sort((x, y) => y[1] - x[1]);

```
- 그 후 장르 수만큼 반복하며 ```answerMap```에 각 장르별로 플레이수와 고유번호를 담은 후 다시 가장 많이 재생된 곡이 앞으로 오도록 정렬해줬습니다.(재생횟수가 같을시에는 고유번호가 더 빠른 곡이 앞으로 정렬되도록)
```javascript
  const answerMap = new Map();
  for (let i = 0; i < sortedGenreMap.length; i++) {
    answerMap.clear();
    for (let j = 0; j < playsArr.length; j++) {
      if (sortedGenreMap[i][0] === playsArr[j][0]) {
        answerMap.set(playsArr[j][2], playsArr[j][1]);
      }
    }
    let sortedAnswerMap = [...answerMap].sort((x, y) => {
      if (y[1] === x[1]) {
        return x[0] - y[0];
      } else {
        return y[1] - x[1];
      }
    });
```
- 마지막으로 정렬된 ```sortedAnswerMap```의 길이가 2 이하이면(해당 장르의 곡이 한 곡이면) 하나만 ```answer```배열에 담았고, 길이가 2 이상이면(해당 장르의 곡이 여러 곡이면) 두개를 ```answer```배열에 담아 리턴했습니다.
```javascript
    if (sortedAnswerMap.length < 2) {
      answer.push(sortedAnswerMap[0][0]);
    } else {
      answer.push(sortedAnswerMap[0][0]);
      answer.push(sortedAnswerMap[1][0]);
    }

  return answer;
```
___
## Flip Columns For Maximum Number of Equal Rows
### 정답 코드
```javascript
  const answerMap = new Map();
  for (let i = 0; i < sortedGenreMap.length; i++) {
    answerMap.clear();
    for (let j = 0; j < playsArr.length; j++) {
      if (sortedGenreMap[i][0] === playsArr[j][0]) {
        answerMap.set(playsArr[j][2], playsArr[j][1]);
      }
    }
    let sortedAnswerMap = [...answerMap].sort((x, y) => {
      if (y[1] === x[1]) {
        return x[0] - y[0];
      } else {
        return y[1] - x[1];
      }
    });
```
___
