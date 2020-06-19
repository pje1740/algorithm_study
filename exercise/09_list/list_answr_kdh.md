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
