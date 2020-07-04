### [문제 링크 #100. Same Tree](https://leetcode.com/problems/same-tree/)
---
### 문제접근
- 두 트리가 동일한 트리인지 비교해 ```true``` 또는 ```false```를 리턴 하는 문제였습니다.
- 처음에는 전체 노드의 밸류를 배열에 담아 전체 배열 비교를 통해 리턴을 하려 했으나 생각처럼 되지 않아 솔루션을 참고해서 풀었습니다.

---
### 정답 코드
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

var isSameTree = function (p, q) {
  // 두 노드가 모두 null이면 두 트리의 현재 값이 동일하므로 true
  if (p === null && q === null) {
    return true;
  }
  
  // 한 개의 노드가 null일 때 다른 노드가 null이 아니면 두 노드의 값이 다르므로 false
  if ((p !== null && q === null) || (p === null && q !== null)) {
    return false;
  }
  
  // 두 노드의 값이 서로 다르면 false
  if (p.val != q.val) {
    return false;
  }
  
  // 이진트리를 탐색하므로 왼쪽, 오른쪽을 재귀적으로 순회해서 트리의 왼쪽 자식 노드들과 오른쪽 자식 노드들이 모두 같을 때만 true를 리턴
  return isSameTree(p.right, q.right) && isSameTree(p.left, q.left);
};
```
___
