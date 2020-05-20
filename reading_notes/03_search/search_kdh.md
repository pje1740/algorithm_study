## 탐색 알고리즘

### 선형 탐색

> 순차적으로 탐색하여 리스트의 각 원소를 확인

#### 시간 복잡도

- Worst case : O(n)
- Best case : O(1)
- Average case : O(n)
  - n(n + 1) / 2

### 이진 탐색

> 정렬된 리스트에서 리스트의 중간 값을 비교해나가며 탐색

- 오름 / 내림차순으로 정렬된 상태에서만 가능

#### 시간 복잡도

- Worst case : O(log n)
- Best case : O(1)
- Average case : O(log n)

#### 라이브러리

- C++에서는 std::binary_search를 통해 사용가능

## 정렬 알고리즘

이진 탐색 문제를 해결하던 중 std::sort를 이용하지 않고 퀵 소트를 이용해서 구현해봤다.

### Quick sort

> 평균 O(nlogn)의 시간복잡도를 가지고, 다른 O(nlogn)시간 복잡도의 정렬 알고리즘에 비해서도 가장 빠르다.

#### 개념

- Unsatble sort에 해당한다.
- divde and conquer 방법이다. - 문제를 작은 문제로 분리하여 각각 해결하는 방식이다.

#### 과정

1. 리스트의 한 요소를 선택하여 피벗(pivot)이라 한다.
2. 오름차순으로 정렬하기 위해 피벗보다 작은 요소들은 피벗의 왼쪽으로 옮기고, 피벗보다 큰 요소들은 피벗의 오른쪽으로 옮긴다.
3. 피벗은 정렬된 자신의 위치에 놓아졌으므로, 피벗 기준 왼쪽과 오른쪽의 리스트를 다시 정렬한다.
4. 리스트가 분할이 안될 때까지 반복한다.

#### 예시 코드

```c++
void partition(vector<int> &V, int start, int end, int &pivot) // start 는 리스트의 첫 원소, end는 리스트의 마지막 원소 리스트와 pivot은 레퍼런스 변수로 넘겨줌
{
	int temp;
	int left, right; //left는 리스트 가장 왼쪽 원소부터 오른쪽으로 진행하는 인덱스, right는 리스트 가장 오른쪽 원소부터 왼쪽으로 진행하는 인덱스

	pivot = start;
	left = start;
	right = end;
	while (left < right) //left와 right가 엇갈리면 종료
	{
		while (V[left] <= V[pivot] && left < end) // left가 리스트를 초과하지 않으면서, pivot보다 큰 원소가 나올때까지 오른쪽으로 진행
			left++;
		while (V[right] >= V[pivot] && right > start) // right가 리스트를 초과하지 않으면서, pivot보다 작은 원소가 나올때까지 왼쪽으로 진행
			right--;
		if (left < right)
		{
			SWAP(V[left], V[right], temp);
		}
	}
	if (pivot != right)
	{
		SWAP(V[pivot], V[right], temp);
		pivot = right; // pivot의 위치가 마지막 right의 위치이므로 대입
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
```
