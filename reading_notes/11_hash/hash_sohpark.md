# 11 해시

## 11-1 해시법

해시법은 검색과 더불어 데이터의 추가와 삭제도 효율적으로 수행할 수 있는 방법이다. 

보통 기본 배열에서는, 중간에 데이터를 삽입하려하면 그 뒤의 데이터를 모두 뒤로 밀고 틈을 만들어서 넣어야 하기 때문에 O(n)의 복잡도를 갖게 된다. 이런 비효율적인 작업을 해시법을 통해 효율적으로 수행할 수 있다고 한다. 

### 해시 테이블

검색하고자 하는 키값을 입력받아서 해시 함수를 돌려서 반환 받은 해시코드를 배열의 인덱스로 환산을 해서 데이터에 접근하는 자료구조. key는 숫자, 문자, 심지어 파일일 수도 있다고 한다. 

(key) -> HashCode -> Index -> Value

해시 함수는 입력 받은 키 값이 얼마나 큰지에 상관 없이 일정한 해시코드를 만들어 준다고 한다. 블록체인도 거래 내역 등을 해시코드로 변경하여 비교한다고 한다. 입력 데이터가 완벽하게 일치해야만 완벽하게 동일한 해시코드를 만들어낸다. 



### 해시법

해시법은 데이터를 저장할 위치를 간단한 연산으로 구하는 것으로, 검색, 추가, 삭제를 효율적으로 수행할 수 있다. 예를 들어, 정수의 배열이 있다고 할 때, 해당 배열의 값을 배열의 길이로 나누어 그 나머지를 반환하는 해시 함수가 있다고 가정하자. 이렇게 해서 키 값마다 나오는 나머지가 해시 코드이고, 이것이 해시 테이블의 인덱스로 쓰이게 된다. 이렇게 해시 테이블에 담아두는 곳, 즉 해시 테이블의 요소를 버킷이라고 부른다. 

### 충돌

해시 함수가 어떻게 쓰이냐에 따라 해시 코드가 충돌이 일어날 수 있다. 충돌이 나는 경우, 대처 방법은 두 가지가 있다. 

1. 체인법: 같은 해시 값을 갖는 요소를 연결 리스트로 관리한다. 
2. 오픈 주소법: 빈 버킷을 찾을 때까지 해시를 반복한다.

충돌이 발생하지 않으면 검색, 추가, 삭제가 O(1)의 시간 복잡도로 해결될 수 있기 때문에 중요하다. 그러나 해시 테이블을 크게 하면 충돌 발생을 억제할 수는 있지만, 다른 한편으로는 메모리를 쓸데없이 많이 차지하게 되기 때문에 시간과 공간의 절충(trade-off)의 문제가 늘 존재한다.

충돌을 피하기 위해 해시 함수는 테이블 크기 이하의 정수를 되도록 한쪽으로 치우치지 않고 고르게 만들어내야 한다. 그래서 해시 테이블의 크기는 소수가 좋다고 알려져있다. 

키 값이 정수가 아니라 실수라면 실수 키 값에 비트 연산, 문자열이라면 각 문자 코드에 곱셈과 덧셈을 하는 방법 등이 있다고 한다. 



### 체인법

체인법은 같은 해시 값을 갖는 데이터를 연결 리스트에 의해 사슬 모양으로 연결하는 것을 의미한다. 

```java
public class ChainHash<K,V> {
	  
  // 해시를 구성하는 노드
  Node(K, key, V data, Node<K,V> next) {
    private K key;
    private V data;
    private Node<K,V> next;
  
    // 생성자
    Node(K key, V data, Node<K,V> next) {
      this.key = key;
      this.data = data;
      this.next = next;
    }
  
    // 키 값을 반환합니다.
    K getKey() {
      return key;
    }

    // 데이터를 반환합니다.
    V getValue() {
      return data;
    }

    // 키의 해시 값을 반환합니다.
    public int hashCode() {
      return key.hashCode();
    }

    // 키 값 key를 갖는 요소의 검색
    public V search(K key) {
      int hash = hashValue(key);
      Node<K, V> p = table[hash];

      while (p != null) {
        if (p.getKey().equals(key))
          return p.getValue();
        p = p.next;
      }
      return null;
    }
  }
  
  // chainHash 의 필드  
  private int size;
  private Node<K,V>[] table;
  
  // 생성자
  public ChainHash(int capacity) {
    try {
      table = new Node[capacity];
      this.size = capacity;
    } catch (OutOfMemoryError e) {
      this.size = 0;
    }
  }
  
  // 해시 값을 구하기
  public int hashValue(Object key) 
    return key.hashCode() % size;

  
  // 키 값 key, 데이터 data를 갖는 요소의 추가
  public int add(K key, V data) {
    int hash = hashValue(key);
    Node<K,V> p = table[hash];
    
    while (p != null) {
      if (p.getKey().equals(key))
        return 1;
      p = p.next;
    }
    Node<K,V> temp = new Node<K,V>(key, data, table[hash]);
    table[hash] = temp;
    return 0;
 	}
  
  // 키 값 key를 갖는 요소의 삭제
  public int remove(K key) {
    int hash = hashValue(key);
    Node<K,V> p = table[hash];
    Node<K,V> pp = null;
    
    while (p != null) {
      if (p.getKey().equals(key)) {
        if (pp == null)
          table[hash] = p.next;
        else
          pp.next = p.next;
        return 0;
      }
      pp = p;
      p = p.next;
    }
    return 1;
  }
}
```





















