### 문제접근
- 저는 먼저 vowel을 배열에 담아줬습니다.
```javascript
  const arr = ["a", "e", "i", "o", "u"];
```
- 그 다음 최댓값을 담아서 반환할 max와 인자로 들어오는 k의 길이 안에 몇개의 vowel이 담기는지 확인할 count를 선언했습니다.
```javascript
  let max = 0;
  let count = 0;
```
- 마지막으로 for문으로 문자열 전체를 확인 했습니다. 처음에는 문제를 잘못 이해하고 아래와 같은 코드를 작성했습니다.
#### 실패 코드
```javascript
for (let i = 0; i < s.length; i++) {
    if (arr.indexOf(s[i] !== -1)) {
      let count = 0;
      for (let j = 0; j < k && i + j < s.length; j++) {
        if (arr.indexOf(s[i + j]) !== -1) {
          count++;
        }
      }
      max = Math.max(count, max);
    }
  }
```
- 이 경우에는 시간복잡도가 O(N^2)으로 굉장히 비효율적일 수 밖에 없었고 결국 ```Time Limit Exceeded```로 로직을 다시 정리할 수 밖에 없었습니다.
#### 성공 코드
- 실패 코드의 반복문 로직을 아래와 같이 수정했습니다.
```javascript
  for (let i = 0, count = 0; i < s.length; i++) {
    if (arr.indexOf(s[i]) !== -1) {
      count++;
    }
    if (i >= k && arr.indexOf(s[i - k]) !== -1) {
      count--;
    }
    max = Math.max(count, max);
  }
```
- 이전 실패 코드에서 매번 반복문을 돌면서 최대값을 저장했던 것과 달리 이번에는 끝까지 먼저 순회를 하면서 vowel에 해당하는 글자가 나올 때마다 ```count```를 증가시켰습니다. 그 후 최대 범위인 ```k```의 범위를 넘어갔을 경우 증가 시켰던 ```count```를 감소시켜 정답을 구할 수 있었습니다.
---
### 정답 코드
```javascript
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

var maxVowels = function (s, k) {
  const arr = ["a", "e", "i", "o", "u"];
  let max = 0;
  for (let i = 0, count = 0; i < s.length; i++) {
    if (arr.indexOf(s[i]) !== -1) {
      count++;
    }
    if (i >= k && arr.indexOf(s[i - k]) !== -1) {
      count--;
    }
    max = Math.max(count, max);
  }
  return max;
};

// test code

const s1 = "abciiidef";
const s2 = "aeiou";
const s3 = "leetcode";
const s4 = "rhythms";
const s5 = "tryhard";

console.log(maxVowels(s1, 3)); // output : 3
console.log(maxVowels(s2, 2)); // output : 2
console.log(maxVowels(s3, 3)); // output : 2
console.log(maxVowels(s4, 4)); // output : 0
console.log(maxVowels(s5, 4)); // output : 1

```
___
