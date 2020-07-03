# 🚃 10 트리

> 데이터 사이의 계층 관계를 나타내는 자료구조



## 10.1 트리

#### 구성요소

- 노드 (Node)
- 가지 (Edge)



#### 용어 정리

- 루트 : 트리의 가장 윗부분에 위치하는 노드
- 리프 : 트리의 가장 아랫부분에 위치하는 노드
- 안쪽 노드 : 루트를 포함하여 리프를 제외한 노드
- 자식 : 어떤 노드로부터 가지로 연결된 아래쪽 노드. 노드는 자식을 여러개 가질 수 있다.
- 부모 : 어떤 노드에서 가지로 연결된 위쪽 노드
- 형제 : 같은 부모를 가지는 노드
- 조상 : 어떤 노드에서 가지로 연결된 위쪽 노드
- 자손 : 어떤 노드에서 가지로 연결된 아래쪽 노드
- 레벨 : 루트로부터 얼마나 떨어져 있는지에 대한 값
- 차수 : 노드가 갖는 자식의 수
- 높이 : 루트로부터 가장 멀리 떨어진 리프까지의 거리
- 서브 트리 : 트리 안에서 다시 어떤 노드를 루트로 정하고 그 자손으로 이루어진 트리
- 널 트리 : 노드, 가지가 없는 트리
- 순서 트리, 무순서 트리 : 형제 노드의 순서를 따지면 순서 트리, 따지지 않으면 무순서 트리.



### 너비 우선 탐색 (BFS)

> 낮은 레벨에서 시작해 왼쪽에서 오른쪽 방향으로 검색하고 한 레벨에서의 검색이 끝나면 다음 레벨로 내려간다.

- 대표적인 BFS : [케빈 베이컨의 6단계](https://oracleofbacon.org/)



### 깊이 우선 탐색 (DFS)

> 리프까지 내려가면서 검색하는 것

#### 언제 노드를 방문할지

- 전위 순회 : 노드 방문 -> 왼쪽 자식 -> 오른쪽 자식
- 중위 순회 : 왼쪽 자식 -> 노드 방문 -> 오른쪽 자식
- 후위 순회 : 왼쪽 자식 -> 오른쪽 자식 -> 노드 방문



## 10.2 이진 트리

- 노드가 왼쪽 자식과 오른쪽 자식을 갖는 트리
- 각 노드의 자식은 2명 이하만 유지



### 완전이진트리

- 루트부터 노드가 채워져 있으면서 같은 레벨에서는 왼쪽에서 오른쪽으로 노드가 채워져있는 이진트리
- 높이가 k인 완전이진트리가 가질 수 있는 노드의 최댓값은 2^(k+1) - 1
- n개의 노드를 저장할 수 있는 완전이진트리의 높이는 log n

![](https://miro.medium.com/max/502/1*Etc4C2_vkbIgBUApJKMJag.png)

A는 완전이진트리, B는 이진트리



### 이진검색트리 (Binary search tree)

- 어떤 노드 N을 기준으로 왼쪽 서브 트리 노드의 모든 키 값은 노드 N의 키 값보다 작아야 한다.
- 오른쪽 서브 트리 노드의 키 값은 노드 N의 키 값보다 커야 한다.
- 같은 키 값을 갖는 노드는 없다.

![](https://i.imgur.com/po0R4GB.png)



#### 이진 검색 트리의 좋은 점

- 중위 순회를 하면 오름차순으로 노드를 얻을 수 있다. (위의 경우 5-7-10-15-16-18-19-20)





#### JavaScript로 이진검색트리 구현하기

```javascript
class Node {
	constructor(data, left, right) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
	show() {
		return this.data;
	}
}
class BST {
	constructor() {
		this.root = null;
	}
	getRoot() {
		return this.root;
	}
	insert(data) {
		let n = new Node(data, null, null);
		if (this.root == null) {
			this.root = n;
		}
		else {
			let current = this.root;
			let parent;
			while (true) {
				parent = current;
				if (data < current.data) {
					current = current.left;
					if (current == null) {
						parent.left = n;
						break ;
					}
				}
				else {
					current = current.right;
					if (current == null) {
						parent.right = n;
						break ;
					}
				}
			}
		}
	}
	inOrder(node) {
		if (!(node == null)) {
			this.inOrder(node.left);
			console.log(node.show());
			this.inOrder(node.right);
		}
	}
	find(data) {
		let current = this.root;
		while (current.data != data) {
			if (data < current.data) {
				current = current.left;
			}
			else {
				current = current.right;
			}
			if (current == null) {
				return null;
			}
		}
		return current;
	}
	remove(data) {
		this.root = this.removeNode(this.root, data);
	}
	removeNode(node, data) {
		if (node == null) {
			return null;
		}
		if (data == node.data) {
			if (node.left == null && node.right == null) {
				return null;
			}
			if (node.left == null) {
				return node.right;
			}
			if (node.right == null) {
				return node.left;
			}
			let tempNode = this.getSmallest(node.right);
			node.data = tempNode.data;
			node.right = this.removeNode(node.right, tempNode.data);
			return node;
		}
		else if (data < node.data) {
			node.left = this.removeNode(node.left, data);
			return node;
		}
		else {
			node.right = this.removeNode(node.right, data);
			return node;
		}
	}
	getSmallest(node) {
		let current = node;
		while (!(current.left == null)) {
			current = current.left;
		}
		return current;
	}
}

const nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(15);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(21);
nums.insert(40);
nums.inOrder(nums.getRoot());
console.log(nums.find(45));
console.log(nums.find(3));
nums.remove(45);
nums.inOrder(nums.getRoot());

```



#### 참고 자료

[ES6 이진 탐색 트리 구현하기, 어떻게 특정 값을 빠르게 찾을 수 ...](https://jeong-pro.tistory.com/131)

[너비우선탐색과 그 활용법 (개념 이해하기) | 너비우선탐색 | 칸아카데미](https://ko.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/breadth-first-search-and-its-uses)