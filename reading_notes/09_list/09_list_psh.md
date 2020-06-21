# 09 리스트

## 09-1 선형 리스트

리스트는 데이터를 순서대로 나열한 자료구조이다. 

### 선형 리스트

가장 단순한 구조를 이루고 있는 리스트를 선형 리스트, 또는 연결 리스트라고 한다. 모든 노드가 순서대로 연결되어 있고, 한 노드를 건너뛰어 접근할 수는 없습니다. 

각각의 노드는 데이터와 다음 노드를 가리키는 포인터를 가지고 있다. 처음과 끝에 있는 노드는 특별히 각각 머리 노드 (head node), 꼬리 노드 (tail node)라고 한다. 

## 09-2 포인터로 연결 리스트 만들기

연결 리스트에 데이터를 삽입할 때 노드용 객체를 만들고, 삭제할 때 노드용 객체를 없애면 된다. 다음은 노드 클래스이다.

```java
class Node<E>{
  E data;
  Node<E> next;
}
```

Node 형 연결 리스트를 클래스 LinkedList<E>로 구현한 프로그램.

```java
import java.util.Comparator;

public class LinkedList<E> {
  // 노드
  class Node<E>{
    private E data;
    private Node<E> next;
  
  	// 생성자
    Node(E data, Node<E> next) {
      this.data = data;
      this.next = next;
    }
  }
  
  private Node<E> head;  // 머리 노드
  private Node<E> crnt;  // 선택 노드
  
  // 생성자
  public LinkedList() {
    head = crnt = null;
  }
}
```

#### 연결 리스트가 비어 있는지 판단하는 방법

```java
head == null
```

#### 노드가 1개인 연결 리스트를 판단하는 방법

```java
head.next == null
```

#### 노드가 2개인 연결 리스트를 판단하는 방법

```java
head.next.next == null
```

#### 꼬리 노드인지 판단하는 방법

```java
p.next == null
```



## 09-3 커서로 연결 리스트 만들기

연결 리스트에서 삭제를 수행할 때, 매번 메모리 영역을 만들고 해제하는 비용이 많이 발생하게 된다. 프로그램 실행 중에 데이터 수가 크게 바뀌지 않고, 데이터 수의 최댓값을 미리 알 수 있다고 가정하면 배열을 사용해 효율적으로 연결 리스트를 운용할 수 있다. 

배열의 커서는 다음 노드에 대한 포인터가 아니라, 다음 노드가 들어있는 배열 내 요소의 인덱스 값이 된다. 그래서 head가 바뀌면 head라는 변수가 해당 요소의 인덱스를 값으로 가지고, tail이 바뀌면 -1을 갖고 있던 요소가 추가된 요소의 인덱스 값을 가지게 된다.

```java
// 커서 연결리스트 필드
public class AryLinkedList<E> {
  
  //노드
  class Node<E>{
    private E data; // 데이터
 		private int next; // 리시트의 뒤쪽 포인터
  	private int dnext; // free 리스트의 뒤쪽 포인터
  }
  
  ...

	private Node<E>[] n;	// 리스트 본체
  private int size;			// 리스트의 용량 (가장 큰 데이터 수)
  private int max;			// 사용 중인 꼬리 record
  private int head;			// 머리 노드
  private int crnt;			// 선택 노드
  private int deleted;	// free 리스트의 머리 노드
  private static final int NULL = -1;	// 다음 노드 없음 / 리스트가 가득 참
}
```

### 배열의 비어 있는 요소 처리하기

이런 형태의 연결리스트는 삭제에서 문제가 생길 수 있다. 배열 형태로 관리하게 되다보니, 만약 삭제를 진행하면 그 공간(레코드)은 계쏙 비어있게 된다. 이를 효율적으로 관리하기 위해 프리 리스트라는 개념이 있다. 

#### 프리 리스트

삭제한 레코드를 관리하기 위해 사용하는 것이 그 순서를 넣어두는 연결 리스트인 프리 리스트이다. 이 리스트 또한 연결 리스트인 셈으로, 삭제된 레코드 인덱스를 순서대로 저장해두고, 새로운 걸 채울 때, 헤드부터 꺼내서 사용하게 된다. 



## 09-4 원형 이중 연결 리스트

### 원형 리스트

꼬리 노드가 머리 노드를 가리키면 원형 리스트라고 한다. 

### 이중 연결 리스트

이중 연결 리스트는 노드에 다음 노드와 앞쪽 노드에 대한 포인터를 추가하여 다음 노드만이 아니라, 앞에도 어떤 노드였는지 알 수 있게 하는 자료구조다. 

```java
class Node<E> {
  E data;
  Node<E> prev;
  Node<E> next;
}
```

### 원형 이중 연결 리스트

위의 두 개념을 섞은 자료구조. 

최초에 생성할 때, 비어있는 경우라도 더미 노드를 만들어서 헤드가 가리키게 한다고 한다. 이 더미노드의 prev, next 모두 자기 자신을 가리킨다. 더미 노드 때문에 검색을 해야 하는 경우, 검색의 시작점은 head.next 로 잡아야 한다. 

















