## 정렬 알고리즘

> 각각의 정렬 알고리즘이 갖는 특징에 주목



### 단순한 정렬 알고리즘

---------

#### 버블 정렬

> 이해와 구현이 쉽지만, 성능은 떨어진다.

오름 차순으로 정렬을 할 경우 정렬의 우선 순위가 가장 낮은, 제일 큰 값을 맨 뒤로 보낸다.

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
using namespace std;

void bubble(vector<int> &arr) //벡터를 레퍼런스 인자로 넘긴다
{
	for (int i = 0; i < arr.size() - 1; i++){ // 마지막 전 까지만
		for (int j = 0; j < (arr.size() - i) - 1; j++){ // 이미 정렬이 된 것은 제외
			if (arr[j] > arr[j + 1])
				swap(arr[j], arr[j + 1]);
		}
	}	
}
```

**성능 평가 **

정렬 알고리즘의 성능은 두 가지 근거로 판단하는 것이 일반적이다.

- 비교의 횟수
- 이동의 횟수

실제로 시간 복잡도에 대한 Big-O를 결정하는 기준은 '비교의 횟수'이나, '이동의 횟수'를 통해 세밀한 비교가 가능하다.

```c++
for (int i = 0; i < arr.size() - 1; i++){
		for (int j = 0; j < (arr.size() - i) - 1; j++){
			if (arr[j] > arr[j + 1]) { . . . . } // 비교 연산이 발생하는 장소
		}
	}	
```

비교 연산에 대한 Big-O는 최선/최악의 경우 구분 없이 **O(n<sup>2</sup>)**이다. 

- 데이터가 4개 있다고 할 때, 3, 2, 1 순으로 비교를 하게 되므로 데이터가 n개 일 때 등차수열의 합을 구하면 n<sup>2</sup>-n / 2 이기 때문이다.

이동 연산에 대한 Big-O는 최악의 경우 (모든 데이터가 반대로 정렬되어 있을 때) **O(n<sup>2</sup>)**이다.  (비교할 때마다 이동하게 되므로)



#### 선택 정렬

> 정렬 순서에 맞게 하나씩 선택해서 옮기는 알고리즘

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
using namespace std;

void selelction(vector<int> &arr)
{
	int min_idx;

	for (int i = 0; i < arr.size() - 1; i++){
		min_idx = i;
		for (int j = i + 1; j < arr.size(); j++){ // 최소 인덱스 찾기
			if (arr[j] < arr[min_idx])
				min_idx = j;
		}
		if (i != min_idx)
			swap(arr[i], arr[min_idx]);
	}	
}
```



**성능 평가**

```c++
for (int i = 0; i < arr.size() - 1; i++){
		min_idx = i;
		for (int j = i + 1; j < arr.size(); j++){ // 선택 정렬의 비교 연산
			if (arr[j] < arr[min_idx])
				min_idx = j;
		}
		swap(arr[i], arr[min_idx]); // 선택 정렬의 대입 연산
	}	
```

비교 연산에 대한 Big-O는 최선/최악의 경우 구분 없이 **O(n<sup>2</sup>)**이다. 

- 안쪽 for 문에서 데이터가 n개 있을 때 비교연산 수는 (n - 1) + (n - 2) + . . . . + 2 + 1 이다. 따라서 버블 정렬과 동일한 O(n<sup>2</sup>)이다.

대입 연산에 대한 Big-O는 swap할 때 위의 예시 코드에서는 인덱스가 같을 때는 교환 하지 않지만 매번 교환 한다고 할 때, 최악/최선의 경우 구분 없이 O(n)이다.



#### 삽입 정렬

> 정렬 된 부분과 정렬 되지 않은 부분을 나눠서 정렬 되지 않은 데이터를 정렬 된 부분의 특정 위치에 삽입하여 정렬

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
using namespace std;

void insertion(vector<int> &arr)
{
	int insert_data;
	int j;

	for (int i = 1; i < arr.size(); i++){
		insert_data = arr[i];
		for (j = i - 1; j >= 0; j--){
			if (arr[j] > insert_data)
				arr[j + 1] = arr[j];
			else
			{
				break ;
			}
		}
		arr[j + 1] = insert_data;
	}	
}
```



**성능 평가**

```c++
	for (int i = 1; i < arr.size(); i++){
		. . . .
		for (j = i - 1; j >= 0; j--){
			if (arr[j] > insert_data) // 비교연산
				arr[j + 1] = arr[j]; // 데이터 이동 연산
			else
				break ;
		}
    . . . .
	}	
