#  🎴 06 정렬

> 이름, 학번, 키 등 핵심 항목(Key)의 대소 관계에 따라 데이터 집합을 일정한 순서로 줄지어 늘어서도록 바꾸는 작업.



### POINT

- 정렬을 하면 검색을 더 쉽게 할 수 있다.
- 핵심 요소 : 교환, 선택, 삽입
- 종류 : 버블 정렬, 선택 정렬, 삽입 정렬, 셸 정렬, 퀵 정렬, 병합 정렬, 힙 정렬, 도수 정렬



### 정렬의 특징 (필요한거야 이거?)

#### 안정성에 따라

- 안정된 알고리즘 : 같은 값의 키를 가진 요소의 순서가 정렬 전후에도 유지되는 경우
- 안정되지 않은 알고리즘 : 같은 값이어도 반드시 순서대로 정렬되지 않음

```c
// 번호 기준 오름차순 정렬
[{"감자", 5}, {"애호박", 10}, {"김", 5}]

=> [{"감자", 5}, {"김", 5}, {"애호박", 10}] // 안정
=> [{"김", 5}, {"감자", 5}, {"애호박", 10}] // 노안정
```



#### 작업 범위에 따라

- 내부 정렬 : 정렬할 모든 데이터를 하나의 배열에 저장할 수 있는 경우에 사용.
- 외부 정렬 : 정렬할 데이터가 너무 많아서 하나의 배열에 사용할 수 없는 경우



## 06-2 버블 정렬

> 이웃간 두 요소의 대소관계를 비교하여 교환을 반복



#### POINT

- 반복 횟수 :  n - 1
- 시간 복잡도 : O(n²) 가성비 안좋음.



#### 일반 버블 정렬

```javascript
const swap = (arr, a, b) => {
	let tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

const bubbleSort = (arr, num) => {
	for (let i = 0; i < num - 1; i++) {
		for (let j = num - 1; j > i; j--) {
			if (arr[j-1] > arr[j]) {
				swap(arr, j-1, j);
			}
		}
	}
	return arr;
}

let arr = [4, 6, 1, 9, 3];
console.log(bubbleSort(arr, 5));
// [ 1, 3, 4, 6, 9 ]
```



#### 개선 버블 정렬

```javascript
const swap = (arr, a, b) => {
	let tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

const bubbleSort = (arr, num) => {
	for (let i = 0; i < num - 1; i++) {
		let exchg = 0; // 앞에 부분이 미리 정렬되어 있는지 확인하는 변수
		for (let j = num - 1; j > i; j--) {
			if (arr[j-1] > arr[j]) {
				swap(arr, j-1, j);
				exchg++;
			}
		}
		if (!exchg) break; // exchg가 0이면, 즉 앞부분이 다 정렬된 상태라면 함수 종료
	}
	return arr;
}

let arr = [1, 2, 3, 9, 7];
console.log(bubbleSort(arr, 5));
[ 1, 2, 3, 7, 9 ]
```



#### 개선 버블 정렬2

```javascript
const swap = (arr, a, b) => {
	let tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

const bubbleSort = (arr, num) => {
	let k = 0;
	while (k < num - 1) {
		let last = num - 1;
		for (let j = num - 1; j > k; j--) {
			if (arr[j-1] > arr[j]) {
				swap(arr, j-1, j);
				last = j;
			}
		}
		k = last; // 정렬된 부분까지의 인덱스 뒤에만 확인
	}
	return arr;
}

let arr = [1, 7, 3, 9, 5];
console.log(bubbleSort(arr, 5));
// [ 1, 3, 5, 7, 9 ]
```





## 06-3. 단순 선택 정렬

> 가장 작은 요소부터 선택해 알맞은 위치로 옮겨서 순서대로 정렬하는 알고리즘



#### POINT

- 반복 횟수 :  n - 1
- 시간 복잡도 : O(n²) 가성비 안좋음.



```javascript
const swap = (arr, a, b) => {
	let tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

const selectionSort = (arr, num) => {
	for (let i = 0;  i < num - 1; i++) {
		let min = i;
		for (let j = i + 1; j < num; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		swap(arr, i, min)
	}
	return arr;
}

let arr = [1, 7, 3, 9, 5];
console.log(selectionSort(arr, 5));
// [ 1, 3, 5, 7, 9 ]

```





## 06-4. 단순 삽입 정렬

> 선택한 요소를 알맞은 위치에 삽입하는 방법



#### POINT

- 반복 횟수 :  n - 1
- 시간 복잡도 : O(n²) 가성비 안좋음.



```javascript
const insertionSort = (arr, num) => {
	for (let i = 1; i < num; i++) {
		let j;
		let tmp = arr[i];
		for (j = i; j > 0 && arr[j - 1] > tmp; j--) {
			arr[j] = arr[j - 1];
		}
		arr[j] = tmp;
	}
	return arr;
}

let arr = [1, 7, 3, 9, 5];
console.log(insertionSort(arr, 5));
// [ 1, 3, 5, 7, 9 ]

```



## 06-5. 셸 정렬

> 단순 삽입 정렬의 장점은 살리고 단점은 보완한 정렬
>
> 와 도널드 셸씨가 만들어서 셸 정렬이래.



#### POINT

- 반복 횟수 :  n - 1
- 시간 복잡도 : O(n¹﹒²⁵) 위 정렬보다는 빠르나, 멀리 떨어져 있는 요소를 교환해야 하므로 안정적이진 않다.



```javascript
const shellSort = (arr, num) => {
  // js는 소수점으로 나뉘므로 floor 함수 필수 적용!
	for (let h = Math.floor(num / 2); h > 0; h = Math.floor(h / 2)) {
		for (let i = h; i < num; i++) {
			let j;
			let tmp = arr[i];
			for (j = i - h; j >= 0 && arr[j] > tmp; j -= h) {
				arr[j + h] = arr[j];
			}
			arr[j + h] = tmp;
		}
	}
	return arr;
}

let arr = [1, 7, 3, 9, 2, 5, 8];
console.log(shellSort(arr, 7));
// [ 1, 2, 3, 5, 7, 8, 9 ]
```



## 06-6. 퀵 정렬

> 가장 빠른 알고리즘 중 하나
>
> 그룹을 나누는 기준인 "피벗"을 이용한다.



```javascript
const swap = (arr, a, b) => {
	let tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

const quickSort = (arr, left, right) => {
	let pl = left;
	let pr = right;
	let x = arr[Math.floor((pl + pr) / 2)];
	do {
		while (arr[pl] < x) pl++;
		while (arr[pr] > x) pr--;
		if (pl <= pr)
			swap(arr, pl++, pr--);
	} while (pl <= pr);
	
	if (left < pr) quickSort(arr, left, pr);
	if (pl < right) quickSort(arr, pl, right);
	return arr;
}

let arr = [1, 7, 3, 9, 2, 5, 8];
console.log(quickSort(arr, 0, 8));
// [ 1, 2, 3, 5, 7, 8, 9 ]

```















