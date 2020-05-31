##  ⏰ 05 재귀 알고리즘

> 자신을 정의할 때 자기 자신을 재참조하는 알고리즘.

- "메서드 자신"을 호출하는 것보다는 "자기 자신과 똑같은 메서드"를 호출한다고 이해하면 더 자연스럽다.



### 재귀 방법

- 직접 재귀 : 자신과 같은 메서드를 호출
- 간접 재귀 : 메서드 a가 메서드 b를 호출하고, 다시 메서드 b가 메서드 a를 호출하는 식.



### 재귀 알고리즘 예시

#### 팩토리얼 구하기

#### 조건

1. 0이면 = 1
2. n > 0 이면  n * ( n-1 )

#### 코드

```javascript
function factorial(n) {
	if (n > 0)
		return n * factorial(n-1);
	else
		return 1;
}
console.log(factorial(5));
// 120
```



#### 유클리드 호제법 : 최대공약수 구하기

#### 조건

z = gcd(x, y)인 경우

1. y가 0이면 x
2. 아니라면 gcd(y, x % y)

#### 코드

```javascript
function gcd(x, y) {
	if (y == 0)
		return x;
	else
		return gcd(y, x % y);
}
console.log(gcd(8, 22));
// 매개변수를 22, 8해도 결과는 같다.
```



### 재귀 알고리즘 분석

#### 하향식 분석

가장 위쪽에 위치한 상자의 메서드 호출부터 시작해 계단식으로 자세히 조사하는 분석 기법

recur(4) -> requr(3) -> requr(2) -> requr(1) 

#### 상향식 분석

하향식 분석과 달리 아래쪽부터 쌓아 올리며 분석하는 방법

recur(1) -> requr(2) -> requr(3) -> requr(4) 



### 재귀 알고리즘의 비재귀적 표현

#### 재귀함수

```javascript
function requr(n) {
	if (n > 0) {
		requr(n - 1);
		console.log(n);
		requr(n - 2);
	}
}
console.log(requr(4));
```

#### 꼬리 재귀의 제거

```javascript
function requr(n) {
	while (n > 0) {
		requr(n - 1);
		console.log(n);
		n = n - 2;
	}
}
console.log(requr(4));
```

#### 재귀의 제거

```javascript
function requr(n) {
	stack = [];

	while(true) {
		if (n > 0) {
			stack.push(n);
			n = n - 1;
			continue;
		}
		if (stack.length) {
			n = stack.pop();
			console.log(n);
			n = n - 2;
			continue;
		}
		break;
	}
}
console.log(requr(4));
```

