## 

#### Z

처음에는 끝까지 탐색을 하도록 하니깐 시간초과가 나서 맞는 범위를 찾아가도록 코드를 수정해주니 통과했다.

```c++
#include <bits/stdc++.h>
using namespace std;
int r,c;


void draw_z(int N, int row, int col, int &cnt, int &answer)
{
	int current_row;
	int current_col;
	int bound;

	if (N == 1)
	{
		for (int i = 0; i < 4; i++)
		{
			switch (i)
			{
			case 0:
				current_row = row;
				current_col = col;
				break;
			case 1:
				current_row = row;
				current_col = col + 1;
				break;
			case 2:
				current_row = row + 1;
				current_col = col;
				break;
			case 3:
				current_row = row + 1;
				current_col = col + 1;
				break;
			default:
				break;
			}
			cnt++;
			if (current_row == r && current_col == c)
			{
				answer = cnt;
				return ;
			}
		}
		return ;
	}
	bound = pow(2, N - 1);
	if (r >= row + bound)
	{
		row = row + bound;
		cnt += 2 * bound * bound;
	}
	if (c >= col + bound)
	{
		col = col + bound;
		cnt += bound * bound;
	}
	draw_z(N - 1, row, col, cnt, answer);
	// for (int i = 0; i < 4; i++)
	// {
	// 	switch (i)
	// 	{
	// 	case 0:
	// 		draw_z(N - 1, row, col, cnt, answer);
	// 		break;
	// 	case 1:
	// 		draw_z(N - 1, row, col + bound, cnt, answer);
	// 		break;
	// 	case 2:
	// 		draw_z(N - 1, row + bound, col, cnt, answer);
	// 		break;
	// 	case 3:
	// 		draw_z(N - 1, row + bound, col + bound, cnt, answer);
	// 		break;
	// 	default:
	// 		break;
	// 	}
	// }
	return ;
}

int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0);
	int N;
	int cnt = -1;
	int answer;

	cin >> N >> r >> c;
	draw_z(N, 0, 0, cnt, answer);
	cout << answer << "\n";
	return 0;
}
```

#### 별 찍기 10

배열을 사용한다는 생각을 전혀 못하고 출력되는 순서대로 재귀적으로 풀이하려고했는데, 계속 고민하다가 못 끝내고 참고할 블로그를 찾던 중에 배열을 사용해서 풀었길래 조금 고쳐서 풀었다.  
재귀적으로 푸는 것도 가능은 할 것 같은데 너무 복잡해져서 아직은 못했다.

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
