#### 가사검색

효율성 1,2,3의 경우 trie라는 자료구조를 사용해야만 통과한다고해서 제외하고 통과해서 풀이했다.

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

int kmp(string s, string p)
{
	vector<int> pi = makePi(p);
	int j = 0;
	int cnt = 0;

	for (int i = 0; i < s.size(); i++)
	{
		while (j > 0 && p[j] != '?' && s[i] != p[j])
			j = pi[j - 1];
		if (s[i] == p[j] || p[j] == '?')
		{
			if (j == p.size() - 1)
			{
				cnt++;
				j = pi[j];
			}
			else
				j++;
		}
	}
	return cnt;
}

vector<int> solution(vector<string> words, vector<string> queries) {
    vector<int> answer;
	int cnt;

	for (int i = 0; i < queries.size(); i++)
	{
		cnt = 0;
		for (int j = 0; j < words.size(); j++)
		{
			if (words[j].length() == queries[i].length())
				cnt += kmp(words[j], queries[i]);
		}
		answer.push_back(cnt);
	}
    return answer;
}

```

#### Word subsets

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
	bool find_exist(string pattern, vector<int> &word_table, vector<int> &pattern_table){
		for (int i = 0; i < pattern.size(); i++)
		{
			if (word_table[pattern[i]] < pattern_table[pattern[i]])
				return false;
		}
		return true;
	}
	
	void makepatterntable(vector<int> &pre_table, string word)
	{
		vector<int> table(256, 0);

		for (int i = 0; i < word.size(); i++)
		{
			table[word[i]]++;
		}

		for (int i = 0; i < word.size(); i++)
		{
			pre_table[word[i]] = max(table[word[i]], pre_table[word[i]]);
		}
	}

	vector<int> maketable(string word)
	{
		vector<int> table(256, 0);

		for (int i = 0; i < word.size(); i++)
		{
			table[word[i]]++;
		}
		return table;
	}
	
    vector<string> wordSubsets(vector<string>& A, vector<string>& B) {
		int j;
		vector<string> answers;
		vector<int> pattern_table(256, 0);

		for (int i = 0; i < B.size(); i++)
		{
			makepatterntable(pattern_table, B[i]);
		}

        for (int i = 0; i < A.size(); i++)
		{
			vector<int> word_table = maketable(A[i]);
			for (j = 'a'; j <= 'z'; j++)
			{
				if (word_table[j] < pattern_table[j])
					break ;
			}
			if (j == 'z' + 1)
				answers.push_back(A[i]);
		}
		return answers;
    }
};
```


#### Maximum vowels

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxVowels(string s, int k) {
		vector<int> vowels(s.size(), 0);
		int N = s.size();
		int gap = k;
		int start;
		int temp = 0;
		int max = 0;
		
		for (int i = 0; i < s.size(); i++)
		{
			if (s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u')
				vowels[i] = 1;
		}
		start = 0;
		for (int i = start; i < start + gap; i++)
		{
			temp += vowels[i];
		}
		max = temp;
		for (start = 1; start <= s.size() - gap; start++)
		{
			temp -= vowels[start - 1];
			temp += vowels[start + gap - 1];
			max = std::max(max, temp);
		}
		return max;
    }
};
```
