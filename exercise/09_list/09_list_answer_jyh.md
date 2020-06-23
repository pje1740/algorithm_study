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
---
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
