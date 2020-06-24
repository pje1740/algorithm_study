## Linked - List Answer

## Leetcode #83. Remove Duplicates from Sorted List

### 문제접근

- 리스트의 중복된 값을 제거 후 다시 리턴하는 문제입니다.
- 링크드 리스트의 개념을 알고 있다면 굉장히 쉽게 해결할 수 있는 문제입니다.
- 들어오는 인자와 링크드 리스트의 형태를 먼저 확인해보면 아래와 같이 단일 링크드리스트가 정의되어 있습니다.

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
```

- 따라서 저는 매개변수로 들어오는 링크드 리스트의 헤드를 ```current```변수에 저장 후 ```current```변수가 ```undefined```일 때까지 계속 ```current```에 ```current.next```를 담아주면서 중복된 값이 있을 경우 ```next```의 값을 그 다음 ```next.next```로 연결시켜 마지막에 ```head```가 return될 때 중복된 값을 건너뛰도록 했습니다.

```javascript
var deleteDuplicates = function (head) {
  let current = head;

  while (current !== null && current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};
```

### 정답 코드

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function (head) {
  let current = head;

  while (current !== null && current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};

```

## Leetcode #82. Remove Duplicates from Sorted List II

### 문제접근

- 단일 연결 리스트의 중복된 값을 제거한 후 리턴해야 하는 문제입니다.
- 먼저 리턴할 새로운 연결 리스트, 이전값을 저장해 현재값과 비교할 연결 리스트를 선언해줍니다.

```javascript
 let newList = new ListNode(0);
 newList.next = head;
 let previous = newList;
```

- 위와 같이 선언하게 되면 현재 previous에는 다음과 같이 값이 담기게 됩니다.

```javascript
previous(0){
  val = 0;
  next = head; // input으로 들어오는 연결리스트의 시작 부분
}

previous(1){
  val = head.val;
  next = head.next;
}
.
.
.
```

- 이제 previous를 끝까지 순회하며(입력으로 들어오는 연결리스트가 ```null```을 만날 때까지) current와 previous의 값을 비교하며 중복을 체크하고 중복된 값을 건너뛰며 previous에 연결시켜 줍니다.

```javascript
  while (previous.next) {
    let current = previous.next;

    while (current.next && current.val === current.next.val) {
      current = current.next;
    }

    if (current !== previous.next) {
      previous.next = current.next;
    } else {
      previous = previous.next;
    }
  }
```

- previous에 값이 모두 담기게 되면 마지막으로 previous의 시작 부분인 newList.next를 리턴하면 됩니다.

```javascript
  return newList.next;
```

### 정답 코드

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }

  let newList = new ListNode(0);
  newList.next = head;
  let previous = newList;

  while (previous.next) {
    let current = previous.next;

    while (current.next && current.val === current.next.val) {
      current = current.next;
    }

    if (current !== previous.next) {
      previous.next = current.next;
    } else {
      previous = previous.next;
    }
  }
  return newList.next;
};
```

## Leetcode #1171. Remove Zero Sum Consecutive Nodes from Linked List

### 문제접근

- 인접한 노드들의 합이 0인경우 해당 노드를 제거해야되는 문제입니다.
- 먼저 리턴 할 ```newList```와 전체를 탐색할 ```current```를 선언했습니다.

```javascript
 let newList = new ListNode(0);
 newList.next = head;
 let current = newList;
```

- 그 다음 전체 노드를 순회하며 ```sum```에 head의 value를 계속 더해주다가 ```sum```이 0이 되면 현재 순회하고 있는 current의 next를 head의 next로 바꿔주면서 0이 되는 값을 건너뛰어 줍니다.

```javascript
 while (current !== null) {
    let sum = 0;
    while (head !== null) {
      sum += head.val;
      if (sum === 0) {
        current.next = head.next;
      }
      head = head.next;
    }
    current = current.next;
    if (current !== null) {
      head = current.next;
    }
  }

  return newList.next;
```

### 정답 코드

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var removeZeroSumSublists = function (head) {
  let newList = new ListNode(0);
  newList.next = head;
  let current = newList;
  while (current !== null) {
    let sum = 0;
    while (head !== null) {
      sum += head.val;
      if (sum === 0) {
        current.next = head.next;
      }
      head = head.next;
    }
    current = current.next;
    if (current !== null) {
      head = current.next;
    }
  }

  return newList.next;
};
```

___
