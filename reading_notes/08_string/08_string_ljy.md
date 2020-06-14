# ☹️ 08 문자열 검색

> 어떤 문자열 안에 다른 문자열이 들어 있는지 조사하고, 들어 있다면 그 위치를 찾아내는 것.



## 08-1. 브루트 포스법

> 단순법, 소박(素朴)법

- 텍스트의 위치를 한 칸씩 이동하며 패턴과 일치하는 문자열이 있는지 찾는 방법
- 다른 문자를 만나면 패턴이 지금까지 검사했던 위치를 0으로 초기화하기 때문에 비효율적이다.

```javascript
const text = 'ababcdefgha'
const pattern = 'abc'

let pt = 0;
let pp = 0;
while (pt !== text.length && pp !== pattern.length) {
	if (text[pt] == pattern[pp]) {
		pt++;
		pp++;
	} else {
		pt = pt - pp + 1;
		pp = 0;
	}
}
if (pp == pattern.length) {
	console.log(pt - pp);
} else {
	console.log("검색 실패!");
}

```



## 08-2 KMP법

> 패턴의 겹치는 부분을 찾아내 검사를 다시 시작할 위치를 구한다.

- Knuth, Morris, Pratt가 거의 동시에 고안한 방법이라 KMP
- pi배열를 이용하는 것이 포인트. pi배열이란 패턴의 배열 중 접미사도 되고 접두사도 되는 문자열의 최대 길이
- 브루트 포스보다 복잡하고 보이어-무어보다 성능이 같거나 좋지 않아 실제 프로그램에서는 거의 사용하지 않는다.  그럼 왜 공부하는거야 ^p^ 



```javascript
const text = 'abcafabcabdefghabc'
const pattern = 'abcab'

let pt = 1;
let pp = 0;
let skip = new Array(pattern.length).fill(-1);

skip[pt] = 0;
while (pt != pattern.length) {
	if (pattern[pp] == pattern[pt])
		skip[++pt] = ++pp;
	else if (pp == 0)
		skip[++pt] = pp;
	else
		pp = skip[pp]; // 근데 여기를 왜 굳이 0이 아니라 이렇게 쓰는지 모르겠다.
}
pt = pp = 0;
while (pt != text.length && pp != pattern.length) {
	if (text[pt] == pattern[pp]) {
		pt++;
		pp++;
	} else if (pp == 0) {
		pt++;
	} else {
		pp = skip[pp];
	}
}
if (pp == pattern.length)
	console.log(pt - pp);
else
	console.log("결과 없음")

```



## 08-3. Boyer-Moore법

> 패턴의 마지막 문자부터 앞쪽으로 검사를 진행하면서, 일치하지 않는 문자가 있으면 건너뛰는 알고리즘.

```javascript
const text = 'abcafabcabbdefghabc'
const pattern = 'abcab'

let pt;
let pp;
let txtLen = text.length;
let patLen = pattern.length;

// 건너뛰기 표 만들기
let skip = new Map();
for (let i of text) {
	skip.set(i, patLen);
}
for (pt = 0; pt < patLen; pt++) {
	if (skip.has(pattern[pt])) {
		skip.set(pattern[pt], patLen - pt - 1);
	}
}
// 검색
while (pt < txtLen) {
	pp = patLen - 1;
	while (text[pt] == pattern[pp]) {
		if (pp == 0) {
			console.log(pt);
			return ;
		}
		pp--;
		pt--;
	}
	pt += Math.max(skip.get(text[pt]), patLen - pp)
}
console.log("검색 실패");

```



### [부록] JS에서 문자열 찾기 관련 메소드

- `indexOf(문자열, ?시작위치)` : 부분 문자열이 처음 나오는 위치값을 반환.
- `lastIndexOf(문자열, ?시작위치)` : 부분 문자열이 마지막으로 나오는 위치값을 반환.
- `match(정규식)` : 문자열이 정규식과 매치되는 부분 검색. 보통 정규식 검색에 쓰는 메서드지만 일반 문자열 검색도 가능. 

```javascript
const text = 'ababcdefghabc'
const pattern = 'abc'

console.log(text.indexOf(pattern));
// 2

console.log(text.lastIndexOf(pattern));
// 10

console.log(text.match(pattern));
// [ 'abc', index: 2, input: 'ababcdefghabc', groups: undefined ]
```

