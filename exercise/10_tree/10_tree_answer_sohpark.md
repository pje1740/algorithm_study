# BST: search

```java
public class Solution {
    boolean answer_found = false;
    TreeNode answer;

    public TreeNode searchBST(TreeNode root, int val) {
        if (answer_found || root == null)
            return answer;
        if (root.val == val){
            answer = root;
            return answer;
        }
        else if (val > root.val) {
            searchBST(root.right, val);
        }
        else if (val < root.val) {
            searchBST(root.left, val);
        }
        return answer;
    }
}
```

```java
public class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null)
            return null;
        if (val > root.val) {
            return searchBST(root.right, val);
        }
        else if (val < root.val) {
            return searchBST(root.left, val);
        }
        return root;
    }
}
```

- 여기서 자꾸 실수한 게, 재귀를 돌 때 return 을 해줘야 하는데, 자꾸 호출만 해서 매번 호출할 때마다 끝까지 도는 문제가 발생했다. return 을 넣어야만 그쪽 분기를 탄 결과를 배출한다. 안 그러면 잘 찾아놓고는 가장 상단 node를 반환하는 꼴이 된다. 



# BFS: 가장 먼 노드

참고한 풀이

https://iamheesoo.github.io/blog/algo-prog49189

https://lkhlkh23.tistory.com/110

```java
import java.util.*;
public class Solution {
    public int solution(int n, int[][] edge) {
        if (edge.length == 0)
            return 0;

        ArrayList<ArrayList<Integer>> nodes = new ArrayList<ArrayList<Integer>>();

        for (int i = 0; i <= n; i++) {
            nodes.add(new ArrayList<Integer>());
        }
        for (int[] e : edge) {
            // 양방향으로 연결해준다.
            nodes.get(e[0]).add(e[1]);
            nodes.get(e[1]).add(e[0]);
        }

        Queue<Integer> toVisit = new LinkedList<>();
        boolean[] visited = new boolean[n + 1];
        visited[0] = visited[1] = true;
        int[] distance = new int[n + 1];
        int max = 0;
        int count = 0;
        toVisit.add(1);

        while (!toVisit.isEmpty()) {
            int num = toVisit.poll();
            ArrayList<Integer> nodeArr = nodes.get(num);
            for (int val : nodeArr) {
                if (visited[val] == false) {
                    distance[val] = distance[num] + 1;
                    if (distance[val] > max) {
                        max = distance[val];
                        count = 1;
                    }
                    else if (distance[val] == max)
                        count++;
                    visited[val] = true;
                    // visited에 체크한 것과 해당 숫자의 arraylist를 체크하는 건 별개로 생각해야 함.
                    // arraylist를 체크하는 건, 이 숫자에 대한 게 아니라 그 숫자에 연결된 노드들이기 때문.
                    toVisit.add(val);
                }
            }
        }

        return  count;
    }
}

```

- 이건 바이너리 트리가 아니라서 굳이 트리 자료구조를 생성하지 않고, 배열이나 리스트, 큐를 이용하여 구현하신 분이 많았다. 
- 재귀 함수를 도는 대신 큐에 노드를 넣어서 찾아가고, 찾은 적이 있는 노드는 불리언 배열에 체크를 해서 재방문 시 스킵하는 형태로 진행한다.
- 문제를 보면 노드가 꼭 상단 노드가 왼쪽에 적힌 게 아니다보니, 처음에 어레이리스트를 만들 때 양방향으로 연결지어 주는 것이 중요하다. 어차피 1부터 시작할 거기 때문에, 윗단부터 보게 되니까 양방향으로 연결하더라도 1과 더 가까운 것이 먼저 체크되고, 그럼 반대로 접근할 경우에는 이미 visited에서 방문한 것으로 체크되어있기 때문에 무시할 수 있다. 
- 결국 방법은, 트리가 아니라 리스트의 리스트로 구현한 것이다. 각각의 노드의 값이 리스트의 리스트의 인덱스로 관리가 되고, 해당 리스트에 그 노드와 연결된 노드들의 값을 append하는 형식으로 관리한다. 



# BST: same tree

```java
package BST_sametree_yujo;

import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    public boolean getSubtree(TreeNode p, TreeNode q) {
        boolean result = false;
        boolean left = false;
        boolean right = false;

        if (p == null && q == null)
            return true;
        else if (p == null || q == null)
            return false;
        else if (p == null || q == null)
            return false;
        else if (p.val != q.val)
            return false;

        left = getSubtree(p.left, q.left);
        right = getSubtree(p.right, q.right);
        return left & right;
    }

    public boolean isSameTree(TreeNode p, TreeNode q) {
        return getSubtree(p, q);
    }
}
```

- 자꾸 한번의 재귀 안에서 루트만 보면 되는데 left, right를 다 보고 하려고 해서;; 꼬이고 꼬였다. 



# BST: Kth element

```java
import java.util.Stack;

class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<TreeNode>();

        while (true) {
            while (root != null) {
                stack.add(root);
                root = root.left;
            }
            root = stack.pop();
            if(--k == 0)
                return root.val;
            root = root.right;
        }
    }
}
```

- 재귀 대신 반복문으로도 충분히 구현할 수 있음
- 원리는, 우선 왼쪽편이 있든 없든 왼쪽을 순차적으로 넣어둔다. 스택으로 구현하면, 맨 마지막 레벨이 제일 먼저 나올 텐데, 그 값을 체크하고 k번째가 아니면 그것의 오른쪽 자식을 본다. 근데 오른쪽 자식이 없는 경우, 어차피 pop 구문에서 root가 그 이전 레벨의 왼편 노드로 바뀌기 때문에 이런 식으로 아래서부터 순차적으로 올라올 수 있다. 



# BST : Populating Next Right Pointers in Each Node

```java
package Tree_Perfectpopulate_dohkim;

public class Solution {
    public Node connect(Node root) {
        Node original_root = root;
        Node cur = root;
        if (root == null || root.left == null)
            return root;
        cur.next = null;

        while (cur != null) {
            while (root != null) {
                if (root.next == null) {
                    root.left.next = root.right;
                    root.right.next = null;
                    break;
                }
                root.left.next = root.right;
                root.right.next = root.next.left;
                root = root.next;
            }
            root = cur;
            cur = cur.left;
        }
        return original_root;
    }
}
```



