# 정렬: Sort Colors

https://leetcode.com/problems/sort-colors/

**그냥 풀면 꽤 간단하기 때문에, 원패스 알고리즘을 적용해서 풀어볼 것!**

Given an array with *n* objects colored red, white or blue, sort them **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

**Note:** You are not suppose to use the library's sort function for this problem.

**Example:**

```
Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

**Follow up:**

- A rather straight forward solution is a two-pass algorithm using counting sort.
  First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
- **Could you come up with a one-pass algorithm using only constant space?**



### one-pass algorithm?

https://stackoverflow.com/questions/46304035/what-is-a-one-pass-algorithm-and-is-mine-one

원패스 알고리즘이라고 하면 배열을 한번만 훑음으로써 원하는 바를 완수하는 것을 의미한다. for loop이 대표적인 원패스 행위라고 볼 수 있다. 시간 복잡도로 따진다면 O(n)이고 공간도 n 이상 필요로하지 않아야 한다. 

위에서 카운팅 기법을 쓰게 되면 원래 배열을 한번 훑고, 카운트가 정리된 배열을 또 참고하게 되기 때문에 투패스 알고리즘으로 지칭하고 있다.