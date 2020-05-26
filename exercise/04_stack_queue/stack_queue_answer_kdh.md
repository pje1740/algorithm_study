## 스택

#### 탑

```c++
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> heights) {
    vector<int> answer;
	int send;
	int pushed;

	while (!heights.empty())
	{
		pushed = 0;
		send = *(heights.end() - 1);
		heights.pop_back();
		for (int i = heights.size() - 1; i >= 0; i--)
		{
			if (heights[i] > send)
			{
				answer.push_back(i + 1);
				pushed = 1;
				break ;
			}
		}
		if (pushed == 0)
			answer.push_back(0);
	}
	reverse(answer.begin(), answer.end());
    return answer;
}
```

#### 후위표기식

주석 부분은 처음 시도한 코드인데 내가 생각한 예시들과 인터넷에서 검색해서 보이는 예시들은 다되는데 제출하면 오답이라고 뜨는데 스위치문으로 바꾼 것과 차이점을 모르겠다. 아마도 switch문은 샐 분기가 없는데 if문으로 구성해서 뭔가 차이가 있지않을까 

```c++
#include <iostream>
#include <stack>
#include <cctype>
using namespace std;

// int prior(char c)
// {
// 	if (c == '+' || c == '-')
// 		return 0;
// 	if (c == '*' || c == '/')
// 		return 1;
// 	return (-1);
// }

int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0);
	string input;
	int i = 0;
	stack<char> s;

	cin >> input;
	while (input[i] != 0)
	{
		switch (input[i])
		{
		case '(':
			s.push(input[i]);
			break;
		case ')':
			while (s.top() != '(')
			{
				cout << s.top();
				s.pop();
			}
			s.pop(); // pop '('
			break;
		case '+':
		case '-':
			while (!s.empty() && (s.top() == '*' || s.top() == '/' || s.top() == '+' || s.top() == '-'))
			{
				cout << s.top();
				s.pop();
			}
			s.push(input[i]);
			break;
		case '*':
		case '/':
			while (!s.empty() && (s.top() == '*' || s.top() == '/'))
			{
				cout << s.top();
				s.pop();
			}
			s.push(input[i]);
			break;
		default:
			cout << input[i];
		}
		i++;
	}

	// for (unsigned int i = 0; i < input.size(); i++)
	// {
	// 	if (isupper(input[i]))
	// 		cout << input[i];
	// 	else
	// 	{
	// 		if (input[i] == '(' || s.empty())
	// 			s.push(input[i]);
	// 		else
	// 		{
	// 			if (s.top() == '(')
	// 				s.push(input[i]);
	// 			else if (input[i] == ')')
	// 			{
	// 				while (s.top() != '(')
	// 				{
	// 					cout << s.top();
	// 					s.pop();
	// 				}
	// 				s.pop(); // pop '('
	// 			}
	// 			else
	// 			{
	// 				while(!s.empty() && (prior(s.top()) >= prior(input[i])))
	// 				{
	// 					cout << s.top();
	// 					s.pop();
	// 				}
	// 				s.push(input[i]);
	// 			}
	// 		}
	// 	}
	// }
	while (!s.empty())
	{
		cout << s.top();
		s.pop();
	}
	cout << "\n";
	return 0;
}
```

---------------------------------------------------------

## 큐

#### 기능 개발

```c++
#include <string>
#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> progresses, vector<int> speeds) {
    vector<int> answer;
	int cnt = 0;

	reverse(progresses.begin(), progresses.end());
	reverse(speeds.begin(), speeds.end());
	while (progresses.size() != 0)
	{
		for (int i = 0; i < progresses.size(); i++)
		{
			progresses[i] += speeds[i];
		}
		if (*(progresses.end() - 1) >= 100)
		{
			while (progresses.size() != 0 && *(progresses.end() - 1) >= 100)
			{
				progresses.pop_back();
				cnt++;
			}
			answer.push_back(cnt);
			cnt = 0;
		}
	}
    return answer;
}
```
#### 프린터

우선순위 큐에 넣을때 구조체를 사용하고 비교하는 함수를 수정해서 사용했는데 큰 의미는 없었다.  
결국은 다른 방법을 사용해서 구조체없이도 풀수 있었다. 직접 생각한 방법은 아니라 다른 방법으로 풀어봐야겠다.

```c++
#include <string>
#include <vector>
#include <iostream>
#include <queue>

using namespace std;
typedef struct s_element{
	int priority;
	int location;
}				t_element;

struct compare
{
	bool operator()(t_element &a, t_element &b)
	{
		// if (a.priority != b.priority)
			return a.priority < b.priority;
	}
};

int solution(vector<int> priorities, int location) {
    int answer = 0;
    int cnt = 0;
	priority_queue<t_element, vector<t_element>, compare> pq;
	t_element temp;

	
	for (unsigned int i = 0; i < priorities.size(); i++)
	{
		temp.priority = priorities[i];
		temp.location = i;
		pq.push(temp);
	}
	while(!pq.empty())
	{
		// cnt++;
		// temp = pq.top();
		// pq.pop();
		// std::cout << temp.priority << " " << temp.location << "\n";
		// if (temp.location == location)
		// 	answer = cnt;
		
		for (unsigned int i = 0; i < priorities.size(); i++)
		{
			if (priorities[i] == pq.top().priority)
			{
				answer++;
				if (i == location)
					return answer;
				pq.pop();
			}
		}
	}
    return answer;
}
```
