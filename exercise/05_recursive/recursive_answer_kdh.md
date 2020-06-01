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
