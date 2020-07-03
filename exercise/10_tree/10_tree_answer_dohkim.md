### 길찾기 게임

처음에는 c++의 map이 이진탐색트리로 구현이 돼있다고 해서 활용하려고 시도했는데 내부구현이 그럴 뿐이고 map자체를 트리처럼 순회하거나 사용하기에는 어려움이 있었다.

그래서 결국은 간소한 트리를 직접구현해야했는데 insert를 정렬을 해놓은 상황에서는 간단히 구현할 수 있었다.

```c++
#include <string>
#include <vector>
#include <iostream>
#include <utility>
#include <map>
#include <algorithm>
using namespace std;

struct TreeNode{
	int index;
	pair<int, int> location;
	TreeNode *left;
	TreeNode *right;
	TreeNode() : index(-1), location(0,0), left(nullptr), right(nullptr) {} //location 초기화??
    TreeNode(int x) : index(x), location(0,0), left(nullptr), right(nullptr) {}
    TreeNode(int x, int y) : index(x), location(y,0), left(nullptr), right(nullptr) {}
    TreeNode(int x, int y, int z) : index(x), location(y,z), left(nullptr), right(nullptr) {}
    TreeNode(int x, int y, int z, TreeNode *left, TreeNode *right) : index(x), location(y,z), left(left), right(right) {}
};

void tree_insert(TreeNode *parent, TreeNode *child)
{
	if (child->location.first < parent->location.first)
	{
		if (parent->left == nullptr)
			parent->left = child;
		else
			tree_insert(parent->left, child);
	}
	else
	{
		if (parent->right == nullptr)
			parent->right = child;
		else
			tree_insert(parent->right, child);
	}
}

TreeNode *make_node(TreeNode **ptr, int x, int y, int z)
{
	if ((*ptr = (TreeNode *)malloc(sizeof(**ptr))) == 0)
		return nullptr;
	**ptr = TreeNode(x, y, z);
	return *ptr;
}

void preorder(TreeNode *node, vector<int> &answer)
{
	if (node != nullptr)
	{
		answer.push_back(node->index);
		preorder(node->left, answer);
		preorder(node->right, answer);
	}
}

void postorder(TreeNode *node, vector<int> &answer)
{
	if (node != nullptr)
	{
		postorder(node->left, answer);
		postorder(node->right, answer);
		answer.push_back(node->index);
	}
}
struct comparator{
	bool operator()(pair<int, int> a, pair<int, int> b) const
	{
		if (a.second != b.second)
			return a.second > b.second;
		else
			return a.first < b.first;
	}
};

vector<vector<int>> solution(vector<vector<int>> nodeinfo) {
    vector<vector<int>> answer;
	TreeNode *root;
	map<pair<int, int>, int, comparator> m;
	pair<int, int> temp;
	pair<pair<int, int>, int> m_temp;

	for (int i = 0; i < nodeinfo.size(); i++)
	{
		temp = make_pair(nodeinfo[i][0], nodeinfo[i][1]);
		m_temp = make_pair(temp, i + 1);
		m.insert(m_temp);
	}

	map<pair<int, int>, int, comparator>::iterator it;
	for (it = m.begin(); it != m.end(); it++)
	{
		TreeNode *node;

		if (it == m.begin())
			root = make_node(&node, (*it).second, (*it).first.first, (*it).first.second);
		else
			tree_insert(root, make_node(&node, (*it).second, (*it).first.first, (*it).first.second));
	}
	
	vector<int> temp_vector;
	preorder(root, temp_vector);
	answer.push_back(temp_vector);
	temp_vector.clear();

	postorder(root, temp_vector);
	answer.push_back(temp_vector);
    return answer;
}

int main()
{
	vector<vector<int>> nodeinfo = {{5,3},{11,5},{13,3},{3,5},{6,1},{1,3},{8,6},{7,2},{2,2}};
	solution(nodeinfo);
	return 0;
}
```
