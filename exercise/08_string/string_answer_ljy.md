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

