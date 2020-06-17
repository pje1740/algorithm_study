## [JS]Leetcode #1456. Maximum Number of Vowels in a Substring of Given Length
___
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
## Leetcode #916. Word  Subsets
___
### 문제접근
- 저는 처음에 ```Map```을 두 개 생성해 맵을 초기화하면서 각 A의 맵과 B의 맵을 매번 생성하면서 가능한 단어들을 배열에 담는식으로 진행하려 했습니다.
- 하지만 그렇게 했을 경우 시간이 굉장히 오래 걸린다는 단점이 있습니다.
- 이 문제의 가장 핵심은 처음 ```B```를 ```Array``` 혹은 ```Map```에 담는 점에 있다는 생각이 듭니다.

1. 문제를 푸는데 사용할 ```Map```과 유효한 단어들을 담을 배열을 선언해줍니다.
```javascript
  const wordMap = new Map();
  const keyMap = new Map();
  const currentKeyMap = new Map();
  const answer = [];
```
2. 그 다음 ```key```값을 ```Map```에 담아줍니다.
- ```currentKeyMap```을 사용한 이유는 ```key = ["aaa", "aaaa"]``` 이런 식으로 인풋이 들어올 경우 ```Map```의 같은 ```Key```에서 가장 큰 ```value```를 가지는 값을 판별하고 ```keyMap```에 저장시켜주기 위해서 사용했습니다.
```javascript
  for (let i = 0; i < key.length; i++) {
    currentKeyMap.clear();

    for (let j = 0; j < key[i].length; j++) {
      if (keyMap.has(key[i][j]) && currentKeyMap.has(key[i][j])) {
        currentKeyMap.set(key[i][j], currentKeyMap.get(key[i][j]) + 1);
        if (keyMap.get(key[i][j]) < currentKeyMap.get(key[i][j])) {
          keyMap.set(key[i][j], currentKeyMap.get(key[i][j]));
        }
      } else if (keyMap.has(key[i][j])) {
        currentKeyMap.set(key[i][j], 1);
      } else {
        keyMap.set(key[i][j], 1);
        currentKeyMap.set(key[i][j], 1);
      }
    }
  }
```
3. 다음 각 단어들을 하나씩 확인하면서 유효할 경우에만 ```answer```배열에 담아줬습니다.
```javascript
  for (let i = 0; i < word.length; i++) {
    wordMap.clear();
    for (let j = 0; j < word[i].length; j++) {
      if (wordMap.has(word[i][j])) {
        wordMap.set(word[i][j], wordMap.get(word[i][j]) + 1);
      } else {
        wordMap.set(word[i][j], 1);
      }
    }

    let findFlag = 1;
    for (let key of keyMap.keys()) {
      if (
        keyMap.get(key) > wordMap.get(key) ||
        wordMap.get(key) === undefined
      ) {
        findFlag = 0;
        break;
      }
    }
    if (findFlag === 1) {
      answer.push(word[i]);
    }
  }

  return answer;
```
---
### 정답 코드
```javascript
/**
 * @param {string[]} A
 * @param {string[]} B
 * @return {string[]}
 */

var wordSubsets = function (word, key) {
  const wordMap = new Map();
  const keyMap = new Map();
  const currentKeyMap = new Map();
  const answer = [];

  for (let i = 0; i < key.length; i++) {
    currentKeyMap.clear();

    for (let j = 0; j < key[i].length; j++) {
      if (keyMap.has(key[i][j]) && currentKeyMap.has(key[i][j])) {
        currentKeyMap.set(key[i][j], currentKeyMap.get(key[i][j]) + 1);
        if (keyMap.get(key[i][j]) < currentKeyMap.get(key[i][j])) {
          keyMap.set(key[i][j], currentKeyMap.get(key[i][j]));
        }
      } else if (keyMap.has(key[i][j])) {
        currentKeyMap.set(key[i][j], 1);
      } else {
        keyMap.set(key[i][j], 1);
        currentKeyMap.set(key[i][j], 1);
      }
    }
  }

  for (let i = 0; i < word.length; i++) {
    wordMap.clear();
    for (let j = 0; j < word[i].length; j++) {
      if (wordMap.has(word[i][j])) {
        wordMap.set(word[i][j], wordMap.get(word[i][j]) + 1);
      } else {
        wordMap.set(word[i][j], 1);
      }
    }

    let findFlag = 1;
    for (let key of keyMap.keys()) {
      if (
        keyMap.get(key) > wordMap.get(key) ||
        wordMap.get(key) === undefined
      ) {
        findFlag = 0;
        break;
      }
    }
    if (findFlag === 1) {
      answer.push(word[i]);
    }
  }

  return answer;
};

// test code

const A = ["amazon", "apple", "facebook", "google", "leetcode"];
const A1 = ["acaac", "cccbb", "aacbb", "caacc", "bcbbb"];
const B1 = ["e", "o"];
const B2 = ["l", "e"];
const B3 = ["e", "oo"];
const B4 = ["lo", "eo"];
const B5 = ["ec", "oc", "ceo"];
const B6 = ["c", "cc", "b"];

console.log(wordSubsets(A, B1)); // output : [ 'facebook', 'google', 'leetcode' ]
console.log(wordSubsets(A, B2)); // output : [ 'apple', 'google', 'leetcode' ]
console.log(wordSubsets(A, B3)); // output : [ 'facebook', 'google']
console.log(wordSubsets(A, B4)); // output : [ 'google', 'leetcode' ]
console.log(wordSubsets(A, B5)); // output : [ 'facebook', 'leetcode']
console.log(wordSubsets(A1, B6)); //output : ['cccbb']

```
