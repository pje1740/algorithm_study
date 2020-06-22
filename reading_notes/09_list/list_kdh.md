### 연결리스트



### 포인터로 연결 리스트 만들기

템플릿을 사용해서 여러자료형에 쓸 수 있는 연결리스트 클래스 구현

```c++
#include <iostream>
using namespace std;

template <typename T>
struct Node
{
public:
	T value;
	struct Node<T> *next = nullptr; //nullptr?
};

template <typename T>
class single_list
{
private:
		Node<T> *head;
		Node<T> *tail;
		int size = 0;
public:
		single_list() : head(nullptr), tail(nullptr) {} // 생성자 리스트
		~single_list() {} // 소멸자

		void AddNode(T _value)
		{
			Node<T> *temp = new Node<T>(); //괄호 하는거 안하는거 같나?
			temp->next = nullptr;
			temp->value = _value;
			size++;

			if (head == nullptr)
			{
				head = temp;
				tail = temp;
			}
			else
			{
				tail->next = temp;
				tail = temp; // 
			}
			
		}

		void RemoveNode(T _value)
		{
			Node<T> *temp = head;
			Node<T> *pre_node = head;

			while(temp != nullptr)
			{
				if (temp->value == _value)
				{
					break ;
				}
				pre_node = temp;
				temp = temp->next;
			}
			if (temp == nullptr)
			{
				return ;
			}
			pre_node->next = temp->next;
			size--;
			delete temp;
		}

		void Show()
		{
			Node<T> *temp = head;

			while (head != nullptr)
			{
				cout << head->value << "->";
				head = head->next;
			}
			cout << "\n";
		}

		void DeleteList()
		{
			Node<T> *temp = head;
			while (head != nullptr)
			{
				temp = head->next;
				delete head;
				head = temp;
			}
			tail = nullptr;
		}

		void RemoveTail()
		{
			Node<T> *temp = head;

			if (temp == nullptr)
				return;
			while (temp->next != tail) //tail로 비교 가능??
			{
				temp = temp->next;
			}
			temp->next = nullptr;
			tail = temp;
			size--;
			delete tail;
		}

		void RemoveHead()
		{
			Node<T> *temp = head;
			if (temp == nullptr)
				return ;
			head = head->next;
			size--;
			delete head;
		}

		void AddHead(T _value)
		{
			Node<T> *new_node = new Node<T>();
			
			size++;
			new_node->value = _value;
			new_node->next = head;
			head = new_node;
		}

		void AddPosition(int _index, T _value)
		{
			int idx = 0;
			Node<T> *temp = head;

			if (size < 0 || _index > size - 1)
			{
				cout << "Wrong index\n";
				return ;
			}

			while (idx < size && temp->next != nullptr)
			{
				idx++;
				temp = temp->next;
			}
		}
};
```



### 커서로 연결 리스트 만들기

커서 연결리스트란 데이터 수의 최대값을 미리 알 수 있을 때 정해진 크기의 배열을 이용해서 비효율적인 노드 객체의 메모리 할당 및 해제를 하지 않도록 구현하는 리스트다.

```c++
#include <bits/stdc++.h>
using namespace std;

template <typename T>
class CursorList{
private:
	int head;
	T *values;
	int *addresses;
	int size = 0;

public:
	CursorList(int size);
	void initializeList(int size);
	int getEmptyLocation();
	void addNode(T newValue);
	void deleteNode(T deleteValue);
	void printList();
};
```



### 원형 이중 연결 리스트

![img](https://k.kakaocdn.net/dn/2iL9Q/btqxWd0Np8K/5qmopeLcJHUxvvQ0VRyKW0/img.gif)

보통 리스트와 달리 노드를 제일 뒤에 추가할 때 head의 pre_node를 사용해서 바로 추가시킬 수 있다.

```c++
#include <bits/stdc++.h>
using namespace std;

class Node{
	friend class double_linked;
private:
	int value;
	Node* next_node;
	Node* pre_node;

public:
	Node(int v, Node* n, Node* p){
		value = v;
		next_node = n;
		pre_node = p;
	}
};

class double_linked {

private:
	Node* head;
	int size;

public:
	double_linked(){
		size = 0;
		head = NULL;
	}

	void push_back(int value){
		Node *new_node = new Node(value, NULL, NULL);
		if (head == NULL)
		{
			head = new_node;
			new_node->pre_node = new_node;
			new_node->next_node = new_node;
		}
		else{
			new_node->next_node = head;
			new_node->pre_node = head->pre_node;
			head->pre_node->next_node = new_node;
			head->pre_node = new_node;
		}
		size++;
	}

	void search(int value)
	{
		Node* node = head;
		for (int i = 0; i < size; i++)
		{
			if (node->value == value)
				cout << "value found\n";
			node = node->next_node;
		}
	}
};
```



