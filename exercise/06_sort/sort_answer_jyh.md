# BOJ #2108 통계학

### [문제링크 #2108 통계학](https://www.acmicpc.net/problem/2108)

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

---

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

# BOJ #1181 단어 정렬

### [문제링크 #1181 단어 정렬](https://www.acmicpc.net/problem/1181)

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
