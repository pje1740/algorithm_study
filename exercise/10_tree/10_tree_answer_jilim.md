## 🤔 Kth Smallest Element in a BST

- 재귀로 풀어야할 것 같아서 재귀로 풀었는데, 왜 맞는지 모르겠다...

```javascript

var kthSmallest = function(root, k) {
    let min = root.val;
    const DFS = (root) => {
        if (root == null)
            return 0;
        DFS(root.left);
        if (k > 0) {
            min = root.val;
            console.log(min);
            k--;
        }
        DFS(root.right);
    }
    DFS(root);
    return (min);
};

```
