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



------


