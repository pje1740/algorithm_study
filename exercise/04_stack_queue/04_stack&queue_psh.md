# CH04 스택과 큐

## 04-1 스택

#### 스택

데이터를 일시적으로 저장하기 위해 사용하는 자료구조로, 후입선출의 특징을 가지고 있다. 스택에 데이터를 넣는 작업을 푸시라고 하고, 꺼내는 작업을 팝이라고 한다. 푸시, 팝을 하는 위치를 top, 가장 아랫부분이 bottom이다. 



#### 스택 만들기

```java
class InStack {
	int max;  // 스택 용량
	int ptr;  // 스택 포인터
	int[] stk;  // 스택 본체
}
```

- max: 스택의 용량. stk의 요소 수와 같다. 
- ptr: 스택에 쌓여 있는 데이터 수. 스택 포인터



**메서드**

- 푸시 push 메서드: 맨 위에 값을 넣는다
- 팝 pop 메서드: 맨 위의 값을 빼낸다
- 피크 peek 메서드: 맨 위의 값을 확인한다. 
- 검색 index Of 메서드: 특정 값이 스택 배열에 있는지 검색. 없거나 검색 실패 시 -1을 반환한다. 동일한 값이 여러개라면 가장 위의 것을 반환한다. 
- 삭제 clear 메서드: 스택에 쌓여있는 모든 데이터를 삭제
- 용량 capacity 확인 메서드: 스택의 max를 반환하는 메서드
- 데이터 수 size 확인 메서드: 현재 스택에 쌓여 있는 데이터 수 ptr을 반환하는 메서드
- 스택이 비어 있는지 검사하는 메서드 IsEmpty: 스택이 비어있는지를 boolean으로 반환
- 스택이 가득 찼는지 검사하는 메서드 IsFull: 스택이 가득 찼는지 booelan으로 반환
- 모든 데이터를 표시하는 dump 메서드: 바닥에서 꼭대기 순으로 데이터를 표시하는 메서드

```java
package chap04;

public class IntStack {
	private int max;  // 스택 용량 
	private int ptr;  // 스택 포인터 
	private int[] stk;  // 스택 본체 
	
	// 실행 시 예외: 스택이 비어있음 
	public class EmptyIntStackException extends RuntimeException {
		public EmptyIntStackException() { }
	}

	// 실행 시 예외: 스택이 가득 참
	public class OverflowIntStackException extends RuntimeException {
		public OverflowIntStackException() { }
	}

	// 생성자 
	public IntStack(int capacity) {
		ptr = 0;
		max = capacity;
		try {
			stk = new int[max];
		} catch (OutOfMemoryError e) {
			max = 0;
		}
	}
	
	public int push(int x) throws OverflowIntStackException {
		if (ptr >= max)
			throw new OverflowIntStackException();
		return stk[ptr++] = x;
	}
	
	public int pop() throws EmptyIntStackException {
		if (ptr <= 0)
			throw new EmptyIntStackException();
		return stk[--ptr];
	}
	
	public int indexOf(int x) {
		for (int i = ptr - 1; i >= 0; i--)
			if (stk[i] == x)
				return i;
		return -1;
	}
	
	public void clear() {
		ptr = 0;
	}
	
	public int capacity() {
		return max;
	}
	
	public int size() {
		return ptr;
	}
	
	public boolean isEmpty() {
		return ptr <= 0;
	}
	
	public boolean isFull() {
		return ptr >= max;
	}
	
	public void dump() {
		if (ptr <= 0)
			System.out.println("Stack is empty");
		else {
			for (int i = 0; i < ptr; i++)
				System.out.print(stk[i] + " ");
			System.out.println();
		}
	}
}
```



## 04-2 큐

#### 큐

스택과 마찬가지로 데이터를 일시적으로 쌓아 놓는 자료구조. 선입선출인 점이 다르다. 먼저 줄 선 사람이 먼저 창구로 가는 것과 비슷한 원리.

큐에 데이터를 넣는 작업을 인큐(enqueue), 데이터를 꺼내는 작업을 디큐(dequeue), 데이터를 꺼내는 쪽을 프런트, 넣는 쪽을 리어라고 합니다. 

#### 인큐와 디큐 관련 처리 복잡도

데이터를 새로 인큐 하는 것은 단순히 뒤에 넣으면 되기 때문에 O(1)의 복잡도를 갖게 된다. 단, 디큐의 경우 가장 앞에 넣어둔 걸 빼고나서 나머지를 모두 하나씩 앞으로 당겨줘야 하기 때문에 O(n)의 복잡도를 가진다. 이런 한계성을 극복하기 위한 방법이 링 버퍼이다. 

#### 링 버퍼

배열의 처음과 끝이 연결되었다고 보는 자료구조. 여기서 논리적으로 어떤 요소가 첫 번째 요소이고 어떤 요소가 마지막 요소인지 식별하기 위한 변수가 프런트와 리어. 꼭 0번이 시작이 아니라, 무언가 빠지면 프런트의 인덱스 번호를 하나 뒤로 이동시키고, 리어도 무언가 들어올 때마다 하나씩 증가하는 개념. 

### 큐 클래스 IntQueue

```java
public class IntQueue {
	private int max;
	private int front;
	private int rear;
	private int num;
	private int[] que;
	
	public class EmptyIntQueueException extends RuntimeException{
		public EmptyIntQueueException() { }
	}
	
	public class OverflowIntQueueException extends RuntimeException {
		public OverflowIntQueueException() { }
	}
	
	public IntQueue(int capacity) {
		num = front = rear = 0;
		max = capacity;
		try {
			que = new int[max];
		} catch (OutOfMemoryError e) {
			max = 0;
		}
	}
}
```



#### 필드

- que: 데이터를 저장하는 배열
- max: 큐의 최대 용량
- front: 첫 번째 요소의 인덱스
- rear: 마지막으로 넣은 요소의 하나 뒤 인덱스
- num: 현재 데이터 수. front와 rear의 값이 같은 경우 큐가 비어있는지, 가득 찼는지 구별할 수 없는 상황을 피하기 위해 필요한 변수. 











