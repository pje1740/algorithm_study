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
