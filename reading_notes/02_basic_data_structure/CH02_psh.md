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

#### 확장 for 문

```java
for (int i : a)
	sum += i;
```

어떤 배열을 for 문에 넣고 돌리는 경우, 이런 식으로 간편하게 적을 수 있다. 타입과 배열, 배열의 요소를 대신할 변수명을 지정하고 쓸 수 있다. 장점은 배열의 요소 수를 조사할 필요가 없다는 것과, iterator 같은 방법으로 스캔할 수 있다는 점입니다. 

## 02-2 클래스

임의의 데이터형을 자유로이 조합하여 만들 수 있는 자료구조

```java
class XYZ {
	int x;
	long y;
	double z;
}
```

**클래스 본체와 멤버**

1. 클래스 본체에서는 다음과 같은 내용을 선언할 수 있습니다. 
   - 멤버 (필드, 메서드, 중첩 클래스, 중첩 인터페이스)
   - 클래스 초기화, 인스턴스 초기화
   - 생성자
2. 필드/메서드/생성자를 선언할 때 public/protected/private을 지정할 수 있다.
3. 메서드/생성자는 다중으로 정의할 수 있다. (오버로드)
4. final로 선언한 필드는 한 번만 값을 대입할 수 있다.
5. 생성자는 새로 생성한 인스턴스의 초기화를 위해 사용된다. 

**공개 클래스**

클래스 접근제한자가 public이며, 다른 패키지에서 사용할 수 있는 공개 클래스이다. 

**final 클래스**

클래스 접근제한가 final이며, 서브 클래스를 가질 수 없다 (새로운 클래스를 상속할 수 없다).

**파생 클래스**

extends를 통해 생성된 클래스. extends한 클래스의 직접 서브 클래스(direct subclass)가 된다. 기본적으로 모든 참조형 데이터 타입은 별도로 상속 받는 것을 지정하지 않으면 Object클래스의 자식 클래스이다. 

인터페이스의 경우 extends 대신 implements를 사용한다. 

**추상 클래스**

접근제한자가 abstract로, 이름이 없는 클래스라고 생각할 수 있다. 이름이 없기 때문에 인스턴스를 만들 수 없다. 

**중첩 클래스**

클래스 또는 인터페이스 안에 선언한 클래스. 

- 멤버 클래스(member class)는 그 선언이 다른 클래스 또는 인터페이스 선언에 둘러싸인 클래스
- 내부 클래스(inner class)는 static이 아닌 중첩 클래스. 정적 초기화, 멤버 인터페이스 선언 불가. 상수 필드가 아닌 정적 멤버를 선언할 수 없음. (static이 아닌 클래스 안에 static 멤버나 메서드는 당연히 선언할 수 없기 때문?)
- 지역 클래스(local class)는 이름이 주어진 중첩 클래스인 내부 클래스. 어떤 클래스의 멤버도 될 수 없다. 









 

















