```

Best case일 때 완전히 정렬 돼있으므로 매번 안쪽 for문에서 break를 하게되기 때문에 바깥 for문의 반복횟수 이상 진행되지 않는다.

Worst case일 때 break를 한번도 실행하지 않기 때문에 바깥 for문과 안 쪽 for문의 반복횟수를 곱한 수만큼 비교와 이동연산이 진행된다.

대략적으로 추측하면 **O(n<sup>2</sup>)**의 시간복잡도를 가지는 것을 알 수 있다.

계산을 해보면 위의 정렬들과 같이 등차수열로 증가하는 횟수로 진행되기 때문에 비교연산과 이동연산에 대한 Big-O는 **O(n<sup>2</sup>)**이다.

 

### 복잡하지만 효율적인 정렬 알고리즘

----------------

#### 힙 정렬

> 최소 힙(min heap)과 최대 힙(max heap)을 이용한 정렬

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

priority_queue<int, vector<int>, greater<int>> min_heap; // greater를 통해 min heap 구성

void heap(vector<int> &arr)
{
	for (int i = 0; i < arr.size(); i++)
		min_heap.push(arr[i]);
	for (int i = 0; i < arr.size(); i++){
		arr[i] = min_heap.top();
		min_heap.pop();
	}	
}
```



**성능 평가**

데이터를 저장하고 삭제하는데 시간복잡도를 계산해보면,

- 힙의 데이터 저장 시간 복잡도 : O(log<sub>2</sub>n)

- 힙의 데이터 삭제 시간 복잡도 : O(log<sub>2</sub>n)

이므로 O(2log<sub>2</sub>n)는  O(log<sub>2</sub>n)이다.

정렬과정의 시간 복잡도는 n개 데이터를 삽입하고 삭제해야하므로  **O(nlog<sub>2</sub>n)**임을 알 수 있다.

O(n<sup>2</sup>)성능의 알고리즘을 O(nlog<sub>2</sub>n)의 성능을 보이도록 개선한다면 현실적으로 활용가능하게 개선했다고 말할 수 있다.



#### 병합 정렬

> 분할 정복 (divide and conquer)을 이용한 정렬

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
using namespace std;

void merge_two(vector<int> &arr, int left, int right)
{
	int mid = (left + right) / 2;
	int front_idx = left;
	int rear_idx = mid + 1;

	vector<int> sorted;
	while (front_idx <= mid && rear_idx <= right)
	{
		if (arr[front_idx] <= arr[rear_idx])
			sorted.push_back(arr[front_idx++]);
		else
			sorted.push_back(arr[rear_idx++]);
	}

	if (front_idx > mid) //배열의 앞부분이 모두 옮겨 졌을 때
	{
		for (int i = rear_idx; i <= right; i++)
			sorted.push_back(arr[i]);
	}
	else // 배열의 뒷부분이 모두 옮겨 졌을 때
	{
		for (int i = front_idx; i <= mid; i++)
			sorted.push_back(arr[i]);
	}
	
	for(int i = left; i <= right; i++)
	{
		arr[i] = sorted[i - left];
	}
} 

void merge_sort(vector<int> &arr, int left, int right)
{
	int mid;

	if (left < right)
	{
		mid = (left + right) / 2;

		merge_sort(arr, left, mid);
		merge_sort(arr, mid + 1, right);

		merge_two(arr, left, right);
	}
}
```



**성능 평가**

```c++
while (front_idx <= mid && rear_idx <= right)
{
		if (arr[front_idx] <= arr[rear_idx])	// 핵심 비교연산
			sorted.push_back(arr[front_idx++]);
		else
			sorted.push_back(arr[rear_idx++]);
}

. . . .

if (front_idx > mid) //배열의 앞부분이 모두 옮겨 졌을 때
{
   . . . . 
}
else // 배열의 뒷부분이 모두 옮겨 졌을 때
{
   . . . .
}
```

비교연산의 횟수를 하나와 하나가 모여서 둘이 될 때 최대 2회 진행이 된다고 할때, (핵심 비교연산과 아래의 if~else문)

데이터 수가 n개 일 때, 병합정렬에서 최대 비교연산의 횟수는 nlog<sub>2</sub>n이다. 따라서 빅오는 O(nlog<sub>2</sub>n)이 된다.

이동연산의 경우 임시배열에 데이터를 병합하는 과정에서 한번, 임시 배열에 저장된 데이터 전부를 원위치로 옮기는 과정에서 한번 이동해서 비교연산 횟수의 두 배에 해당하는 이동연산이 이뤄진다.

따라서 이동연산 횟수는 최악, 평균, 최선의 경우에 상관없이 2nlog<sub>2</sub>n이다. 따라서 빅오는  O(nlog<sub>2</sub>n)이 된다.



#### 퀵 정렬

> 분할 정복 (divide and conquer)을 이용한 정렬

**구현 예 (오름차순 정렬)**

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
```



