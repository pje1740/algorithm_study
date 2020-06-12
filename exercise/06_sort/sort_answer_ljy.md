# 🎯 정렬 : H-Index

#### Note

- 단순한 내용이이었는데 너무 어렵게 접근해서 한참 헤맸다.
- 왠지 정렬을 그럴듯하게 써야할 것 같다는 부담 때문인듯.

#### 풀이

```javascript
function solution(citations) {
    var answer = 0;
    citations.sort((a, b) => b - a);
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] > i)
            answer++;
        else
            break;
    }
    return answer;
}
```



# 🎯 정렬 : 파일명 정렬

#### Note

- 혼자서 해보려다가 포기하고 다른 사람들 코드를 봤다.
- 정규식을 써야할 것 같다고 생각했는데, 정규식을 쓰는게 맞았다.
- sort() 메소드를 얼마나 이해하고 있는지, 그리고 인자로 전달되는 비교 함수 (compareFunction) 의 반환값을 이해하고 있는지가 중요한 문제였다. 그냥 무의식적으로 쓰고 있는 함수였는데 이번에 제대로 이해했다.
- localeCompare() 메소드는 처음 봤는데 문자열을 비교할 때 쓰는 함수라는걸 처음 알았다.

#### 풀이

```javascript
function solution(files) {
    let answerMap = files.map((file, index) => ({file, index}));
    const compare = (a, b) => {
        const regExp = /(\D*)(\d*)/i;
        const A = a.match(regExp);
        const B = b.match(regExp);
        const compareHead = A[1].toLowerCase().localeCompare(B[1].toLowerCase());
        const compareNumber = parseInt(A[2]) - parseInt(B[2]);
        return compareHead === 0 ? compareNumber : compareHead;
    }
    answerMap.sort((a, b) => {
        let compareResult = compare(a.file, b.file);
        return compareResult === 0 ? a.index - b.index : compareResult;
    })
    return (answerMap.map((answer) => (answer.file)););
}
```





## 🎯 단어 선택

```javascript
let fs = require('fs');
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let answer = input;
answer.sort((a, b) => {
	let al = a.length;
	let bl = b.length;
	if (al < bl)
		return -1;
	else if (al > bl)
		return 1;
	else
		return a.localeCompare(b)
})
for (let i = 0; i < answer.length; i++) {
	if (isNaN(answer[i]) && answer[i] != answer[i + 1])
		console.log(answer[i]);
}
```





## 🎯 가장 큰 수

```javascript
function solution(numbers) {
    numbers.sort((a, b) => {
        const ab = Number(a.toString() + b.toString());
        const ba = Number(b.toString() + a.toString());
        if (ab > ba)
            return -1;
        else if (ab < ba)
            return 1;
        else
            return 0;
    });
    let answer = [];
    while (numbers[0] == "0")
        numbers.shift();
    if (numbers.length == 0)
        answer.push("0");
    for (let i = 0; i < numbers.length; i++) {
        answer.push(numbers[i]);
    }
    return answer.join("");
}
```



## 🎯 75. Sort Colors

```javascript
var swap = (arr, a, b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
var sortColors = function(nums) {
    let low = -1;
    let high = nums.length;
    let mid = 0;
    let num = 0;
    while (mid < high) {
        if (nums[mid] == "0") {
            low += 1;
            swap(nums, low, mid);
            mid += 1;
        } else if (nums[mid] == "2") {
            high -= 1;
            swap(nums, high, mid);
        } else {
            console.log("1")
            mid += 1;
        }
        num += 1;
    }
    return nums;
};
```

