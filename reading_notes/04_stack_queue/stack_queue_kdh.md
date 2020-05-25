## 스택 / 큐

### 스택

> LIFO (Last In First Out)

#### 시간 복잡도

- 원소 추가 O(1)
- 원소 제거 O(1)
- 제일 상단 원소 확인 O(1)
  - 제일 상단 아닌 나머지 원소들의 확인/변경 원칙적으로는 불가능

#### 구현

- 연결 리스트

- 배열

  - 저장 배열 dat
  - 원소 추가시 삽입 해야할 곳 가리키는 pos 변수
  - top으로 최상단 원소 확인
  - pop할때 pos변수만 조절

- STL 사용

  - #include <stack>

  - push, pop, top, size, empty ...

    

### 큐

> FIFO (First In First Out)

#### 시간 복잡도

- 원소 추가 O(1)
- 원소 제거 O(1)
- 제일 앞/뒤 원소 확인 O(1)
  - 제일 앞/뒤 아닌 나머지 원소들의 확인/변경 원칙적으로는 불가능

#### 구현

- 연결리스트
- 배열
  - 원형 큐로 구현하여 pop한 앞 인덱스 재활용 가능
  - head는 큐의 제일 앞 원소 가리킴
  - tail은 원소를 삽입 해야할 곳 가리키는 변수
  - front, back으로 제일 앞/뒤 원소 확인
- STL
  - #include <queue>
  - push, pop, front, back, size, empty ...