**성능 평가**

하나의 피벗이 제 자리를 찾아가는 과정에서 (left와 right가 역전될 때까지) 피벗과의 비교를 매번하므로 데이터 갯수 n번 만큼 비교한다.

둘로 나뉘는 횟수를 k라고 할 때, 데이터의 수 n과의 관계는 k = log<sub>2</sub>n 을 이룬다. 따라서 비교연산 횟수는 nlog<sub>2</sub>n번이고, 빅오는 O(nlog<sub>2</sub>n)이다.

이 경우는 최선의 경우이고 최악의 경우 O(n<sup>2</sup>)이다. 하지만 중간에 가까운 피벗을 선택하면 평균적으로 최선의 경우에 가까운 성능을 보인다.



### 기타 

-----------------

#### 셀 정렬

> 삽입 정렬을 보완한 알고리즘

삽입 정렬과 다르게 셸 정렬은 전체의 리스트를 한 번에 정렬하지 않는다.

정렬해야 할 리스트의 각 k번째 요소를 추출해서 부분 리스트를 만든다.

이때, k를 '간격(gap)' 이라고 한다.

- 간격의 초깃값: (정렬할 값의 수) / 2
- 생성된 부분 리스트의 개수는 gap과 같다.

각 회전 마다 간격  k를 절반으로 줄인다.

- 간격을 절반으로 줄일 때 짝수가 나오면 +1을 해서 홀수로 만든다.

간격 k가 1이 될 때까지 반복한다.

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
using namespace std;

void shell_insertion(vector<int> &arr, int first, int gap)
{
	int insert_data;
	int j;

	for (int i = first + gap; i < arr.size(); i = i + gap){
		insert_data = arr[i];
		for (j = i - gap; j >= first; j = j - gap){
			if (arr[j] > insert_data)
				arr[j + gap] = arr[j];
			else
			{
				break ;
			}
		}
		arr[j + gap] = insert_data;
	}
}

void shell(vector<int> &arr)
{
	int gap;

	for (gap = arr.size() / 2; gap > 0; gap = gap / 2){
		if (gap % 2 == 0)
			gap++;
		
		for (int i = 0; i < gap; i++)
		{
			shell_insertion(arr, i, gap);
		}
	}
}
```



**성능 평가**

평균 O(n<sup>1.5</sup>)의 시간 복잡도를 가지고, 최악의 경우 O(n<sup>2</sup>)를 가진다.



#### 도수 정렬 

> 요소의 대소 관계를 파악하지 않고 빠르게 정렬할 수 있는 알고리즘

도수분포표가 필요하기 때문에 데이터의 최솟값과 최댓값을 미리 알고 있는 경우에만 사용할 수 있다. 과정은 다음과 같다.

1. 도수분포표 만들기
   - 각 수치 해당하는 요소가 몇개인 지를 나타내는 도수분포표를 만든다.
2. 누적도수분포표 만들기
   - 도수분포표를 기반으로 최솟값부터 각 수치까지 몇 명의 학생이 있는지 누적된 값을 나타내는 누적도수분포표를 만든다.
3. 목적 배열 만들기
   - 요소값과 누적도수분포표를 대조하여 정렬을 마친 배열을 만든다.
4. 배열 복사하기

**구현 예 (오름차순 정렬)**

```c++
#include <iostream>
#include <vector>
using namespace std;

void count(vector<int> &arr, int max)
{
	int *f = new int[max + 1];
	int *sorted = new int[arr.size()];
	for (int i = 0; i < max + 1; i++)
		f[i] = 0;

	for (int i = 0; i < arr.size(); i++)
		f[arr[i]]++;
	
	for (int i = 1; i <= max; i++)
		f[i] += f[i - 1];

	for (int i = arr.size() - 1; i>= 0; i--)
		sorted[--f[arr[i]]] = arr[i];

	for (int i = 0; i < arr.size(); i++)
		arr[i] = sorted[i];
}
```



**성능 평가**

O(n + k)의 시간족잡도로 퀵정렬, 병합정렬에 비해 일반적으로 빠르다.

