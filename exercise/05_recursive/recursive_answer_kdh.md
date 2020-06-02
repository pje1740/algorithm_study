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
#include <bits/stdc++.h>
using namespace std;
char star[2187][2187];

void print_star(int N, int row, int col, int blank)
{
	int bound;
	int r, c;

	if (N == 1)
	{
		if (blank)
			star[row][col] = ' ';
		else
			star[row][col] = '*';
		return ;
	}
	bound = N / 3;
	// switch (bound_row)
	// {
	// case 0:
	// 	for (int i = 0; i < bound; i++)
	// 	{
	// 		print_star(N / 3, row, col, accumulate, blank, i);
	// 		print_star(N / 3, row, col + bound, accumulate, blank, i);
	// 		print_star(N / 3, row, col + 2 * bound, accumulate, blank, i);
	// 		if (pow(3, accumulate) == N)
	// 			cout << "\n";
	// 	}
	// 	break;
	// case 1:
	// 	for (int i = 0; i < bound; i++)
	// 	{
	// 		print_star(N / 3, row + bound, col, accumulate, blank, i);
	// 		print_star(N / 3, row + bound, col + bound, accumulate, 1, i);
	// 		print_star(N / 3, row + bound, col + 2 * bound, accumulate, blank, i);
	// 		if (pow(3, accumulate) == N)
	// 			cout << "\n";
	// 	}
	// 	break;
	// case 2:
	// 	for (int i = 0; i < bound; i++)
	// 	{
	// 		print_star(N / 3, row + 2 * bound, col, accumulate, blank, i);
	// 		print_star(N / 3, row + 2 * bound, col + bound, accumulate, blank, i);
	// 		print_star(N / 3, row + 2 * bound, col + 2 * bound, accumulate, blank, i);
	// 		if (pow(3, accumulate) == N)
	// 			cout << "\n";
	// 	}
	// 	break;
	// default:
	// 	break;
	// }
	for (int i = 0; i < 9; i++)
	{
		r = i / 3;
		c = i % 3;
		if (blank == 0 && i == 4)
		{
			blank = 1;
			print_star(N / 3, row + r * bound, col + c * bound, blank);
			blank = 0;
		}
		else
		{
			print_star(N / 3, row + r * bound, col + c * bound, blank);
		}
	}
}

int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N;
	cin >> N;
	print_star(N, 0, 0, 0);
	for (int i = 0; i < N; i++)
	{
		for (int j = 0; j < N; j++)
		{
			cout << star[i][j];
		}
		cout << "\n";
	}
	return 0;
}
```


#### Power of Three

Leetcode를 처음 풀어보는데 c++ 코드를 이용해서풀때 Solution class를 만들어서 사용하는데, 객체 지향적이게 c++을 사용해본적이 한번도 없어서 검색을 통해서 참고해서 써야했다. c++을 객체지향적으로 사용하는 방법을 교재를 통해 배워야할 것 같다.

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isPowerOfThree(int n) {
		if (n == 0)
			return 0;
		if (n == 1)
			return 1;
		double temp = n;
		if (temp / 3 == floor(temp / 3))
		{
			if (isPowerOfThree(n / 3))
				return 1;
			else
				return 0;
		}
		return  0;
    }
};

int main()
{
	Solution *s = new Solution;
	cout << s->isPowerOfThree(27);
	return 0;
}
```

#### 단어 변환

재귀를 짜다보니 반복되는 코드가 생겨서 코드를 수정하면 좀 더 간결히 구성할 수 있을 것 같다.
처음에는 큐를 사용해서 BFS 방식으로 순회해서 스택으로 고쳐서 DFS방식으로 순회할 수 있었다.

