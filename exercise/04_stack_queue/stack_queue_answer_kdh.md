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
