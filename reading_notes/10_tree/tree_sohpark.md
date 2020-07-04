# 10 트리

## 10-1 트리

### 관련 용어

- 노드: 하나하나의 데이터, 포인트 등으로 이해할 수 있다.
- 가지: 노드와 노드를 잇는 줄
- 루트: 가장 윗부분 노드. 
- 리프: 가장 아랫부분 노드. 더 이상 뻗어나갈 수 없는 마지막에 위치한 노드를 의미한다. 
- 안쪽 노드: 루트를 포함하여 리프를 제외한 노드. 
- 자식: 어떤 노드로부터 가지로 연결된 아래쪽 노드. 
- 부모: 어떤 노드에서 가지로 연결된 위쪽 노드. 노드는 1개의 부모를 가진다. 
- 형제: 같은 부모를 가지는 노드.
- 조상: 어떤 노드에서 가지로 연결된 위쪽 노드 모두.
- 자손: 어떤 노드에서 가지로 연결된 아래쪽 노드 모두.
- 레벨: 루트로부터 얼마나 떨어져 있는지. 루트의 레벨은 0, 루트로부터 가지가 하나씩 아래로 뻗어나갈 때마다 레벨이 1씩 증가.
- 차수: 노드가 갖는 자식의 수. 모든 노드의 차수가 n 이하인 트리를 n진 트리라고 한다. 
- 높이: 루트로부터 가장 멀리 떨어진 리프까지의 거리. 
- 서브 트리: 트리 안에서 다시 어떤 노드를 루트로 정하고 그 자손으로 이루어진 트리.
- 널 트리: 노드, 가지가 없는 트리.
- 순서 트리 & 무순서 트리: 형제의 노드의 순서를 따지면 순서 트리, 아니라면 무순서 트리. 



### 순서 트리 탐색

#### 너비 우선 탐색

낮은 레벨에서 시작해 왼쪽에서 오른쪽 방향으로 검색. 한 레벨에서의 검색이 끝나면 다음 레벨로 내려간다. 

#### 깊이 우선 탐색

리프까지 내려가면서 검색하는 것을 우선순위로 하는 탐색 방법. 리프에 도달해 더 이상 검색을 진행할 곳이 없는 경우네는 부모에게 돌아간다. 

깊이 우선 탐색에선 '언제 노드를 방문할지'를 다음 세 종류로 구분한다.

**전위 순회**

노드 방문 → 왼쪽 자식 → 오른쪽 자식

**중위 순회**

왼쪽 자식 → 노드 방문 → 오른쪽 자식

**후위 순회**

왼쪽 자식 → 오른쪽 자식 → (돌아와서)노드 방문

## 10-2 이진트리와 이진검색트리

### 이진트리

노드가 왼쪽 자식과 오른쪽 자식을 갖는 트리. 각 노드의 자식은 2명 이하만 유지해야 한다.

### 완전 이진트리

루트로부터 노드가 채워져 있으면서 같은 레벨에서는 왼쪽에서 오른쪽으로 노드가 채워져 있는 이진트리.

1. 마지막 레벨을 제외한 레벨은 노드를 가득 채운다.
2. 마지막 레벨은 왼쪽부터 오른쪽 방향으로 노드를 채우되, 반드시 끝까지 채울 필요는 없음.

### 이진검색트리

1. 어떤 노드 N을 기준으로 왼쪽 서브 트리 노드의 모든 키 값은 노드 N의 키 값보다 작아야 합니다.
2. 오른쪽 서브 트리 노드의 키 값은 노드 N의 키 값보다 커야 합니다.
3. 같은 키 값을 갖는 노드는 없습니다.

이진 검색 트리를 중위순회하면 오름차순으로 노드를 얻을 수 있다.

```java
class Node<K, V>{
	K key;
	V data;
	Node<K, V> left;
	Node<K, V> right;
}
```

```java
import java.util.Comparator;

public class BinTree<K, V> {
  // 노드
  static class Node<K, V> {
    private K key;
    private V data;
    private Node<K, V> left;
    private Node<K, V> right;
    
    // 생성자
    Node(K key, V data, Node<K,V> left, Node<K,V> right) {
      this.key = key;
      this.data = data;
      this.left = left;
      this.right = right;
    }
    
    // 키 값을 반환
    K getKey() {
      return key;
    }
    
    // 데이터를 반환
    V getValue() {
      return data;
    }
    
    // 데이터를 출력
    void print() {
      System.out.println(data);
    }
  }
  
  private Node<K,V> root; // 루트
  private Comparator<? super K> comparator = null; // 비교자
}
```

**여기서 잠깐!**

https://docs.oracle.com/javase/tutorial/java/generics/wildcards.html

위에 보면 <? super K>라는 것이 있는데, 여기서 물음표는 와일드카드라고 한다. 

https://stackoverflow.com/questions/1910892/what-is-the-difference-between-super-and-extends-in-java-generics

제네릭을 표현하는 <? super K> 를 보면 와일드카드 ?가 어떤 상속 관계를 갖는지가 나온다. 해석하자면, K의 부모(super에 해당하는) 클래스를 가져온다는 의미이다. 반대는 extends가 있다. 

It depends which way on the inheritance hierarchy it allows. Assume you have a class "Child" which inherits from "Parent" which inherits from "Grandparent".

`<T extends Parent>` accepts either Parent or Child while `<T super Parent>` accepts either Parent or Grandparent.



### 노드 추가하기

```java
private void addNode(Node<K,V> node, K key, V data) {
  int cond = comp(key, node.getKey());
  if (cond == 0)
    return;
  else if (cond < 0) {
    if (node.left == null)
      node.left = new Node<K,V>(key, data, null, null);
    else
      addNode(node.left, key, data);
  }
  else {
    if (node.right == null)
      node.right = new Node<K,V>(key, data, null, null);
    else
      addNode(node.right, key, data);
  }
}
```

- 재귀문인데, 원리는 루트를 계속 바꿔가면서 값을 대입하는 것이다. 들어갈 자리에 이미 노드가 있다면, 해당 노드를 루트로 하여 다시 비교해가다가, 빈 자리가 생기면 집어넣으면 된다. 



### 노드 삭제하기

삭제하려는 노드가 자식이 하나라면 해당 자식을 노드 위치로 끌어올리면 끝이다. 복잡한 경우는 자식 노드가 2개일 땐데, 원리는 대략 아래와 같다.

1. 삭제할 노드의 왼쪽 서브 트리에서 키 값이 가장 큰 노드를 검색한다. 
2. 검색한 노드를 삭제 위치로 옮긴다(검색한 노드의 데이터를 삭제 대상 노드의 위치로 복사한다.)
3. 옮긴 노드를 삭제한다. 
   - 옮긴 노드에 자식이 없으면 '자식 노드가 없는 노드의 삭제 순서'에 따라 노드륵 삭제한다.
   - 자식이 1개만 있다면 '자식 노드가 1개 있는 노드의 삭제 순서'에 따라 노드를 삭제한다. 

```java
public boolean remove(K key) {
  Node<K,V> p = root;
  Node<K,V> parent = null;
  boolean isLeftChild = true;
  
  while (true) {
    if (p == null)
      return false;
    int cond = comp
  }
}
```















