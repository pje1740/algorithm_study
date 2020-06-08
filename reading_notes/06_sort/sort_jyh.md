### 정렬

#### 정렬 알고리즘은 원소들을 번호순이나 사전 순서와 같이 일정한 순서대로 열거하는 알고리즘이다. 효율적인 정렬은 탐색이나 병합 알고리즘처럼 다른 알고리즘을 최적화하는데 중요하다. 

---

### 버블 정렬

- **버블 정렬**
  - **인접한 두 원소를 검사하여 정렬하는 알고리즘**
  - 정렬할 목록 전체를 반복하며 해당 인덱스의 값이 인접한 값과 스왑이 가능한 경우 스왑한다.
  - 더 이상 스왑이 필요하지 않을 때까지 반복된다.
    ![](https://images.velog.io/images/yujo/post/5d439104-7aeb-444d-b899-1c70dc6d2df4/%EB%B2%84%EB%B8%94%EC%A0%95%EB%A0%AC%20%EC%84%A4%EB%AA%85%20%EC%A7%A4.gif)
- **시간 복잡도**
  - 최선의 경우 : O(N^2)
  - 최악의 경우 : O(N^2)
  - 평균 : O(N^2)
- **장점**
  - 구현이 매우 간단하다.
- **단점**
  - 최선, 최악의 경우 시간복잡도가 모두 O(N^2)이므로 매우 비효율적이다.

___

### 버블 정렬 코드

```javascript
let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];

console.log(nums); // 정렬 되기 전
> [1, 3, 5, 6, 2, 0, 8, 9, 7, 4]

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j + 1] < arr[j]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

bubbleSort(nums); // 정렬 시행
console.log(nums); // 정렬 후
> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

___

### 선택 정렬

- **선택 정렬**
  - **1회전을 수행할 때마다 가장 작은 값이 배열의 맨 앞에 오게 된다.**
  - 정렬할 목록 전체를 반복하며 해당 인덱스의 값이 인접한 값과 스왑이 가능한 경우 스왑한다.
  - 더 이상 스왑이 필요하지 않을 때까지 반복된다.
    ![](https://images.velog.io/images/yujo/post/dffa5b3a-e1bc-4979-98c2-43508de2a1dd/%EC%84%A0%ED%83%9D%EC%A0%95%EB%A0%AC%20%EC%84%A4%EB%AA%85%20%EC%A7%A4.gif)
- **시간 복잡도**
  - 최선의 경우 : O(N^2)
  - 최악의 경우 : O(N^2)
  - 평균 : O(N^2)
- **장점**
  - 실행 전 자료의 이동 횟수를 알 수 있다.
  - 보조 메모리가 제한도니 경우 복잡한 알고리즘에 비해 성능적인 이점을 낼 수 있다.
- **단점**
  - 보통의 경우 O(N^2)의 시간 복잡도로 비효율적인 정렬 방식이다.
  - 배열 내에 동일한 값이 중복해 있다면 상대적인 위치가 변경될 수 있다.

___

### 선택 정렬 코드

```javascript
let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];
console.log(nums);
> [ 1, 3, 5, 6, 2, 0, 8, 9, 7, 4 ]

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}

selectionSort(nums); // 정렬 시행
console.log(nums); // 정렬 후
> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]\
```

___

### 삽입 정렬

- **삽입 정렬**
  - **한 번에 한 항목 씩 정렬 된 배열을 작성한다**.
  - 1회전을 수행할 때마다 인덱스가 증가하며 해당 인덱스까지 요소들의 정렬이 끝난다.
    ![](https://images.velog.io/images/yujo/post/d81d42aa-08ed-40f5-a3da-d279f882436a/%EC%82%BD%EC%9E%85%EC%A0%95%EB%A0%AC%20%EC%84%A4%EB%AA%85%20%EC%A7%A4.gif)
- **시간 복잡도**
  - 최선의 경우 : O(N)
  - 최악의 경우 : O(N^2)
  - 평균 : O(N^2)
- **장점**
  - 안정적인 정렬 알고리즘이다.
  - 배열이 대부분 정렬되어 있는 경우에 매우 효율적이다
- **단점**
  - 배열 안의 요소들의 이동 수가 많다.
  - 배열의 크기가 큰 경우 시간이 오래 걸린다.

___

### 삽입 정렬 코드

```javascript
let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];

function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    index = i;
    while (arr[index] !== undefined && arr[index - 1] > arr[index]) {
      let temp = arr[index - 1];
      arr[index - 1] = arr[index];
      arr[index] = temp;
      index--;
    }
  }
}

insertionSort(nums);
console.log(nums);
> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

___

### 퀵 정렬

