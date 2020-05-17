# CH01 기본 알고리즘

## 01-1 알고리즘이란?

**순차적 구조**

여러 문장이 순차적으로 실행되는 구조

**선택 구조**

()안에 있는 식의 평가 결과에 따라 프로그램의 실행 흐름을 변경하는 if문

#### 키보드로 숫자와 문자열 입력하기

```java
import java.util.Scanner;
class A {
  public static void main(String[] args) {
    Scanner stdIn = new Scanner(System.in);
    int numb = stdIn.nextInt();
  }
}
```

다른 자료형도 각자에 해당하는 함수로 받아올 수 있다. 

#### 알고리즘

문제를 해결하기 위한 것으로, 명확하게 정의되고 순서가 있는 유한 개의 규칙으로 이루어진 집합

## 01-2 반복

**do ~ while**

루프 본문을 한 번 실행한 다음에 계속 반복할 것인지를 판단하는 사후 판단 반복문

```java
do {
  System.out.print("something");
  n++;
} while (n <= 0);
```

**구조적 프로그래밍**

하나의 입구와 하나의 출구를 가진 구성 요소만을 계층적으로 배치하여 프로그램을 구성하는 방법. 순차, 선택, 반복이라는 3종류의 제어 흐름을 사용.

**논리 연산자의 단축 평가**

&& 같은 연산자는 양 쪽 다 true일 때만 true가 되기 때문에, 왼쪽의 조건이 false라면 뒤의 조건은 스킵하게 된다. 이런 식으로 논리 연산의 식 전체를 평가한 결과가 왼쪽 피연산자의 평가 결과만으로 정확해지는 경우 오른쪽 피연산자의 평가를 수행하지 않는데, 이것이 단축평가(short circuit evaluation)이다.

**드모르간의 법칙**

```
x && y == !(!x || !y)
x || y == !(!x && !y)
```

# CH02 기본 자료구조

## 02-1 배열

#### 자료구조

데이터 단위와 데이터 자체 사이의 물리적 또는 논리적 관계. 쉽게 말해 자료를 효율적으로 이용할 수 있도록 컴퓨터에 저장하는 방법

**배열**

배열은 같은 자료형의 변수로 이루어진 구성 요소가 모인 것.

**기본값**

배열의 구성 요소는 자동으로 0으로 초기화되는 규칙이 있다. 이는 클래스의 필드도 마찬가지. 그러나 메서드 안에서 선언한 지역 변수는 초깃값으로 초기화되지 않으니 주의가 필요하다. 

**배열 초기화**

```
int[] a = {1, 2, 3, 4, 5}
int[] a = new int[] {1, 2, 3, 4, 5}
```

**배열 복제**

```java
array_name.clone();
```

**주사(traverse)**

배열의 요소를 하나씩 차례로 살펴보는 과정을 알고리즘 용어로 주사라고 한다. 즉, 스캐닝을 의미한다. 

#### 접근 제한자

**제한자 종류**

1. public: 모든 접근 허용
2. protected: 같은 패키지(폴더)의 객체, 상속 관계 객체 허용
3. default: 같은 패키지(폴더)의 객체 허용
4. private: 현재의 객체 안에서만 허용

**접근 제한자 사용**

1. 클래스: public, default
2. 생성자: public, protected, default, private
3. 멤버 변수: public, protected, default, private
4. 멤버 메서드: public, protected, default, private
5. 지역 변수: 제한자 사용 불가

**난수**

```java
import java.util.Random;

Random rand = new Random();
rand.nextInt(90); // 0부터 89까지의 난수
```

난수를 생성하는 데 있어서는 seed가 필요한데, 이 수가 동일하다면 추출되는 난수도 항상 동일하다. 이를 방지하기 위해 보통 컴퓨터가 난수를 생성할 때는 늘 변화하고 있는 현재 시간을 seed로 사용한다. 

#### 연습문제: 배열 역순 정렬

```java
package chap02;
import java.util.Scanner;

public class ReverseArray {
	
	static void swap(int[] a, int i1, int i2) {
		int temp = a[i1];
		a[i1] = a[i2];
		a[i2] = temp;
	}
	
	static void print_array(int[] a) {
		for (int i = 0; i < a.length; i++) {
			System.out.print(a[i]);
			if (i != a.length - 1) 
				System.out.print(" ");
			else
				System.out.print("\n");
		}
	}
	
	static void reverse_print(int[] a) {
		for (int i = 0; i < a.length / 2; i++) {
			print_array(a);
			System.out.println("a[" + i + "]과(와) a[" + (a.length - i - 1) + "]를 교환합니다");
			swap(a, i, a.length - i - 1);
		}
		print_array(a);
	}
	
	static int sumOf(int[] a) {
		int result = 0;
		for (int i = 0; i < a.length; i++) {
			result += a[i];
		}
		return result;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("요소 수 : ");
		int num = stdIn.nextInt();
		
		int[] a = new int[num];
		
		for (int i = 0; i < num; i++) {
			System.out.println("a[" + i + "] : ");
			a[i] = stdIn.nextInt();
		}
		
		reverse_print(a);
		
		System.out.println("역순 정렬을 마쳤습니다.");
		System.out.println("배열의 합은 " + sumOf(a) + "입니다.");
	}
}
```