```c++
#include <bits/stdc++.h>
using namespace std;
int minimum = -1;
stack<string> s;

bool is_convertable(string from, string to)
{
	int diff = 0;
	if (from.compare(to) == 0)
		return false;
	for (int i = 0; i < from.size(); i++)
	{
		if (from[i] != to[i])
		{
			if (diff == 0)
				diff = 1;
			else
				return false;
		}
	}
	return true;
}

void find_min(vector<int> visited, vector<string> words, string target, int cnt)
{
	string from;

	if (s.empty())
		return ;
	from = s.top();
	s.pop();
	cnt++;
	if (from.compare(target) == 0)
	{
		if (minimum == -1)
		{
			minimum = cnt;
		}
		else
			minimum = min(minimum, cnt);
		// cout << cnt << "\n";
		// while (!q.empty())
		// {
		// 	cout << q.front() << " ";
		// 	q.pop(); 
		// }
		// cout << "\n";
		return ;
	}
	for (int i = 0; i < words.size(); i++)
	{
		if (from.compare(words[i]) != 0 && visited[i] == 0 && is_convertable(from, words[i]))
		{
			s.push(words[i]);
			visited[i] = 1;
		}
	}
	while (!s.empty())
		find_min(visited, words, target, cnt);
}

int solution(string begin, string target, vector<string> words) {
	vector<int> visited(words.size(), 0);
    int answer = 0;
	int cnt = 0;
	bool is_exist = 0;

	for (auto t: words)
	{
		if (t == target)
		{
			is_exist = true;
			break ;
		}
	}
	if (!is_exist)
		return answer;
	for (int i = 0; i < words.size(); i++)
	{
		if (begin.compare(words[i]) != 0 && visited[i] == 0 && is_convertable(begin, words[i]))
		{
			s.push(words[i]);
			visited[i] = 1;
		}
	}
	find_min(visited, words, target, cnt);
	answer = minimum;
    return answer;
}

int main()
{
	vector<std::string> words = {"hot", "dot", "dog", "lot", "log", "cog"};
	cout << solution("hit", "cog", words) << "\n"; 
	return 0;
}
```

재귀 함수 구조를 조금 바꾼 코드이다

```c++
#include <bits/stdc++.h>
using namespace std;
int minimum = -1;
stack<string> s;

bool is_convertable(string from, string to)
{
	int diff = 0;
	if (from.compare(to) == 0)
		return false;
	for (int i = 0; i < from.size(); i++)
	{
		if (from[i] != to[i])
		{
			if (diff == 0)
				diff = 1;
			else
				return false;
		}
	}
	return true;
}

void find_min(vector<int> visited, vector<string> words, string from, string target, int cnt)
{
	for (int i = 0; i < words.size(); i++)
	{
		if (from.compare(words[i]) != 0 && visited[i] == 0 && is_convertable(from, words[i]))
		{
			s.push(words[i]);
			visited[i] = 1;
		}
	}
	from = s.top();
	s.pop();
	cnt++;
	if (from.compare(target) == 0)
	{
		if (minimum == -1)
		{
			minimum = cnt;
		}
		else
			minimum = min(minimum, cnt);
		return ;
	}
	find_min(visited, words, from, target, cnt);
}

int solution(string begin, string target, vector<string> words) {
	vector<int> visited(words.size(), 0);
    int answer = 0;
	int cnt = 0;
	bool is_exist = 0;

	for (auto t: words)
	{
		if (t == target)
		{
			is_exist = true;
			break ;
		}
	}
	if (!is_exist)
		return answer;
	find_min(visited, words, begin, target, cnt);
	answer = minimum;
    return answer;
}
```

#### 괄호 변환

재귀 알고리즘을 구현하는데는 문제가 없는데 문제 자체의 이해가 조금 어려운 부분이있다.

```c++
#include <bits/stdc++.h>
using namespace std;
stack<char> s_valid;

int divide(string s) //u가 오른쪽에 생기는 경우가 없나?
{
	int i = 0;
	int open = 0;
	int close = 0;

	while (s[i] != '\0')
	{
		if (s[i] == '(')
			open++;
		else if (s[i] == ')')
			close++;
		i++;
		if (open != 0 && open == close) // 같은 거 이후 한칸 더가서 리턴 (사이즈를 리턴하는 셈)
			return i;
	}
	return i;
}

bool is_valid(string s)
{
	for (auto t: s)
	{
		if (t == '(')
			s_valid.push('(');
		else if (t == ')')
		{
			if (!s_valid.empty())
				s_valid.pop();
			else
				return false;
		}
	}
	if (s_valid.empty())
		return true;
	return false;
}

void reverse(string &s)
{
	for (auto &t : s)
	{
		if (t == '(')
			t = ')';
		else if (t == ')')
			t = '(';
	}
}

string convert(string p)
{
	string u, v;
	string temp = "";
	int div_idx;

	if (p.compare("") == 0)
		return p;
	div_idx = divide(p);
	u = p.substr(0, div_idx);
	// cout << u << "\n";
	v = p.substr(div_idx, p.size());
	// cout << v << "\n";
	if (is_valid(u))
		return u + convert(v);
	else
	{
		temp.push_back('(');
		temp = temp + convert(v);
		temp.push_back(')');
		u = u.substr(1, u.size());
		u.pop_back();
		reverse(u);
		temp = temp + u;
		return temp;
	}
}

string solution(string p) {
    string answer = "";
	answer = convert(p);
    return answer;
}

int main()
{
	cout << solution("()))((()") << "\n";
	return 0;
}
```
