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

# Programmers #K번째 수

### 문제접근

- 이 문제는 코드를 작성하는 것보다 문제를 이해하는데 시간이 오래 걸렸습니다.
- 문제를 꼼꼼하게 읽고 이해한 후 풀어보시는걸 추천드립니다.
- 저는 인덱스를 하나씩 증가시키면서 H-Index를 증가시킬 수 있는 조건을 주고 answer를 증가시킨 후 리턴했습니다.

___

### 정답 코드

```javascript
function solution(citations) {
  let answer = 0;
  const sortedArr = citations.sort((x, y) => x - y);
  console.log(citations);
  for (let i = 0; i <= citations.length - 1; i++) {
    if (sortedArr[i] >= sortedArr.length - 1 - i) {
      answer++;
    }
  }
  return answer;
}

// test code

citations = [3, 0, 6, 1, 5];
console.log(solution(citations));
> 3
```

___

# Leetcode #75 Sort Colors

### 문제접근

- 0, 1, 2로만 이루어진 배열의  접근해서 정렬하는 문제입니다.
- 대부분 언어에 내장되어 있는 ```Sort()``` 함수를  이용하면 아주 간단하지만 문제에서는 내장된 함수를 사용하지 말라고 합니다.
- 처음에는 제가 아는 정렬들을 하나씩 생각해봤습니다. 퀵 정렬, 합병 정렬 ... 하지만 배열의 각 인덱스에 한번만 접근해서 정렬할 수 있는 방법을 생각하기는 쉽지 않았습니다.
- 결국 같이 문제를 풀던 분의 설명을 듣고 문제를 이해한 후 해결할 수 있었습니다. 아래의 코드에 주석을 함께 적었습니다.

---

### 정답 코드

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

var sortColors = function (nums) {
  var zero = 0; // zero(0)의 인덱스는 배열의 처음부터 시작한다.
  var two = nums.length - 1; // two(2)의 인덱스는 배열의 끝에서 시작한다.
  
  // one(1)의 인덱스도 배열처음부터 시작해서 two(2)의 인덱스를 만날때까지 순회한다.
  for (var one = 0; one <= two; one++) { 
    // 지금 One이 있는 위치의 값이 2이면 tow가 가르키는 값과 위치를 바꾼다.
    while (nums[one] === 2 && one < two) { 
      swap(nums, one, two);
      two--;
    }
    // 지금 One이 있는 위치의 값이 0이면 zero가 가르키는 값과 위치를 바꾼다.
    while (nums[one] === 0 && one > zero) {
      swap(nums, one, zero);
      zero++;
    }
  }
};

// test code

let nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums);
> [0, 0, 1, 1, 2, 2]
```

---

# Programmers #가장 큰 수

```javascript
function solution(numbers) {
  numbers.sort(
    (a, b) => b.toString() + a.toString() - (a.toString() + b.toString())
  );
  return numbers.join("") == 0 ? "0" : numbers.join("");
}

// test code

const num1 = [6, 10, 2];
const num2 = [3, 30, 34, 5, 9];

console.log(solution(num1)); // 6210
console.log(solution(num2)); // 9534330

```
