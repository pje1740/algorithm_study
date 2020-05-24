##  🍡 04 스택과 큐

> 데이터를 일시적으로 저장하기 위한 자료구조 2가지



#### 문제 유형 포인트 (뇌피셜)

- 입력값으로 배열이 주어진다.
- 문제를 보아하니 순서가 중요하다. (막 임의로 소팅하고 가공하지 않음)
- 대기목록, 총 경과 시간, 순서대로 이런 키워드 있으면..?



### 04-1. 스택

> 후입선출 (LIFO) 구조로 되어 있는 자료구조



#### 용어

- 데이터를 넣을 때 : PUSH
- 데이터를 꺼낼 때 : POP
- 꺼내고 넣는 쪽 : 꼭대기(top)
- 스택의 아랫부분 : 바닥(bottom)



#### TMI

-  Stack Overflow : 정해진 크기에 데이터를 계속 넣고 있다가 받아들일 수 있는 크기를 초과한 경우. 재귀함수 호출에서 자주 발생.

![](https://scontent-gmp1-1.xx.fbcdn.net/v/t1.0-9/88331278_216811509701796_689413281177141248_n.jpg?_nc_cat=111&_nc_sid=da1649&_nc_eui2=AeG4opm5coOUyCWQflN-xx_GnOlJGqITvO-c6UkaohO87ywP1Nhixjsqa3GhEjnpzxFB7s3zebT6jKzCH_GPaxrW&_nc_ohc=hRcaVrjawD8AX_iK89T&_nc_ht=scontent-gmp1-1.xx&oh=34bd6df557a4b221e1ff9bb8530781f6&oe=5EF1A21A)



#### 응용 및 활용 사례

- 깊이우선탐색(DFS) - 한 분기를 먼저 다 해결하고 다음 분기를 해결하는 경우
- 역순 문자열 만들기
- 후위 표기 수식 연산



### 04-2. 큐

> 선입선출 (LIFO) 구조로 되어 있는 자료구조
>
> 처리 복잡도 : O(1)



#### 용어

- 데이터를 넣을 때 : inqueue
- 데이터를 꺼낼 때 : dequeue
- 꺼내는 쪽 : front
- 넣는 쪽 : rear



#### 응용 및 활용 사례

- 너비우선탐색(BFS) - 분기를 순서대로 해결하는 경우



#### 링 버퍼 (ring buffer)

> front와 rear가 연결되어 있음.

- 원형 버퍼, 원형 큐라고도 불림.
- 처리 복잡도 : O(1)
- 선형 큐의 요소 이동 문제를 해결할 수 있다.
- 오래된 데이터를 버리는 용도로 사용할 수 있다.



### 스택/큐 문제에서 사용하는 JS 주요 함수

- top() : js는 제일 앞의 데이터를 알 수 있는 front() 함수가 있다네
- push() : 뒤에 추가
- pop() : 뒤에 삭제
- shift() : 앞에 삭제
- unshift() : 앞에 추가
- size() : js는 isempty(), isfull() 같은 함수가 없으므로 size() 또는 length()를 이용해야 한다. (도륵)



### 읽으면 좋을 레퍼런스

[[자료구조] 스택 (STACK), 큐(QUEUE) 개념/비교 /활용 예시](https://devuna.tistory.com/22)

https://twpower.github.io/151-bfs-dfs-basic-problem