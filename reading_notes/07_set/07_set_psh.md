# CH07 집합

## 07-1 집합

집합이란, 명확한 조건을 만족하는 자료의 모임을 의미한다. 

### 집합과 요소

집합(set)이란 객관적으로 범위를 규정한 어떤 것의 모임이며, 그 집합 안에서 각각의 어떤 것을 요소(element)라고 부른다.

집합 X의 요소가 1, 5라면 아래와 같이 표현할 수 있다. 

```
X = {1, 5}
X = {5, 1}
// 집합에는 순서가 없기 때문에 둘은 같은 집합이다.
```

#### 부분집합과 진부분집합

다른 집합에 포함된 집합은 부분집합이라고 부른다. 진부분집합은 집합 A가 집합 B의 부분집합이면서 두 집합이 같지 않을 때를 의미한다. 

#### 집합의 연산

- 합집합: 두 집합 중 적어도 한쪽에 속하는 요소의 집합
- 교집합: 양쪽 집합 모두에 속하는 요소의 집합
- 차집합: 한쪽의 집합에서 다른 쪽 집합에 속하는 요소를 제외한 요소의 집합

## 07-2 배열로 집합 만들기

### 배열로 집합 만들기

```java
class IntSet{
  int max;
  int num;
  int[] set;
  
  // 생성자
  public IntSet(int capacity){
    num = 0;
    max = capacity;
    try {
      set = new int[max];
    }
    catch (OutOfMemoryError e) {
      max = 0;
    }
  }
  
  // 집합의 최대 개수
  public int capacity() {
    return max;
  }
  
  // 집합의 요소 개수
  public int size() {
    return num;
  }
  
  // 집합에서 n을 검색합니다.
  public int indexOf(int n) {
    for (int i = 0; i < num; i++)
      if (set[i] == n)
        return i;
    return -1;
  }
  
  public booelan contains(int n){
    return (indexOf(n) != -1) ? true : false;
  }
  
  // 집합에 n이 있는지 확인
  public boolean add(int n) {
    if (num >= max || contains(n) == true)
      return false;
    else{
      set[num++] = n;
      return true;
    }
  }
  
  // 집합에서 n을 삭제
  public booelan remove(int n) {
    int idx;
    if (num <= 0 || (idx = indexOf(n) == -1))
      return false;
    else{
      set[idx] = set[--num];
      return true;
    }
  }
}
```

- max: 집합의 최대 크기
- num: 집합의 요소 개수
- set: 집합을 저장할 배열



책에서는 전체적으로 set 를 구현하는데 설명을 대부분 할애하고 있다. toString으로 어떻게 문자열로 전환할지에 대한 이야기가 나오는데, 자바에서도 이미 내장된 세트가 있기 때문에 상세한 것은 생략한다. 















