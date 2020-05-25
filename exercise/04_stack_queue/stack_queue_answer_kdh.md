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
