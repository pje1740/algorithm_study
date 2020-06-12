#### 가장 큰 수

아래 코드는 오래 고민하다가 결국 다른 풀이를 참고해서 작성한 코드다.  string을 저렇게 편하게 비교할 수 있는 지 알았으면 복잡한 알고리즘을 고민하지 않아도 됐을텐데 싶다.

```c++
#include <bits/stdc++.h>
using namespace std;

bool compare(string a, string b)
{
	return a + b > b + a;
}

string solution(vector<int> numbers) {
    string answer = "";
	string temp;
	vector<string> string_nums;

	for (auto t: numbers)
	{
		string_nums.push_back(to_string(t));
	}
	sort(string_nums.begin(), string_nums.end(), compare);

	if (string_nums[0] == "0")
		return "0";
	for (auto t: string_nums)
	{
		answer = answer + t;
	}
    return answer;
}
```

하단의 코드는 처음 고민하던 방식인데 처음 실행했을때의 두가지 케이스는 만족 하는데 너무 복잡해지고 분기도 많아져서 구현하기에는 어려움이 있었다.
손으로 쓰면서 슈도코드 까지는 생각이 된것 같은데 코드로 옮기는 것은 복잡해서 끝까지 작성은 하지 못했다.

```c++
#include <bits/stdc++.h>
using namespace std;

void num_size(int a, int &cnt)
{
	if (a >= 10)
	{
		num_size(a / 10, cnt);
		num_size(a % 10, cnt);
	}
	else
	{
		cnt++;
		return ;
	}
}

bool better_num(int a, int b, int first)
{
	int first_size_a = 0, first_size_b = 0;
	int size_a = 0, size_b = 0;
	int div_a = 0, div_b = 0;
	int result_a, result_b;

	num_size(a, first_size_a);
	num_size(b, first_size_b);
	// if (a % 10 == 0 || b % 10 == 0)
	// {
	// 	if (first_size_a < first_size_b)
	// 		return true;
	// 	else
	// 		return false;
	// }
	while (1)
	{
		switch (size_a)
		{
			case 1:
				result_a = first;
				break;
			default:
				size_a = 0;
				num_size(a, size_a);
				div_a = pow(10, size_a - 1);
				result_a = a / div_a;
		}
		switch (size_b)
		{
			case 1:
				result_b = first;
				break;
			default:
				size_b = 0;
				num_size(b, size_b);
				div_b = pow(10, size_b - 1);
				result_b = b / div_b;
		}
		// cout << div_a << " " << result_a << " " << div_b << " " << result_b << "\n";
		if (result_a == result_b)
		{
			a = a % div_a;
			b = b % div_b;
			continue ;
		}
		else
		{
			
			return result_a > result_b;
		}
	}
	return false;
}

bool compare(int a, int b)
{
	int size_a = 0, size_b = 0;
	int first_a, first_b;

	num_size(a, size_a);
	num_size(b, size_b);
	if (size_a == size_b)
	{
		return a > b;
	}
	else
	{
		first_a = a / pow(10, size_a - 1);
		first_b = b / pow(10, size_b - 1);
		if (first_a == first_b)
		{
			return better_num(a, b, first_a);
		}
		else
		{
			return first_a > first_b;
		}
	}
}

string solution(vector<int> numbers) {
    string answer = "";
	vector<string> string_nums;

	sort(numbers.begin(), numbers.end(), compare);
	for (auto t: numbers)
	{
		answer = answer + to_string(t);
	}
    return answer;
}
```

#### H-index

```c++
#include <bits/stdc++.h>
using namespace std;

int solution(vector<int> citations) {
    int answer = 0;
	int i;
	sort(citations.begin(), citations.end());
	for (i = citations.size() - 1; i >= 0; i--)
	{
		if (citations.size() - i >= citations[i])
		{
			answer = citations[i];
			break ;
		}
	}
	if (i == citations.size() - 1)
		return answer;
	while (answer < citations[i + 1] - 1 && citations.size() - i - 1 >= answer + 1)
		answer++;
    return answer;
}
```

#### 단어 정렬

```c++
#include <bits/stdc++.h>
using namespace std;

bool sort_dict(string a, string b)
{
	int i;

	i = 0;
	while (a[i] != 0 && b[i] != 0)
	{
		if (a[i] != b[i])
			return a[i] < b[i];
		i++;
	}
	return false;
}

bool compare(string a, string b)
{
	if (a.size() == b.size())
		return sort_dict(a, b);
	else
		return a.size() < b.size();
}

int main()
{
	int N;
	string temp;
	cin >> N;
	vector<string> words(N);
	for (int i = 0; i < N; i++)
	{
		cin >> words[i];
	}
	sort(words.begin(), words.end(), compare);

	// cout << "\n";
	for (int i = 0; i < N; i++)
	{
		if (i != N - 1 && words[i].compare(words[i + 1]) == 0)
			continue ;
		cout << words[i] << "\n";
	}
	return 0;
}
```

#### Sort Colors

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        int one, zero, two;
		zero = -1;
		one = 0;
		two = nums.size();
		
		while (one < two)
		{
			if (nums[one] == 1)
				one++;
			else if (nums[one] == 0)
			{
				zero++;
				swap(nums[one], nums[zero]);
				one++;
			}
			else
			{
				two--;
				swap(nums[one], nums[two]);
			}
		}
    }
};

int main()
{
	Solution *sol = new Solution;
	vector<int> nums = {2, 0 ,2 ,1, 1, 0};
	sol->sortColors(nums);
	// swap(nums[0], nums[1]);
	for (auto t : nums)
	{
		cout << t << " ";
	}
}
