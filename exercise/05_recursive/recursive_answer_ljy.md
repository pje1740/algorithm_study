# 🎯 재귀 : 괄호 변환

#### NOTE

1. 용어의 정의에 나오는 순서 그-대로 코드 작성했다. (그랬더니 되네)
2. 아, 나는 코테 통과하려면 한참 멀었구나:)
3. 그래도 다른 사람의 풀이 보니 다 길어서 마음의 위안을 얻었다.

#### 그래서 이걸 왜 재귀로?

1. 문제에 반복적으로 "재귀"라는 단어가 나온다.
2. 약간 하노이탑이랑 최소공배수 풀던 로직( `(a, b) -> (b, a%b)` 이런 식) 과 비슷한 느낌을 받았다.

#### POINT

1. 용어의 정리  하단에 나오는 로직 순서 그대로 코드로 표현하면 웬만하면 성공하는 듯.
2. 정확성 테스트 12번부터 틀리는 경우는 지문 4-4에서 문자열의 괄호 방향을 뒤집을 때 문자열을 역순으로 뒤집는 게 아니라 for문 돌려서 `)`는 `(`로, `(`는 `)`로 바꾸면 통과. (`reverse` 함수 썼더니 틀렸다.)

#### 풀이

```javascript
function solution(p) {
    let answer = '';
    let u = [], v = [];
    let arr = p.split('');
    
    // 입력이 빈 문자열인 경우, 빈 문자열을 반환.
    if (arr.length == 0)
        return answer;
    
    // 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리한다.
    let left = 0, right = 0;
    for (let el of arr) {
        if (el == ')')
            left++
        else if (el == '(')
            right++;
        u.push(el);
        if (left == right)
            break ;
    };
    v = arr.slice(left + right);
    
    // 올바른 괄호 문자열인지 확인하는 함수. 올바르다면 0, 아니면 배열에 남은 문자 개수 반환.
    let arr_to_find_pair = [];
    for (let i = 0; i < u.length; i++) {
        if (i == 0 && u[i] == '(')
            arr_to_find_pair.push(u[i]);
        else if (u[u.length - 1] == ')')
            arr_to_find_pair.pop();
        else
            arr_to_find_pair.push(u[i]);
    }
    
    // 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행.
    if (arr_to_find_pair.length == 0) {
        // 올바른거 뒤에 합치기
        answer += u.join('');
        answer += solution(v.join(''));
        // 생성된 문자열 반환.
        return answer;
    }
    // 빈 문자열이 아니라면 아래 과정을 수행한다.
    else {
        // 빈 문자열에 첫 번째 문자로 '('를 붙인다.
        answer += '(';
        answer += solution(v.join(''));
        answer += ')';
        // u의 첫 번째, 마지막 문자 제거 + 괄호 방향 뒤집기
        u = u.slice(1, -1).forEach(val => {
            if (val == ')')
                answer += '(';
            else if (val == '(')
                answer += ')';
        })
        // 생성된 문자열 반환.
        return answer;
    }
}
```



# 🎯 재귀 : Power of Three

https://leetcode.com/problems/power-of-three/submissions/



```javascript
var isPowerOfThree = function(n) {
    if (n == 1)
        return true;
    if (n == 0 || n % 3 > 0)
        return false;
    else
        return isPowerOfThree(n / 3);
};
```



# 🎯 재귀 : Z

```javascript
let ans = 0;
function recur(begin, target, words, num, min, hasChecked) {
    for (let i = 0; i < words.length; i++) {
        if (begin == target) {
            if (ans == 0 || num < ans)
                ans = num;
        }
        let isIN = 0;
        for (let k = 0; k < num; k++) {
            if (hasChecked[k] == words[i]) {
                isIN = 1;
            }
        }
        if (isIN == 0) {
            let count = 0;
            for (let j = 0; j < begin.length; j++) {
                if (begin[j] == words[i][j])
                    count++;
            }
            if (count >= begin.length -1) {
                hasChecked.push(words[i]);
                recur(words[i], target, words, num + 1, min, hasChecked);
            }
        }
    }
}
function solution(begin, target, words) {
    var answer = 0;
    var hasChecked = []
    if (words.indexOf(target) == -1)
        return answer;
    else {
        recur(begin, target, words, 0, 0, hasChecked);
        answer = ans;
    }
    return answer;
}
```



# 🎯 재귀 : 괄호 변환

```javascript
let fs = require('fs');
	let input = fs.readFileSync('dev/stdin').toString().trim().split(' ');
	let power = input[0];
	let x = input[1];
	let y = input[2];
	let answer = 0;
	function recur(power, x, y) {
		if (power == 0)
			return answer;
		let num = Math.pow(2, power);
		let sum = num * num;
		let half = num /2;
		let section = 0;
		if (x >= half && y >= half) {
			section = 3;
		} else if (x >= half && y < half) {
			section = 2;
		} else if (x < half && y >= half) {
			section = 1;
		}
		answer += (sum / 4) * (section);
		recur(power - 1, x % half, y % half);
	}
	recur(power, x, y);
	console.log(answer);
```

