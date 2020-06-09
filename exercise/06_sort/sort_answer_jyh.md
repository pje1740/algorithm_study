- 처음 올린 문제가 정렬과는 조금 거리가 있는거 같아 문제를 하나 더 추가했습니다.
___
# BOJ #2108 
### 문제접근
- 산술평균, 중앙값, 최빈값, 범위를 구해야 하는 문제입니다.
- 산술평균 : 배열의 요소 전체를 더한 후 배열의 길이로 나눠서 구했습니다. ``` Math.round(sum / arr.length);```
- 중앙값 : 배열의 전체 길이 / 2를 한 위치에 있는 값을 구했습니다. ```arr[Math.floor(arr.length / 2)]```
- 범위 : 배열을 정렬한 후 배열의 마지막값에서 첫번째 값을 빼서 구했습니다.```arr[arr.length] - arr[0]```
#### **최빈값**
 - 저는 최빈값을 구하기 위해 ```Map```을 사용해 Key와 밸류를 담은 후 이미 있는 Key(중복되는 값)일 경우에는 Value를 증가시키는 방법으로 Map에 저장했습니다.
```javascript
const checkValueMap = new Map();
for (let i = 0; i < arr.length; i++) {
  if (checkValueMap.has(arr[i])) {
    checkValueMap.set(arr[i], checkValueMap.get(arr[i]) + 100);
  } else {
    checkValueMap.set(arr[i], 0);
  }
}
```

   - 그 다음 for문을 통해 가장 높은 Value를 max에 담고 다시 전체 Map을 탐색해 Max값을 arr에 담아줬습니다.

