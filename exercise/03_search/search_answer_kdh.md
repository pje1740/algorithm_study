## 선형 탐색

#### 풀이

```c++
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    vector<int> input;
    int max, max_idx;
    int temp;

    for (int i = 0; i < 9; i++)
    {
        cin >> temp;
        input.push_back(temp);
    }

    max = input[0];
    max_idx = 0;
    for (int i = 0; i < 9; i++)
    {
        if (input[i] > max)
        {
            max = input[i];
            max_idx = i;
        }
    }
    cout << max << "\n" << max_idx + 1 << "\n";
    return (0);
}
```

## 이진탐색

#### 풀이

```c++
#include <bits/stdc++.h>
#define SWAP(a, b, temp) temp = a; a = b; b = temp;
using namespace std;

int binary_search(vector<int> &V, int target)
{
    int start, end;
    int mid;

    start = 0;
    end = V.size() - 1;
    while (start <= end)
    {
        mid = (start + end) / 2;
        if (V[mid] == target)
            return (1);
        else if (V[mid] < target)
            start = mid + 1;
        else if (V[mid] > target)
            end = mid - 1;
    }
    return (0);
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int N, M;
    vector<int> Ns, Ms;
    int temp;
    cin >> N;
    for (int i = 0; i < N; i++)
    {
        cin >> temp;
        Ns.push_back(temp);
    }
    sort(Ns.begin(), Ns.end()); // std::sort, vector의 begin, end를 인자로
    cin >> M;
    int exist = 0;
    for (int i = 0; i < M; i++)
    {
        cin >> temp;
        exist = binary_search(Ns, temp); // 존재하면 1 반환
        Ms.push_back(exist);
        exist = 0;
    }
    for (auto t : Ms)
    {
        cout << t << "\n";
    }
    return (0);
}
```

#### quick sort를 이용한 풀이

```c++
#include <bits/stdc++.h>
#define SWAP(a, b, temp) temp = a; a = b; b = temp;
using namespace std;

void partition(vector<int> &V, int start, int end, int &pivot)
{
	int temp;
	int left, right;

	pivot = start;
	left = start;
	right = end;
	while (left < right)
	{
		while (V[left] <= V[pivot] && left < end)
			left++;
		while (V[right] >= V[pivot] && right > start)
			right--;
		if (left < right)
		{
			SWAP(V[left], V[right], temp);
		}
	}
	if (pivot != right)
	{
		SWAP(V[pivot], V[right], temp);
		pivot = right;
	}
}

void quick_sort(vector<int> &V, int start, int end)
{
	int pivot;

	if (start < end)
	{
		partition(V, start, end, pivot); // pivot 기준으로 부분 리스트를 나눔
		if (pivot != start)
			quick_sort(V, start, pivot - 1);
		if (pivot != end)
			quick_sort(V, pivot + 1, end);
	}
}

int binary_search(vector<int> &V, int target)
{
	int start, end;
	int mid;

	start = 0;
	end = V.size() - 1;
	while (start <= end)
	{
		mid = (start + end) / 2;
		if (V[mid] == target)
			return (1);
		else if (V[mid] < target)
			start = mid + 1;
		else if (V[mid] > target)
			end = mid - 1;
	}
	return (0);
}

int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0);
	int N, M;
	vector<int> Ns, Ms;
	int temp;
	cin >> N;
	for (int i = 0; i < N; i++)
	{
		cin >> temp;
		Ns.push_back(temp);
	}
	quick_sort(Ns, 0, Ns.size() - 1);
	cin >> M;
	int exist = 0;
	for (int i = 0; i < M; i++)
	{
		cin >> temp;
		exist = binary_search(Ns, temp);
		Ms.push_back(exist);
		exist = 0;
	}
	for (auto t : Ms)
	{
		cout << t << "\n";
	}
	return (0);
}
```

### 예산
> 이진 탐색을 통해서 정확한 값 뿐만 아니라 최소 또는 최대값을 찾을 때도 사용할 수 있다는 것을 알게된 문제였다.

```c++
#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

void binary_max(vector<int> &V, int M, long long &max)
{
	long long start, end;
	long long mid;
	long long sum;

	max = 0;
	sum = 0;
	start = 1;
	end = *(V.end() - 1);
	while (start <= end)
	{
		mid = (start + end) / 2;
		for (unsigned int i = 0; i < V.size(); i++)
		{
			if (V[i] <= mid)
				sum += V[i];
			else
			{
				sum += mid;
			}
		}
		if (sum == M)
		{
			max = mid;
			return ;
		}
		else if (sum > M)
		{
			end = mid - 1;
		}
		else if (sum < M)
		{
			start = mid + 1;
			if (max < mid)
				max = mid;
		}
		sum = 0;
	}
}

int solution(vector<int> budgets, int M) {
    long long answer = 0;
    sort(budgets.begin(), budgets.end());
    for (unsigned int i = 0; i < budgets.size(); i++)
    {
        answer += budgets[i];
    }
    if (answer <= M)
        return *(budgets.end() - 1);
    else
        answer = 0;
	binary_max(budgets, M, answer);
    return answer;
}
```

### 입국심사
> 최소를 정하기 위한 검사 방법이 생각이 안나서 참고 했는데 직접 모두 생각해내기는 어려웠을 것 같다.

```c++
#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

void binary_min(vector<int> &V, int n, long long &min)
{
	long long start, end;
	long long mid;
	long long sum;

	sum = 0;
	start = 1;
	end = (long long)(*(V.end() - 1)) * n;
	min = end;
	while (start <= end)
	{
		sum = 0;
		mid = (start + end) / 2;
		for (unsigned int i = 0; i < V.size(); i++)
		{
			sum += mid / V[i];
		}
		if (sum < n)
			start = mid + 1;
		else if (sum >= n)
		{
			if (mid < min)
				min = mid;
			end = mid - 1;
		}
	}
}

long long solution(int n, vector<int> times) {
    long long answer = 0;
	sort(times.begin(), times.end());
	binary_min(times, n, answer);
    return answer;
}
```

