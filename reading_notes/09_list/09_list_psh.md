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



















