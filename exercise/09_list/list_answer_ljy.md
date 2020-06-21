# ⛳️ Remove Duplicates from Sorted List II

#### Note

- 예에전 피신 때 봤지만 풀지 못했던 문제와 비슷한 느낌을 받았다.
- node 자체는 이전 노드를 볼 수 없으니 node.next와 node.next.next 를 가지고 푸는 문제.

#### 풀이

```javascript
var deleteDuplicates = function(head) {
    let node = new ListNode(null, head);
    let nodeHead = node;
    while (node.next && node.next.next) {
        if (node.next.val === node.next.next.val) {
            let duplicate = node.next.val;
            while (node.next && node.next.val === duplicate) {
                node.next = node.next.next;
            }
        }
        else {
            node = node.next;
        }
    }
    return nodeHead.next;
};
```

