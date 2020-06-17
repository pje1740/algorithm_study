### 문자열 검색(String Search)

#### 문자열 검색 알고리즘(string-searching algorithm, string-matching algorithm)은 문자열을 다루는 알고리즘의 하나로, 특정 문자 또는 문자열을 더 큰 문자열이나 글에서 찾아내는 수법이다.

___

### 문자열 탐색(Brute-Force 방식)

- **시간 복잡도 **
  - 문자열의 길이 = N
  - 찾는 단어의 길이 = M
  - O(NM)
- 문자열, 텍스트에서 특정 단어를 찾는 방식은 여러가지가 있습니다. 가장 기초적인 Brute Force방식은 선형탐색과 비슷합니다.
  - [선형 탐색 정리글](https://velog.io/@yujo/JS%EC%84%A0%ED%98%95-%ED%83%90%EC%83%89Linear-Search)

![](https://images.velog.io/images/yujo/post/531895a9-c7c3-47a1-9816-b7cc19f8d18e/%EC%84%A0%ED%98%95%ED%83%90%EC%83%89.gif)

- 인덱스를 하나씩 증가시키면서 같은 글자를 찾으면 그 다음 글자도 일치하는지 계속 검사하는 방식입니다.

___

### 문자열 탐색 코드(Brute-Force 방식)

```javascript
function searchWord(text, word) {
  let textIndex = 0;
  let wordIndex = 0;
  while (text[textIndex] !== undefined) {
    if (text[textIndex] === word[wordIndex]) {
      let currentIndex = textIndex;
      while (text[textIndex] === word[wordIndex]) {
        if (wordIndex === word.length - 1) {
          return currentIndex;
        }
        textIndex++;
        wordIndex++;
      }
    }
    wordIndex = 0;

    textIndex++;
  }

  return -1;
}

// test code

console.log(searchWord("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeee"));
> 27

console.log(searchWord("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeeee"));
> -1
```

___

### KMP Algorithm

- **시간 복잡도 **
  - 문자열의 길이 = N
  - 찾는 단어의 길이 = M
  - O(N + M)
- 문자열을 Brute-Force 방식으로 탐색하게 되면 문자열이 길어질수록, 찾는 단어가 길수록 시간이 오래 걸립니다. 
- 예를 들어 길이가 10000인 Text에서 길이가 50인 word를 모두 찾는다면 Brute-Force방식에서는 5만번의 탐색이 필요합니다.
  - [[JS]문자열 탐색(Brute-Force 방식)](https://velog.io/@yujo/JS%EB%AC%B8%EC%9E%90%EC%97%B4-%ED%83%90%EC%83%89Brute-Force-%EB%B0%A9%EC%8B%9D)
- 이 문제를 해결하기 위해 Knuth, Morris, Prett 세 사람이 새로운 문자열 탐색 알고리즘을 만들었습니다. 만든 사람들의 이름 첫 글자를 따서 **KMP Algorithm**이라고 불립니다.
- KMP알고리즘은 접두사(prefix)와 접미사(suffix)를 이용해 접두사와 접미사를 이용해 현재 탐색중인 부분에서 접미사와 접두사가 일치하는 부분으로 점프해서 넘어가는 식으로 탐색을 합니다.
- 따라서 길이가 10000인 Text에서 길이가 50인 word를 모두 찾는다면 10050번의 탐색이 필요하게 됩니다.
- 저도 그랬지만 처음 KMP 알고리즘을 접하시는 분들은 쉽게 이해가 가지 않으실거라고 생각합니다.
- 제가 설명하는 재주가 부족해 KMP알고리즘을 이해하는데 큰 도움이 됐던 링크들을 첨부하겠습니다.
  - [KMP 문자열 매칭 알고리즘 - 동빈나님 유튜브](https://www.youtube.com/watch?v=yWWbLrV4PZ8)
  - [KMP : 문자열 검색 알고리즘 - 멍멍멍님 블로그](https://bowbowbow.tistory.com/6)

___

### 문자열 탐색 코드(KMP Algorithm)

```javascript
function buildPatternTable(word) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex++;
      prefixIndex++;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex++;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }

  return patternTable;
}
function KMP(text, word) {
  if (word.length === 0) {
    return 0;
  }

  let textIndex = 0;
  let wordIndex = 0;

  const patternTable = buildPatternTable(word);

  while (textIndex < text.length) {
    if (text[textIndex] === word[wordIndex]) {
      if (wordIndex === word.length - 1) {
        return textIndex - word.length + 1;
      }
      wordIndex++;
      textIndex++;
    } else if (wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      wordIndex = 0;
      textIndex++;
    }
  }

  return -1;
}

// test code

console.log(searchWord("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeee"));
> 27

console.log(searchWord("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeeee"));
> -1
```

___

### Boyer-Moore Algorithm

- **시간 복잡도 **
  - 문자열의 길이 = N
  - 찾는 단어의 길이 = M
  - 평균 : O(N) 이하
  - 최악 : O(N * M)
- Boyer-Moore Algorithm은 KMP Algorithm처럼 문자열을 점프하면서 단어를 비교해 탐색합니다.
  - [[JS]Knuth-Morris-Prett(KMP) Algorithm](https://velog.io/@yujo/JSKnuth-Morris-PrettKMP-Algorithm)
- 하지만 앞이 아닌 뒤에서부터 비교를 한다는게 다른 점입니다.

___

### 구현 코드

```javascript
function boyerMoore(text, word) {
  let textCursor;
  let wordCursor;
  let textLen = text.length;
  let wordLen = word.length;

  let skip = new Map();
  for (let i of text) {
    skip.set(i, wordLen);
  }
  for (textCursor = 0; textCursor < wordLen; textCursor++) {
    if (skip.has(word[textCursor])) {
      skip.set(word[textCursor], wordLen - textCursor - 1);
    }
  }
  while (textCursor < textLen) {
    wordCursor = wordLen - 1;
    while (text[textCursor] == word[wordCursor]) {
      if (wordCursor == 0) {
        return textCursor;
      }
      wordCursor--;
      textCursor--;
    }
    textCursor += Math.max(skip.get(text[textCursor]), wordLen - wordCursor);
  }
  return -1;
}

// test code

console.log(boyerMoore("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeee"));
> 27

console.log(boyerMoore("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeeee"));
> -1

console.log(boyerMoore("asdfasdfasfasdfasdfasdfadsfaeeee", "asdf"));
> 4
```

___

### Rabin-Karp Algorithm

- **시간 복잡도 **
  - 문자열의 길이 = N
  - 찾는 단어의 길이 = M
  - 평균 : O(N + M)
  - 최악 : O(N * M)
- Rabin-Karp 알고리즘은 해시 함수를 사용하여 텍스트에서 찾는 단어(패턴)를 해시 값이라는 숫자로 변환합니다.
- 해시 값을 위해서는 보통 특정 소수를 곱해서 더하는 방식을 사용합니다.
- 제가 설명하는 재주가 부족해 알고리즘을 이해하는데 큰 도움이 됐던 링크를 첨부하겠습니다.
  - [라빈 카프(Rabin-Karp) 문자열 매칭 알고리즘 - 동빈나님 유튜브](https://www.youtube.com/watch?v=kJJQJDsjXc8)

___
### 간단한 방식
- Rabin-Karp를 이해하기 위해 전체적인 로직을 해시값 없이 구현해 봤습니다.
```javascript
function rabinKarp(text, word) {
  const textHash = [];
  const wordHash = [];

  for (let i = 0; i < text.length; i++) {
    // 처음 시작할 때 Hash 배열에 text와 word를 word의 길이만큼 넣어줍니다.
    if (i === 0) { 
      for (let j = 0; j < word.length; j++) {
        textHash.push(text[j]);
        wordHash.push(word[j]);
      }
      // 다음 반복부터는 text 배열의 맨 앞 한 글자를 빼주고 배열 맨 뒤에 다음 글자를 넣어줍니다.
    } else {
      textHash.shift();
      textHash.push(text[i + word.length - 1]);
    }
	// 만약 두 배열이 같다면 현재 위치를 return하고 함수는 종료됩니다.
    if (textHash.join("") === wordHash.join("")) {
      return i;
    }
  }
  // text의 길이만큼 반복했을 때도 찾지 못 했다면 -1을 return해 실패를 알립니다.
  return -1;
}
```
### 해시 값을 이용한 방식
- 이후 작동원리를 이용해 해시값을 이용해 라빈 카프를 작성했습니다.
```javascript
function rabinKarp(text, word) {
  let textHash = 0;
  let wordHash = 0;
  let power = 1;

  for (let i = 0; i < text.length; i++) {
    if (i == 0) {
      for (let j = 0; j < word.length; j++) {
        textHash += text.charCodeAt(text.length - 1 - j) * power;
        wordHash += word.charCodeAt(word.length - 1 - j) * power;
        if (j < text.length - 1) {
          power *= 2;
        }
      }
    } else {
      textHash =
        2 * (textHash - text.charCodeAt(i - 1) * power) +
        text[word.length - 1 - i];
    }
    if (textHash === wordHash) {
      let find = true;
      for (let j = i; j < word.length; j++) {
        if (text[j] !== word[j]) {
          find = false;
          break;
        }
      }
      if (find) {
        return i;
      }
    }
  }

  return -1;
}

// test code

console.log(rabinKarp("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeee"));
> 27

console.log(rabinKarp("asdfasdfasfasdfasdfasdfadsfaeeee", "aeeeee"));
> -1

console.log(rabinKarp("asdfasdfasfasdfasdfasdfadsfaeeee", "asdf"));
> 0
```
---