- **퀵 정렬**
  - **퀵 정렬은 분할 정복 알고리즘이다**.
  - 큰 배열을 두개의 작은 배열로 나눈 뒤 하위 배열들을 재귀적으로 정렬한다.
    ![](https://images.velog.io/images/yujo/post/751c5ce4-a982-411e-a4cd-f40f36ee2db4/%ED%80%B5%EC%86%8C%ED%8A%B82.gif)
- **시간 복잡도**
  - 최선의 경우 : O(n log(n))	
  - 최악의 경우 : O(N^2)
  - 평균 : O(n log(n))
- **장점**
  - 속도가 빠르다. 시간복잡도가 O(n log(n))인 다른 정렬 알고리즘과 비교해도 속도가 빠르다.
  - 배열이 대부분 정렬되어 있는 경우에 매우 효율적이다
- **단점**
  - 정렬된 리스트에 대해서는 오히려 시간이 많이 걸릴 수 있다.

___

### 퀵 정렬 코드

```javascript
let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];

function partition(arr, left, right) {
  let pivot = arr[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(arr, left, right) {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right);
    if (left < index - 1) {
      quickSort(arr, left, index - 1);
    }
    if (index < right) {
      quickSort(arr, index, right);
    }
  }

  return arr;
}

quickSort(nums, 0, nums.length - 1);
console.log(nums);
> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

___

### 힙 정렬

- **힙 정렬**
  - **힙 정렬은 비교 기반(comparison-based) 정렬 알고리즘이다**.
  - 힙 정렬은 선택 정렬을 개선한 것으로 생각할 수 있다.
  - 선택 정렬 알고리즘과 마찬가지로 정렬 된 영역과 정렬되지 않은 영역을 나누고 가장 큰 요소를 추출하여 정렬 된 영역으로 이동시킨다.
  - 선택 정렬보다 개선된 점은 선형 시간이 소요되는 선택 정렬의 탐색과 달리 힙 데이터 구조를 사용하여 최대값을 찾는 점이다. 
  - 따라서 선택 정렬 대비 시행 속도가 훨씬 빠르다.
    - 선택 정렬 시간 복잡도 평균 : O(N^2)
    - 힙 정렬 시간 복잡도 평균 : O(n log(n))

![](https://images.velog.io/images/yujo/post/682c46d8-ab0a-4df6-b861-d1e821c1cda9/%ED%9E%99%EC%86%8C%ED%8A%B82.gif)

- **시간 복잡도**
  - 최선의 경우 : O(n log(n))	
  - 최악의 경우 : O(n log(n))
  - 평균 : O(n log(n))
- **장점**
  - 속도가 빠르다. 최악의 경우에도 O(n log(n))의 시간 복잡도를 보장한다.
  - 추가적인 메모리를 필요로 하지 않는다.
- **단점**
  - 안정성을 보장받지 못한다.
  - 데이터의 상태에 따라 다른 정렬법보다 느릴 수 있다.

___

### 힙 정렬 코드

```javascript
let arrLen;

function swap(input, i, j) {
  let temp = input[i];
  input[i] = input[j];
  input[j] = temp;
}

function heapRoot(input, i) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;

  if (left < arrLen && input[left] > input[max]) {
    max = left;
  }

  if (right < arrLen && input[right] > input[max]) {
    max = right;
  }

  if (max != i) {
    swap(input, i, max);
    heapRoot(input, max);
  }
}

function heapSort(input) {
  arrLen = input.length;

  for (let i = Math.floor(arrLen / 2); i >= 0; i--) {
    heapRoot(input, i);
  }

  for (let i = input.length - 1; i > 0; i--) {
    swap(input, 0, i);
    arrLen--;

    heapRoot(input, 0);
  }
}

let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];

heapSort(nums); // 힙 정렬 시행
console.log(nums);
> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

___

### 병합 정렬

- **병합 정렬**
  - **병합 정렬은 효율적이고 범용적인 비교 기반(comparison-based) 정렬 알고리즘이다**.
  - 1945년 John von Neumann이 발명한 분할 정복 알고리즘이다.
  - 재귀적으로 배열을 나눈뒤 배열을 합치면서 정렬한다.

![](https://images.velog.io/images/yujo/post/3050bb0f-549c-4546-b037-4e18a9b9bfe6/%EB%A8%B8%EC%A7%80%EC%86%8C%ED%8A%B8.gif)

- **시간 복잡도**
  - 최선의 경우 : O(n log(n))	
  - 최악의 경우 : O(n log(n))
  - 평균 : O(n log(n))
- **장점**
  - 추가적인 공간을 사용함으로써 같은 값을 갖는 원소의 상대적인 수서를 유지할 수 있다.
- **단점**
  - 추가적인 공간(메모리)가 반드시 할당되야 한다.
  - 최악의 경우 퀵 정렬에 비해 성능이 떨어지며 힙 정렬보다 느린 경우도 있다.

___

### 병합 정렬 코드

```javascript
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle, arr.length);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }

  return result;
}

let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];

console.log(mergeSort(nums));
> [
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
  ]
```

___

### 쉘 정렬

- **쉘 정렬**
  - **쉘 정렬은 전체 비교정렬이다**.
  - 쉘 정렬은 삽입 정렬을 개선한 정렬이다.
  - 서로 멀리 떨어진 요소를 정렬한 다음 비교할 요소 사이의 간격을 점진적으로 줄인다.
    ![](https://images.velog.io/images/yujo/post/ce87a119-a8aa-4583-af08-b61ddb05d71f/%EC%89%98%EC%86%8C%ED%8A%B8.gif)
- **시간 복잡도**
  - 최선의 경우 : O(n)	
  - 최악의 경우 : O(n^2)
  - 평균 : O(n^1.5)
- **장점**
  - 멀리 떨어져 있는 자료를 교환하기 때문에 입력자료에 민감하지 않다.
- **단점**
  - 간격(gap)을 잘못 설정하면 성능이 O(n^2)으로 악화된다.

___

### 쉘 정렬 코드

```javascript
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);

  while (gap > 0) {
    for (let i = 0; i < arr.length - gap; i++) {
      let currentIndex = i;
      let gapShiftedIndex = i + gap;

      while (currentIndex >= 0) {
        if (arr[gapShiftedIndex] <= arr[currentIndex]) {
          const temp = arr[currentIndex];
          arr[currentIndex] = arr[gapShiftedIndex];
          arr[gapShiftedIndex] = temp;
        }

        gapShiftedIndex = currentIndex;
        currentIndex -= gap;
      }
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}

let nums = [1, 3, 5, 6, 2, 0, 8, 9, 7, 4];
shellSort(nums);

console.log(nums);
> [
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
  ]
```

___

