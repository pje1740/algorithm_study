### Javascript 재귀 함수
- 재귀 함수는 탈출 조건을 만족할 때까지 스스로를 호출하는 함수입니다.
- 다음은 재귀 함수의 기본적인 형태입니다.
```javascript
function recursive(n) {
  if (n < 0) {
    return console.log("end");
  }

  console.log(n--);
  recursive(n);
}

recursive(5);
//output
> 5
> 4
> 3
> 2
> 1
> 0
> end
```
- 위 함수를 보다시피 탈출조건인 ```n < 0```을 만족하기 전까지 계속 함수 안으로 들어가면서 숫자를 하나씩 출력해줍니다.
- 재귀 함수를 작성할 때는 반드시 탈출 조건이 필요합니다.
- 만일 위 함수를 아래와 같이 바꾸면
```javascript
function recursive(n) {
  //   if (n < 0) {
  //     return console.log("end");
  //   }

  console.log(n--);
  recursive(n);
}

recursive(5);
```
- ```RangeError: Maximum call stack size exceeded``` 이런 오류 메세지를 볼 수 있습니다. 재귀함수를 실행하게 되면 이전에 실행된 함수가 아래처럼 스택에 쌓이게 됩니다.
![](https://images.velog.io/images/yujo/post/cdb06cea-17cf-4532-8447-8c4270e0e7c9/image.png)
- 하지만 스택의 공간은 무한하지 않습니다.  ```RangeError: Maximum call stack size exceeded``` 이런 오류는 스택에 할당된 공간보다 많은 공간을 사용해서 생기는 오류입니다.
- 탈출 조건이 정의되지 않은 채 재귀 함수를 실행하게 되면 함수가 무한정 실행되면서 실행횟수만큼 스택에 쌓여 결국 스택의 공간을 초과해 버릴만큼 쌓이게 됩니다.
- 때문에 재귀함수를 사용하실 때는 반드시 탈출(종결) 조건을 적으셔야 합니다.
___
### 재귀 함수를 활용한 문제
####
- 난이도 Easy
  - [문제 링크 : Leetcode #326 power of Three](https://leetcode.com/problems/power-of-three/) / [문제 풀이](https://velog.io/@yujo/JSLeetcode-326-Power-of-Three)
  - [문제 링크: Leetcode #258 Add Digits](https://leetcode.com/problems/add-digits/) / [문제 풀이](https://velog.io/@yujo/JSLeetcode-258-Add-Digits)
  - [문제 링크 Leetcode #1137 N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number/) / [문제풀이](https://velog.io/@yujo/JSLeetcode-1137-N-th-Tribonacci-Number)
- 난이도 Midium
  - [문제 링크 Leetcode #779 K-th Symbol in Grammar](https://leetcode.com/problems/k-th-symbol-in-grammar/) / [문제풀이](https://velog.io/@yujo/JSLeetcode-779-K-th-Symbol-in-Grammar)