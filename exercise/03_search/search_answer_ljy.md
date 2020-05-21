# 🎯 완전탐색 - 한수

- 이게 완전탐색 문제가 맞는지 애매하나...일단 탐색 카테고리에 있기에 가져왔다.
- 결론 = javascript는 백준에서 풀기가 어렵다.

```javascript
// 들어오는 값을 저장하기 위한 코드,
let input = [];
require("readline")
	.createInterface(process.stdin, process.stdout)
	.on("line", function(line) {
		input = Number(line);
}).on("close", function(line) {
// 실제 로직 시작
	let count = 0;
	for(let i = 1; i <= input; i++) {
		const arr = i.toString().split('');
		let num = null;
		let flag = 1;
		for (let j = arr.length - 1; j > 0; j--) {
			if (num == null) {
				num = arr[j] - arr[j - 1];
				continue ;
			}
			else if (arr[j] - arr[j - 1] != num) {
				flag = 0;
				break ;
			}
		}
		count += flag;
	}
	console.log(count);
	process.exit();
})

```



------



# 🎯 이진탐색 - 입국심사

- 내가 작성한 방법과 프로그래머스 답안을 비교하여 새로 쓴 답안. 프로그래머스에서 본 방법은 주석 처리.

```javascript
// 매번 메서드를 불러오지 않게 간소화
var floor = n => Math.floor(n);

function solution(n, times) {
    //  정렬
    times.sort((a, b) => {
        return a - b;
    });
    // 최솟값은 1, 최댓값은 모든 사람이 제일 느린 심사관에게 심사 받는 경우.
    var left = 1;
    var right =  times[times.length - 1] * n;		// 방법 1
    // var right = Math.max.apply(null, times) * n;	// 방법 2, 이 때는 정렬이 필요 없다.
	var answer = right;
	
    while (left <= right) {
        var mid = floor((left + right) / 2);
      	// 방법 1
        var sum = 0;
        times.forEach(x => {
            sum += floor(mid/x);
        })
        // 방법 2
        // var sum = times.reduce((acc, cur) => {
        //     acc += floor(mid/cur);
        //     return acc;
        // }, 0);
        if (sum < n) 
            left = mid + 1;
        else {
            if (answer > mid)
                answer = mid;
            right = mid - 1;
        }
    }
    return answer;
}

```

------



# 🎯 이진탐색 - 수 찾기 (백준 1920번)

- 계속 시간 초과가 뜨길래 다른 통과예제들을 살펴봤더니 input을 여러줄 받아오고, 특정 라인을 배열로 split할 때 마지막에 map함수를 이용해서 전처리를 해줘야 초과가 뜨지 않았다.

```javascript
let fs = require('fs');
let input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const dest = input[1].split(' ').map(val => +val).sort((a, b) => a - b);
const src = input[3].split(' ').map(val => +val);
src.forEach (val => {
	let left = 0;
	let right = dest.length - 1;
	let mid;
	let answer = 0;
	while (left <= right) {
		mid = Math.floor((left + right)/2);
		if (dest[mid] > val) {
			right = mid-1;
		} else if (dest[mid] < val) {
			left = mid+1;
		} else {
			answer = 1;
			break ;
		}
	}
	console.log(answer);
})

```

------



# 🎯 이진탐색 - 예산

```javascript
function solution(budgets, M) {
    let left = 0;
    let right = Math.max.apply(null, budgets);
    let answer = left;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let sum = 0;
        budgets.forEach(val => {
            sum += (val > mid) ? mid : val;
        })
        if (sum <= M) {
            if (answer < mid) {
                answer = mid;
            }
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return answer;
}
```

