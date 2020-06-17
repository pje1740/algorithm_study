# 🤔 찾기

#### Note

- 37%-40%에서 자꾸 시간초과가 난다.
- 죽겠다.

#### 풀이

```javascript
let input = [];
require("readline")
	.createInterface(process.stdin, process.stdout)
	.on("line", function(line) {
	input.push(line.toString().split("\n"));
}).on("close", function(line) {
	const txt = input[0].toString();
	const pattern = input[1].toString();
	let pt = 1;
	let pp = 0;
	let patLen = pattern.length;
	let skip = new Array(patLen).fill(-1);
	skip[pt] = 0;
	while (pt != patLen) {
		if (pattern[pp] == pattern[pt])
			skip[++pt] = ++pp;
		else if (pp == 0)
			skip[++pt] = pp;
		else
			pp = skip[pp];
	}
	pt = pp = 0;
	let first = Math.max(skip.indexOf(1), 0);
	let count = 0;
	let answer = "";
	while (pt !== txt.length) {
		if (pp !== patLen) {
			if (txt[pt] === pattern[pp]) {
				pt++;
				pp++;
			} else if (pp == 0)
				pt++;
			else
				pp = skip[pp];
		}
		if (pp == patLen) {
			count++;
			answer = answer.concat(' ').concat(pt - pp + 1);
			if (pt !== txt.length)
				pt = pt - pp + 1;
			pp = 0;
		}
	}
	console.log(count);
	if (answer.length)
		console.log(answer.slice(1));
})
```



# 🤔 문자열 압축

#### Note

- 테스트 2번, 20번에서 자꾸 틀려서 확인해보니 10, 1000처럼 숫자 단위가 커질 때도 길이를 1만 추가시켜줘서 그랬다.
- 이중for문에서 내부에 있는 for문이 비효율적으로 작성되었는데 (j를 안쓰는데 선언해서) while로 바꾸려니 자꾸 틀린다.

#### 풀이

```javascript
function solution(s) {
    const sLen = s.length;
    let maxLen = sLen;
    for (let i = 1; i <= Math.floor(sLen / 2); i++) {
        let pattern = s.substr(0, i);
        let count = 1;
        let temp = sLen;
        let index = i;
        for (let j = 0; j < Math.floor(sLen / i); j++) {
            let target = s.substr(index, i);
            if (pattern == target) {
                count++;
            } else {
                if (count !== 1) {
                    temp = temp - ((count - 1) * i) + count.toString().length;
                    count = 1;
                }
                pattern = target;
            }
            index += i;
        }
        maxLen = Math.min(maxLen, temp);
    }
    return maxLen;
}
```





### Maximum Number of Vowels in a Substring of Given Length

- temp배열을 갱신할 때 라빈 카프 방식처럼 맨 앞 요소를 제거하고 맨 뒤에 새 요소를 추가했더니 통과했다.

```javascript
var maxVowels = function(s, k) {
    const vowels = "aeiou";
    let indexArr = [];
    for (let i = 0; i < s.length; i++) {
        if (vowels.indexOf(s[i]) !== -1)
            indexArr.push(1);
        else
            indexArr.push(0);
    }
    let temp = indexArr.slice(0, k);
    let max = temp.reduce((a, b) => a + b, 0);
    for (let j = 1; j < indexArr.length - k + 1; j++) {
        temp.shift();
        temp.push(indexArr[k + j - 1]);
        let tmpMax = temp.reduce((a, b) => a + b, 0);
        if (max < tmpMax)
            max = tmpMax;
    }
    return max;
};
```





### Word Subsets

- B의 개수가 많아질 때 런타임 에러가 나서 소현님께 여쭤보니 B를 별도로 가공하여 하나의 배열로 만드는 로직이 필요하다고 하셔서 추가했다.

> Runtime: 228 ms, faster than 84.78% of JavaScript online submissions for Word Subsets.
>
> Memory Usage: 56.7 MB, less than 67.50% of JavaScript online submissions for Word Subsets.

```javascript
var wordSubsets = function(A, B) {
    let bArr = new Array(26).fill(0);
    B.forEach(b => {
        let tempArr = new Array(26).fill(0);
        for (let i = 0; i < b.length; i++) {
            let index = (b[i].charCodeAt(0) - "a".charCodeAt(0));
            tempArr[index] += 1;
        }
        for (let j = 0; j < 26; j++) {
            bArr[j] = Math.max(bArr[j], tempArr[j]);  
        }
        tempArr.fill(0);
    })
    let answer = [];
    for (let a of A) {
        let aTempArr = new Array(26).fill(0);
        let isMatch = true;
        for (let k = 0; k < a.length; k++) {
            let aIndex = (a[k].charCodeAt(0) - "a".charCodeAt(0));
            aTempArr[aIndex] += 1;
        }
        if (isMatch == false)
            continue;
        for (let j = 0; j < 26; j++) {
            if (bArr[j] > aTempArr[j]){
                isMatch = false;
                break ;
            }
        }
        if (isMatch == true)
            answer.push(a);
    }
    return answer;
};
```



### 가사 검색

- 효율성 1,2,3번에서 틀리는데, 질문하기에서 확인해보니 선형 구조는 안되고 트리 구조로 짜야 한대서 쿨하게 포기했다.

```javascript
function solution(words, queries) {
    var answer = [];
    for (let query of queries) {
        const querLen = query.length;
        const isStart = (query[0] === '?') ? false : true;
        const querTrimLen = query.replace(/\?/gi, '').length;
        let result = 0;
        
        for (let word of words) {
            const wordLen = word.length;
            if (querLen !== wordLen) {
                continue ;
            }
            let count = 0;
            if (isStart === true) {
                for (let i = 0; i < querTrimLen; i++) {
                    if (word[i] == query[i]) {
                        count++;
                    } else {
                        break ;
                    }
                }
            } else {
                for (let i = word.length - 1; i > word.length - querTrimLen - 1; i--) {
                    if (word[i] == query[i]) {
                        count++;
                    } else {
                        break ;
                    }
                }
            }
            if (count == querTrimLen)
                result += 1;
        }
        answer.push(result);
        result = 0;
    }
    return answer;
}
```

