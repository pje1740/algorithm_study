## 문자열 검색

### 브루트 포스

> 무식하게 다 찾아보는 방식 O(n * m)의 시간복잡도

탐색 대상 문자열 s에 존재하는 찾고자 하는 패턴 문자열 p를 검색할 때 s의 처음 인덱스부터 끝 인덱스 까지 전체를 탐색하는 방법

```c++
#include <bits/stdc++.h> 
using namespace std; 
  
void search(char* pat, char* txt) 
{ 
    int M = strlen(pat); 
    int N = strlen(txt); 
  
    for (int i = 0; i <= N - M; i++) { 
        int j; 
  
        for (j = 0; j < M; j++) 
          if (txt[i + j] != pat[j]) 
            break; 
  
        if (j == M)
          cout << "Pattern found at index " << i << endl; 
    } 
} 
  
```



### KMP

> 시간복잡도를 O(n + m)으로 줄인 효율적인 문자열 검색 방법

KMP 알고리즘에서 접두사와 접미사 개념을 활용하게 된다.

- 접두사란 문자열의 길이가 n일때 0번 인덱스 부터 시작하고 끝이 0부터 시작해서 최대 n - 1번째 인덱스 까지의 문자열을 말한다.
- 접미사란 문자열의 길이가 n일때 n - 1번째로 끝이나고 시작이 n - 1부터 시작해서 최소 0번째 인덱스 까지의 문자열을 말한다.

KMP 알고리즘에서는 Pi라는 부분 문자열 별로 접두사와 접미사가 겹치는 최대 갯수를 저장해놓은 배열을 이용해서, 이미 검사한 문자열에 대한 정보를 활용해 문자열을 검색할 때 단계를 뛰어넘어서 검색할 수 있도록 한다.

```c++
#include <bits/stdc++.h>
using namespace std;

vector<int> makePi(string p)
{
	vector<int> pi(p.size(), 0);
	int j = 0;

	for (int i = 1; i < p.size(); i++){
		while (j > 0 && p[i] != p[j])
			j = pi[j - 1];
		if (p[i] == p[j])
		{
			pi[i] = ++j;
		}
	}
	return pi;
}

int kmp(string s, string p, vector<int> &answers)
{
	vector<int> pi = makePi(p);
	int j = 0;
	int cnt = 0;

	for (int i = 0; i < s.size(); i++)
	{
		while (j > 0 && s[i] != p[j])
			j = pi[j - 1];
		if (s[i] == p[j])
		{
			if (j == p.size() - 1)
			{
				cnt++;
				answers.push_back(i - (p.size() - 1) + 1);
				j = pi[j];
			}
			else
				j++;
		}
	}
	return cnt;
}
```



### Boyer Moore

> 현재 상용 프로그램들에서도 사용하는 검색 알고리즘. KMP보다 좋은 성능을 보인다.

Boyer Moore 법은 다른 방법들과 다르게 패턴 문자열의 뒤에서 부터 비교를 해나간다.

Boyer Moore 법은 크게 두가지 방법을 사용해서 효율을 높인다.

1. Bad character rule
   - 문자열을 비교하던 중 일치한지 않는 문자가 나오면 그 문자가 패턴의 오른쪽 끝에서부터 왼쪽으로 볼때 가장 먼저 나오는 위치를 저장해놓은 배열을 통해서 단계를 건너뛰어서 검색을 한다.
2. Good suffix rule
   - 문자열을 비교하던 중 일치한지 않는 문자가 나오면 지금까지 일치한 부분 문자열 t에 대한 접두사 또는 접미사가 패턴 문자열에서 존재하는지 찾아서 단계를 건너뛸 수 있게 한다.

```c++
#include <bits/stdc++.h>
#define SIZE 256
using namespace std;

vector<int> preprocess_p(string p)
{
	vector<int> bad_char(SIZE , -1);
	char temp;

	for (int i = 0; i < p.size(); i++)
	{
		bad_char[p[i]] = i;
	}
	return bad_char;
}

int boyer_moore(string s, string p, vector<int> &answers)
{
	vector<int> bad_char = preprocess_p(p);
	int s_len = s.size();
	int p_len = p.size();
	int cnt = 0;
	int i = 0;
	int j;

	while (i <= (s_len - p_len))
	{ 
		j = p_len - 1;

		while (j >= 0 && s[i + j] == p[j])
			j--;
		
		if (j < 0)
		{
			cnt++;
			answers.push_back(i + 1);
			i += (i + p_len < s_len) ? p_len - bad_char[s[i + p_len]] : 1;
		}
		else
			i += max(1, j - bad_char[s[i + j]]);
	}
	return cnt;
}
```



참고 링크들 

- https://www.youtube.com/watch?v=4Xyhb72LCX4
- http://www.cs.jhu.edu/~langmea/resources/lecture_notes/boyer_moore.pdf
- https://bowbowbow.tistory.com/6
