### 키로거

```c++
#include <bits/stdc++.h>
using namespace std;

int main()
{
	int N;

	cin >> N;
	vector<list<char>> l_vector(N, list<char>());
	string temp;
	for (int i = 0; i < N; i++)
	{
		cin >> temp;
		list<char>::iterator t = l_vector[i].begin();
		for (int j = 0; j < temp.size(); j++)
		{
			switch (temp[j])
			{
			case '<':
				if (t != l_vector[i].begin())
					t--;
				break;
			case '>':
				if (t != l_vector[i].end())
					t++;
				break;
			case '-':
				if (t != l_vector[i].begin())
				{
					t = l_vector[i].erase(--t);
				}
				break;
			default:
				t = t++;	//begin()으로 해놓으면 계속 begin으로 돼있다?
				l_vector[i].insert(t,temp[j]);
				break;
			}
		}
	}

	for (int i = 0; i < N; i++)
	{
		for (auto t : l_vector[i])
			cout << t;
		cout << "\n";
	}
	return 0;
}
```

### remove_zerosum

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
	ListNode* removeZeroSumSublists(ListNode* head) {
		if (head == NULL)
			return head;
		unordered_map<int, ListNode*> um;
		int presum = 0;
		ListNode* dummy = new ListNode(0);
		dummy->next = head;
		um[0] = dummy;
		while (head != NULL)
		{
			presum+=head->val;
			if (um.find(presum) != um.end())
			{
				ListNode *prev = um[presum];
				int sum = presum;
				while(prev != NULL && prev != head)
				{
					prev = prev->next;
					sum += prev->val;
					if (prev!=head)
						um.erase(sum);
				}
				um[presum]->next = head->next;
			}
			else
			{
				um[presum] = head;
			}
			head = head->next;
		}
		return dummy->next;
	}
}
```

### Remove Duplicates from Sorted List

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:

	void deleteNode(ListNode *erase, ListNode *pre_node){
		pre_node->next = erase->next;
		delete erase;
	}

    ListNode* deleteDuplicates(ListNode *head) {
        ListNode *temp = head;
        ListNode *pre_node = head;

		while (temp != nullptr)
		{
			if (temp->next != nullptr && temp->val == temp->next->val)
			{
				if (temp == head)
				{
					head = temp->next;
					delete temp;
					temp = head;
					pre_node = head;
				}
				else
				{
					deleteNode(temp, pre_node);
					temp = pre_node->next;
				}
			}
			else
			{
				pre_node = temp;
				temp = temp->next;
			}
		}
		return head;
    }
};
```

### Remove Duplicates from Sorted List II

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:

	void deleteNode(ListNode *erase, ListNode *pre_node){
		pre_node->next = erase->next;
		delete erase;
	}

    ListNode* deleteDuplicates(ListNode *head) {
        ListNode *temp = head;
        ListNode *pre_node = head;

		while (temp != nullptr)
		{

			if (temp->next != nullptr && temp->val == temp->next->val)
			{
				while (temp->next != nullptr && temp->val == temp->next->val)
				{
					deleteNode(temp->next, temp);
				}
				if (temp == head)
				{
					head = temp->next;
					delete temp;
					temp = head;
				}
				else
				{
					deleteNode(temp, pre_node);
					temp = pre_node->next;
				}
			}
			else
			{
				pre_node = temp;
				temp = temp->next;
			}
		}
		return head;
    }
};
```
