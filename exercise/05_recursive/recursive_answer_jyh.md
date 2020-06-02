### 문제접근
- 3의 거듭제곱 수인지를 확인하는 문제이므로 바로 ```input % 3```으로 판별했을 경우에는 판별이 불가능하다고 생각했습니다.
- 재귀 함수를 통해 3으로 계속 나눠 판별 가능한 숫자까지 나눠졌을 때 값을 반환했습니다.
___
### 코드
```javascript
/**
 * @param {number} n
 * @return {boolean}
 */

function checkPower(n) {
  if (n <= 3) {
    if (n !== 1 && n != 3) return false;
    else return true;
  }

  return checkPower(n / 3);
}

var isPowerOfThree = function (n) {
  if (n <= 0) return false;
  return checkPower(n);
};

/// Test Code
console.log(isPowerOfThree(27));
console.log(isPowerOfThree(0));
console.log(isPowerOfThree(9));
console.log(isPowerOfThree(45));
console.log(isPowerOfThree(-123456789));
console.log(isPowerOfThree(123456789));
```