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

