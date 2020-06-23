# ⛳️ Remove Duplicates from Sorted List II

#### Note

- 예에전 피신 때 봤지만 풀지 못했던 문제와 비슷한 느낌을 받았다.
- node 자체는 이전 노드를 볼 수 없으니 node.next와 node.next.next 를 가지고 푸는 문제.

#### 풀이

```javascript
var deleteDuplicates = function(head) {
    let node = new ListNode(null, head);
    let nodeHead = node;
    while (node.next && node.next.next) {
        if (node.next.val === node.next.next.val) {
            let duplicate = node.next.val;
            while (node.next && node.next.val === duplicate) {
                node.next = node.next.next;
            }
        }
        else {
            node = node.next;
        }
    }
    return nodeHead.next;
};
```



# ⛳️ Remove Zero Sum Consecutive Nodes from Linked List

Runtime: 284 ms, faster than 5.80% of JavaScript online submissions for Remove Zero Sum Consecutive Nodes from Linked List.

Memory Usage: 47 MB, less than 6.82% of JavaScript online submissions for Remove Zero Sum Consecutive Nodes from Linked List.

```javascript
var removeZeroSumSublists = function(head) {
    let node = head;
    let before = new ListNode(null, head);
    let arr = [];
    let count = 0;
    while (node) {
        arr.push(0);
        count++;
        for (let i in arr) {
            arr[i] = arr[i] + node.val;
        }
        let idx = arr.lastIndexOf(0);
        if (idx !== -1) {
            arr = arr.slice(0, idx);
            let start = before;
            while (idx > 0) {
                start = start.next;
                idx--;
            }
            start.next = node.next;
        } 
        node = node.next;
    }
    return before.next;
};
```



# ⛳️ 에디터

https://www.acmicpc.net/problem/1406

- 예시는 통과하는데 제출하면 틀린다.
- 시간날 때 예외 케이스 찾아서 풀 예정

```javascript
// 백준
// let fs = require('fs');
// let input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

// 테스트용
let input = [];
require("readline")
	.createInterface(process.stdin, process.stdout)
	.on("line", function(line) {
	input.push(line.toString().split("\n"));
}).on("close", function(line) {
	let str = input.shift().toString();
	let num = input.shift().toString();
	let idx = inpLen = str.length;
	let answer = input.reduce((acc, cur) => {
		let accLen = acc.length;
		let target = cur[0];
		switch (target) {
			case "L" :
				if (idx !== 0) {
					idx -= 1;
				}
				break;
			case "D" :
				if (idx !== accLen) {
					idx += 1;
				}
				break;
			case "B" :
				if (idx !== 0) {
					acc = acc.slice(0, idx - 1) + acc.slice(idx);
					idx--;
				}
				break;
			default :
				let charactor = target.slice(-1);
				acc = acc.slice(0, idx) + charactor + acc.slice(idx);
				idx++;
				break;
		}
		return (acc);
	}, str);
	console.log(answer);
})

```