```javascript
let max = 0;
let checkValueArr = [];

for (let value of checkValueMap.keys()) {
  if (max < checkValueMap.get(value)) {
    max = checkValueMap.get(value);
  }
}

for (let value of checkValueMap.keys()) {
  if (max === checkValueMap.get(value)) {
    checkValueArr.push(value);
  }
}
```
- 그 후 최종적으로 조건에 맞춰 최빈값이 두개 이상인 경우 2번째로 큰 수를 담아줬습니다.
```javascript
let mostValue = 0;
if (checkValueArr.length > 1) {
  mostValue = checkValueArr[1];
} else {
  mostValue = checkValueArr[0];
}
```
___
### 실패 사례
1.  처음 산술평균을 구할 때 ```Math.floor()```를 사용해서 틀렸습니다. 소수점에서 반올림한 값을 출력해야 하므로 ```Math.round```를 사용해야 합니다. ```Math```에 대해 정확히 이해하지 못해서 생긴 문제입니다.
```javascript
Math.ceil()  // 소수점 올림, 정수 반환
Math.floor() // 소수점 버림, 정수 반환
Math.round() // 소수점 반올림, 정수 반환
```
2. 최빈값을 구할 때 ```Map```을 사용해 각 배열의 숫자를 Key로 해서 중복된 숫자가 나오면 Value를 증가시키는 방법을 사용하려고 헀습니다. 그런데 생각한 것처럼 코드가 동작하지 않아 애를 먹었습니다. 아래와 같은 코드를 작성했는데 생각했던 것처럼 Value가 증가하지 않아 console.log()를 사용해 다양하게 테스트 해봤지만 원인을 찾지 못했습니다. 혹시 이 코드에서 어디가 잘못 됐는지 바로 보이시나요? 정답은 코드 아래에 공개하겠습니다.
```javascript
const testMap = new Map();
for (let i = 0; i < arr.length; i++) {
  if (testMap.has(arr[i])) {
    testMap.set(arr[i], testMap.get(arr[i]) + 100);
  }
  testMap.set(arr[i], 0);
}
```
.
.
.
if-else를 사용했어야 하는데 if문만 사용해 value가 증가했다가 다시 0으로 계속 초기화 되는 문제였습니다... 간단한 실수로 많이 헤맸지만 덕분에 Map의 Key와 Value를 다양하게 콘솔에 찍어보면서 공부할 수 있었습니다. 그래도 이런 실수는 앞으로 더욱 주의해야겠다는 생각이 듭니다.
___
### 정답 코드
```javascript
// BOJ JS input

const fs = require("fs");
const { match } = require("assert");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((num) => parseInt(num));

// test code
// const input = [5, 1, 3, 8, -2, 2];
// const input = [1, 4000];
// const input = [5, -1, -2, -3, -1, -2];

input.shift();
const arr = input.sort((a, b) => a - b);

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}

const checkValueMap = new Map();
for (let i = 0; i < arr.length; i++) {
  if (checkValueMap.has(arr[i])) {
    checkValueMap.set(arr[i], checkValueMap.get(arr[i]) + 100);
  } else {
    checkValueMap.set(arr[i], 0);
  }
}

let max = 0;
let checkValueArr = [];

for (let value of checkValueMap.keys()) {
  if (max < checkValueMap.get(value)) {
    max = checkValueMap.get(value);
  }
}

for (let value of checkValueMap.keys()) {
  if (max === checkValueMap.get(value)) {
    checkValueArr.push(value);
  }
}

// 산술평균 : N개의 수들의 합을 N으로 나눈 값
const average = Math.round(sum / arr.length);

// 중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
const middle = arr[Math.floor(arr.length / 2)];

// 최빈값 : N개의 수들 중 가장 많이 나타나는 값
let mostValue = 0;
if (checkValueArr.length > 1) {
  mostValue = checkValueArr[1];
} else {
  mostValue = checkValueArr[0];
}

// 범위 : N개의 수들 중 최댓값과 최솟값의 차이
const range = arr[arr.length - 1] - arr[0];

console.log(average);
console.log(middle);
console.log(mostValue);
console.log(range);

```
___
### 제출 결과
![](https://images.velog.io/images/yujo/post/4593bbe4-147e-4f2b-bb61-76e283de2e8c/image.png)
___
# BOJ #1181 단어 정렬
### 문제접근
- 세가지 조건이 명시되어 있습니다.
  - 길이가 짧은 것부터
  - 길이가 같으면 사전순으로
  - 중복되는 요소는 제거
- 해당 조건들을 생각하며 코드를 작성했습니다.
- 중복되는 요소를 제거하고 정렬을 편하게 하기 위해 ```Map```을 사용해 ```key = 단어```, ```value = 단어의 길이```를  ```Map```에 아래와 같이 담아줬습니다.
```javascript
for (let i = 0; i < input.length; i++) {
  map.set(input[i], input[i].length);
}
```
- 그 후 ```Map```을 아래와 같이 정렬해줬습니다. 
```javascript
const sortedMap = new Map(
  [...map.entries()].sort((x, y) => {
    if (x[1] === y[1]) {
      let i = 0;
      while (1) {
        if (x[0][i] !== y[0][i]) {
          return x[0][i] > y[0][i] ? 1 : -1;
        }
        i++;
      }
    }
    return x[1] - y[1];
  })
);
```
- 마지막으로 정렬한 코드를 ```배열(arr)```에 담아 문제에서 요구하는대로 출력해줬습니다
```javascript
const arr = [...sortedMap.keys()];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```
___
### 새로 배운 점
#### [JS]"..." 문법
- Javascript에서 "..."은 구조 분해 할당이라고 불립니다.
- 배열이나 객체의 속성을 해제하여 그 값을 개별 변수에 담을 수 있게 해줍니다. 아래는 MDN공식 문서입니다.
  - [[MDN]구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
```javascript
// 맵 선언
const testMap = new Map();

// 맵 초기화
testMap
  .set("Hello", 123)
  .set("World", 567)
  .set("This", 1231)
  .set("is", 123123)
  .set("testMap", 167890);

// 맵 출력
console.log(testMap);

// 그냥 출력했을 때 출력값
Map(5) {
  'Hello' => 123,
  'World' => 567,
  'This' => 1231,
  'is' => 123123,
  'testMap' => 167890
}

// 맵 구조분해 할당 후 출력, 배열 형태로 리턴된다.
console.log([...testMap]);

// 구조분해 할당 후 출력값
[
  [ 'Hello', 123 ],
  [ 'World', 567 ],
  [ 'This', 1231 ],
  [ 'is', 123123 ],
  [ 'testMap', 167890 ]
]

// "..."을 사용하면 아래와 같이 인덱스로도 접근이 가능합니다.
console.log([...testMap][0]);
> [ 'Hello', 123 ]

console.log([...testMap][0][0]);
> Hello

console.log([...testMap][0][1]);
> 123
```
___
### 정답 코드
```javascript
// BOJ JS input
// BOJ JS input

const fs = require("fs");
const { match } = require("assert");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// test code

// const input = [
//   "13",
//   "but",
//   "i",
//   "wont",
//   "hesitate",
//   "no",
//   "more",
//   "no",
//   "more",
//   "it",
//   "cannot",
//   "wait",
//   "im",
//   "yours",
// ];

input.shift();
const map = new Map();

for (let i = 0; i < input.length; i++) {
  map.set(input[i], input[i].length);
}

const sortedMap = new Map(
  [...map.entries()].sort((x, y) => {
    if (x[1] === y[1]) {
      let i = 0;
      while (1) {
        if (x[0][i] !== y[0][i]) {
          return x[0][i] > y[0][i] ? 1 : -1;
        }
        i++;
      }
    }
    return x[1] - y[1];
  })
);

const arr = [...sortedMap.keys()];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

```
___
### 제출 결과
![](https://images.velog.io/images/yujo/post/4593bbe4-147e-4f2b-bb61-76e283de2e8c/image.png)
___

