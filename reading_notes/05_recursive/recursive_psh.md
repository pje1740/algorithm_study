# 05 재귀 알고리즘

## 05-1 재귀의 기본

#### 재귀

어떤 사건이 자기 자신을 포함하고 다시 자기 자신을 사용하여 정의될 때 재귀적이라고 한다. 

#### 팩토리얼 구하기

```java
import java.util.*;

public class Factorial {
	static int factorial(int n) {
		if (n > 0)
			return n * factorial(n - 1);
		else
			return 1;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("정수를 입력하세요: ");
		int x = stdIn.nextInt();
		
		System.out.println(x + "의 팩토리얼은 " + factorial(x) + "입니다.");
	}
}
```



#### 직접 재귀와 간접 재귀

- 직접 재귀: 자신과 같은 메서드를 호출하는 것.
- 간접 재귀: 다른 메서드에 재귀 메서드가 정의되어있고, 재귀 메서드 안에서는 다른 메서드만을 호출하는 것. 예를 들면, a라는 메서드가 있고, b 라는 메서드에서 a를 호출한다고 했을 때, a에서 b를 호출하는 경우를 의미한다. 



#### 유클리드 호제법

두 정수의 최대공약수를 구하는 것으로, 이 또한 재귀적으로 풀 수 있다. 간단한 원리는, 두 정수를 길이로 하는 직사각형을 만들고,  짧은 변을 기준으로 하는 정사각형을 채운다. 이러면 남는 부분이 생길 텐데, 여기서 또 같은 과정을 반복하다보면 정사각형만으로 남는 부분 없이 구성되는 순간이 있다. 이 때 정사각형의 한 변 길이가 최대공약수라고 한다. 

```java
static int gcd(int x, int y) {
  if (y == 0)
    return x;
  else
    return gcd(y, x % y);
}
```



## 05-2 재귀 알고리즘 분석

재귀 알고리즘은 하향식과 상향식 분석이 있다고 한다. 다음과 같은 함수를 이 두 가지 방식으로 접근해보자.

```java
static void recur(int n) {
  if (n > 0) {
    recur(n - 1);
    System.out.println(n);
    recur(n - 2);
  }
}
```

n = 4 일 때, 결과는 1, 2, 3, 1, 4, 1, 2

하향식 접근을 한다면 4를 대입해서 순차적으로 어떤 순서를 따라야하는지 트리를 그려보는 형식이다. 상향식으로 접근한다면 n이 4일때에서 시작하는 것이 아니라, n이 0보다 크면 되기 때문에 1일 때부터 어떤 식으로 동작하는지 차근차근 올라가보는 방식이다. 

#### 재귀 알고리즘의 비재귀적 표현

**꼬리 재귀의 제거**

위의 함수에서 recur(n - 2) 부분은 n을 n - 2로 업데이트하고 다시 함수를 호출하는 방식으로 제거해줄 수 있다. 

```java
static void recur(int n) {
  while (n > 0) {
    recur(n - 1);
    System.out.println(n);
    n = n - 2;
  }
}
```



## 05-3 하노이의 탑

작은 원반이 위에, 큰 원반이 아래에 위치할 수 있도록 원반을 3개의 기둥 사이에서 옮기는 문제. 모든 원반은 크기가 다르고 처음에는 모든 원반이 규칙에 맞게 첫번째 기둥에 쌓여 있다. 이 상태에서 모든 원반을 세 번째 기둥으로 최소의 횟수로 옮기면 된다. 원반은 1개씩만 옮길 수 있고, 큰 원반을 작은 원반 위에 쌓을 수 없다. 

```java
import java.util.*;

public class Hanoi {
	static void move(int n, int x, int y) {
		if (n > 1)
			move(n - 1, x, 6 - x - y);
		
		System.out.println("원반[" + n + "]을 " + x + "기둥에서 " + y + "기둥으로 옮김");
		
		if (n > 1)
			move(n - 1, 6 - x - y, y);
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("하노이의 탑");
		System.out.print("원반 개수 : ");
		int n = stdIn.nextInt();
		
		move(n, 1, 3);
	}
}
```

- 6에서 빼는 이유는, 기둥 1, 2, 3의 합산이 6이기 때문에, 시작 기둥 번호 + 목표 기둥 번호를 6에서 빼면 중간 기둥의 번호가 나오기 때문.



## 05-4 8퀸 문제

8 x 8 체스판에 8개 퀸이 서로 공격할 수 없도록 배치하는 방법의 가지 수 구하기. 

```java
package chap05;

public class EightQueen {
	static int[] pos = new int[8];
	static int count = 0;
	
	static void print() {
		for (int i = 0; i < 8; i++)
			System.out.printf("%2d", pos[i]);
		System.out.println();
	}
	
	static void set(int current_col) {
		//j = 현재 열에 몇번째 행에 위치할것인지. 
		for (int j = 0; j < 8; j++) {
			int k = 0;
			// 0번 열부터 현재 재귀를 통해 진입한 열까지 체크하는 횟수와 관련된 루프문. 
			// j가 앞에 모든 열에 배치된 행과 비교해서 문제가 없어야만 배열에 배치할 수 있다. 
			for (; k < current_col; k++) {
				// 대각선, 동일선상이 아닌지 체크
				if (j != pos[k] && (Math.abs(pos[k] - j) != Math.abs(k - current_col)))
					;
				else
					break;
				
			}
			if (k == current_col) {
				if (current_col == 7) {
					print();
					count++;
				}
				else {
					pos[current_col] = j;
					set(current_col + 1);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		set(0);
		System.out.println(count);
	}
}
```



