**String 클래스**

문자열은 java.lang패키지 안에 소속되어있다. 스트링은 참조형 데이터 타입이다. 스트링 클래스가 제공하는 함수는 굉장히 많지만, 그 중 대표적인 것은 아래와 같다. 

```java
char charAt(int i);
int length(string);
boolean equals(String s); 
// String타입은 참조값을 가지고 있기 때문에 같은 문자열 리터럴을 가지고 있더라도 그냥 == 을 사용하면 참조값이 달라서 false가 나온다.  
```

#### 소수의 나열

1000까지의 모든 소수를 나열하는 문제가 있다고 할 때, 가장 단순한 접근 방법은 2부터 1000까지의 모든 수를 2부터 자신까지 나눠보는 방법이다. 해당 방법은 코드로 쓴다면 아래와 같다. 

```java
package chap02;

public class PrimeNumber1 {
	public static void main(String[] args) {
		for (int n = 2; n <= 1000; n++) {
			int i;
			for (i = 2; i < n; i++) {
				count++;
				if (n % i == 0)
					break;
			}
			if (n == i)
				System.out.println(n);
		}
	}
}

```

다만, 이렇게 하면 불필요한 연산을 계속 하게 된다. 예를 들어, 2로 나누어지지 않는 수는 당연히 4, 8 등으로 나눠지지 않고, 3으로 나누어지지 않는 숫자는 6, 9로도 나누어지지 않는다. 즉, 해당 숫자가 소수인지 판별하려면, 자신보다 작은 소수로 나누어지는지만 체크하면 된다. 

이 원리를 활용하여 알고리즘을 개선할 수 있다. 지금까지 발견한 모든 소수를 저장해두고 해당 배열의 요소로만 나누어보면 된다. 

```java
public class PrimeNumber2 {
	public static void main(String[] args) {
		int count = 0;
		int ptr = 0;
		int[] prime = new int[500];
		
		prime[ptr++] = 2;
		
		for (int n = 3; n <= 1000; n += 2) {
			int i;
			for (i = 1; i < ptr; i++) {
				count++;
				if (n % prime[i] == 0)
					break;
			}
			if (ptr == i)
				prime[ptr++] = n;
		}
		
		for (int i = 0; i < ptr; i++)
			System.out.println(prime[i]);
		
		System.out.println("number of division executed: " + count);
	}
}
```

여기서 더 개선해볼 수 있는 부분이 있다. n의 약수 개념으로 생각해보면 i가 제곱근을 넘어서는 순간, 이미 앞에서 나누어보았던 것과 몫과 제수만 뒤바뀌는 셈이다. 그렇다면 i를 제곱근보다 작은 수인 경우에만 나눗셈을 진행하면 된다. 

```java
public class PrimeNumber3 {
	public static void main(String[] args) {
		int count = 0;
		int ptr = 0;
		int[] prime = new int[500];
		
		prime[ptr++] = 2;
		prime[ptr++] = 3;
		
		for (int n = 5; n <= 1000; n += 2) {
			boolean is_not_prime = false;
			for (int i = 1; prime[i] * prime[i] <= n; i++) {
				count += 2 ;
				if (n % prime[i] == 0) {
					is_not_prime = true;
					break;					
				}
			}
			if (!is_not_prime) {
				prime[ptr++] = n;
				count++;
			}
		}
		
		for (int i = 0; i < ptr; i++)
			System.out.println(prime[i]);
		
		System.out.println("number of division executed: " + count);
	}
}
```

#### 다차원 배열

행과 열로 구성된 데이터를 다차원 배열로 생각할 수 있지만, 엄밀히 말하면 Java에는 다차원 배열이 없다. 대신 int형 2차원 배열을 기준으로 본다면, 아래와 같이 정의될 수 있다. 

"int형을 구성 자료형으로 하는 배열"을 구성 자료형으로 하는 배열

**다차원 배열의 복제**

다차원 배열의 복제는 최상위의 1레벨만 수행한다. 

```java
int[][] a = {{1, 2, 3, 4}, {5, 6, 7, 8}};
int[][] b = a.clone();
```

이게 어떤 의미인지는 a의 요소에 다른 값을 대입해본 뒤 배열 b의 요소를 출력해보면 알 수 있다. 복제본이라면 분명히 b의 요소는 변하지 않아야 하는데 a가 바뀌면 b도 바뀐다. 즉, 2차원 배열에서는 clone을 했을 때 배열의 요소까지 다 복사하는 것이 아니라 참조값만 복사되는 것이다. 











 

















































