# 🎯 스택 - 후위 표기식 ( ᐛ )و

#### 문제의 주요 로직

1. 평소에는 스텍에 부호들을 담아놨다가, **어떤 조건**에 맞으면 마지막에 들어온 순서대로 `pop()`한다.
2. 이 때, **조건**이란 지금 대상인 문자의 우선순위보다 스택 안에 들어있는 부호의 우선순위가 클 때.
3. 참고로 괄호의 경우 ')'를 만나면 스택 안에 '('가 빠져나올 때까지 부호를 `pop()`한다.

#### 그래서 이걸 왜 스택으로?

1. `(a - b) * c`  라는 수식의 경우 후위표기식으로 나타내면 `abc*-` 이다.
2. 즉, for문들 돌며 부호를 배열에 넣었을 때, 먼저 들어간 `-`보다 나중에 들어간 `*`가 문자열의 앞에 위치한다.
3. 따라서 후입선출이 특징인 스택을 사용하는 것이 더 효율적이다.

```javascript
let fs = require('fs');
let input = fs.readFileSync('dev/stdin').toString().trim().split('');
function checkSign(value){
	switch(value) {
		case '*' :
		case '/' :
			return 2;
		case '+' :
		case '-' :
			return 1;
		case '(' :
		case ')' :
			return 0;
		default:
			return -1;
	}
}
let stack = [];
let answer = [];
input.forEach(val => {
	switch(val) {
		case '*' :
		case '/' :
		case '+' :
		case '-' :
			while (stack.length!=0 && checkSign(stack[stack.length - 1]) >= checkSign(val)){
				answer.push(stack.pop());
			}
			stack.push(val);
			break;
		case '(' :
			stack.push(val);
			break;
		case ')' :
			while (stack.length!=0 && stack[stack.length - 1] != '('){
				answer.push(stack.pop());
			}
			stack.pop();
			break;
		default:
			answer.push(val);
	}
})
while (stack.length!=0){
	answer.push(stack.pop());
}
console.log(answer.join(''));

```



------



# 🎯 큐 - 다리를 지나는 트럭 ( ᐛ )و

- 많이 더러운데...줄일 수 있을 것 같으면서도 건들 수 없다.

#### 문제의 주요 로직

1. 가장 마지막 트럭이 큐에 추가될 때까지 시간을 **1초씩 계속 카운트**한다. (이게 가장 큰 while문)
2. 1초마다 2가지 기능을 수행한다.
   1. 다리를 다 건넌 트럭이 있는가? 있으면 **큐에서 내보내기**
   2. 다리에 트럭을 추가할 수 있는가? 있으면 **큐에 추가하기**
3. while문 다 돌고 나온 시간 + 다리 길이(마지막 트럭이 다리 끝까지 가는 시간을 더해주는 것) = <u>정답</u>

#### 그래서 이걸 왜 큐로?

1. 다리에 트럭이 순차적으로 움직인다. (뒤에 가던 차가 앞에 가던 차를 추월하지 않음)
2. 이런 일련의 과정을 수행했을 때 나오는 총 시간은?! 이런건 스택/큐를 쓰는게 맞는듯..?

```javascript
function solution(bridge_length, weight, truck_weights) {
    let time = 0; 
    let crossed_trucks = 0;
    let arr = truck_weights.map(x => {return {t: 0, w: x}});
    let bridge = [];
    let total_w = 0;
    while (crossed_trucks < truck_weights.length) {
        time++;
      	// 원래 로직은 끝에 있는 트럭 빼고나서, 새 트럭을 추가하는데
      	// 빈 도로에 처음 트럭이 들어오는 경우는 끝에 있는 트럭이 없다고 에러가 떠서 예외 처리.
        if (bridge.length == 0) {
            bridge.unshift(arr[0]);
            arr.shift();
            bridge[0].t = time;
            crossed_trucks++;
            total_w += bridge[0].w;
            continue ;
        }
        if (time - bridge[bridge.length -1].t == bridge_length) {
            total_w -= bridge[bridge.length -1].w;
            bridge.pop();
        }
        if (total_w + arr[0].w <= weight) {
            bridge.unshift(arr[0]);
            arr.shift();
            bridge[0].t = time;
            crossed_trucks++;
            total_w += bridge[0].w;
        }
    }
    return (time + bridge_length);
}
```





# 🎯 스택 - baseball player

```javascript
var calPoints = function(ops) {
    let stack = [];
    let answer = 0;
    ops.forEach(val => {
        switch(val) {
            case 'C' :
                stack.pop();
                break;
            case 'D' :
                stack.push(Number(stack[stack.length -1]) * 2);
                break;
            case '+' :
                stack.push(Number(stack[stack.length -1]) + Number(stack[stack.length -2]));
                break;
            default :
                stack.push(Number(val));
        }
        console.log(stack);
    })
    stack.forEach(val => {
        answer += Number(val);
    })
    return (answer);
};
```



# 🎯 큐 - 프린터
```javascript
function solution(priorities, location) {
    let answer = 0;
    let queue = [];
    let count = 0;
    for (let i = 0; i < priorities.length; i++) {
        queue.push({idx : i, data : priorities[i]})
    }
    let max = priorities.sort((a, b) => b - a);
    while (1) {
        while (queue[0].data != priorities[0]) {
            queue.push(queue.shift());
        }
        count++;
        if (queue[0].idx == location) {
            answer = count;
            break ;
        }
        queue.shift();
        priorities.shift();
    }
    return answer;
}
```



# 🎯 스택 - 탑

```javascript
function solution(heights) {
    let answer = [];
    let stack = heights.slice(0);
    for (let i = stack.length -1; i >= 0; i--) {
        let j;
        for (j = i - 1; j >= 0; j--) {
            if (stack[j] > stack[i]) {
                answer.unshift(j + 1);
                break ;
            }
        }
        if (j == -1) answer.unshift(0);
    }
    return answer;
}
```



# 🎯 큐 - 기능 개발

```javascript
function solution(progresses, speeds) {
    let answer = [];
    let queue = [];
    let count = 0;
    progresses.forEach(val => {
        queue.push(val);
    })
    while(1) {
        for (let idx in queue) {
            queue[idx] += speeds[idx];
        }
        if (queue[0] >= 100) {
            while (queue[0] >= 100) {
                queue.shift();
                speeds.shift();
                count++;
            }
            answer.push(count);
            count = 0;
        }
        if (queue.length == 0)
            break ;
    }
    return answer;
}
```