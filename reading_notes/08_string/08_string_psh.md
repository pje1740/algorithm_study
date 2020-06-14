# CH08 문자열 검색

## 08-1 브루트-포스법

#### 문자열 검색이란

어떤 문자열 안에 다른 문자열이 들어 있는지 조사하고 들어 있다면 그 위치를 찾아내는 것. 

### 브루트-포스법

브루트-포스는 선형검색을 활용한 문자열 탐색이다. 인덱스를 순차적으로 이동하면서 검색하고자 하는 문자열과 일일이 대조해보고, 없으면 한 칸 뒤로 이동하는 식이다. 

### KMP 법

브루트-포스와는 다르게 중간 검사 결과를 활용하는 알고리즘이다. 일치하던 부분까지를 기억하고 다음 탐색 때 해당 위치부터만 다시 시작해서 불필요한 과정을 줄이는 것이다. 

찾으려는 문자열이 모든 문자가 유니크할 수도 있지만, 겹치는 부분이 있을 수 있다. 그렇다면 탐색하다 끊겼을 때, 이 중복되는 문자열 부분부터 다시 탐색한다면 앞부분의 불필요한 과정을 줄일 수 있다. 이를 위해, 문자열을 하나 복사해두고 비교하면서 중복되는 시작점을 찾으면 1, 2 값을 지정해두고 후에 참고한다고 한다. 

```java
static int kmpMatch(String txt, String pat) {
  int pt = 1; // txt 커서
  int pp = 0; // pat 커서
  int[] skip = new int[pat.length() + 1]; // 건너뛰기 표
  
  // 건너뛰기 표 생성
  skip[pt] = 0;
  while (pt != pat.length()) {
   	if (pat.charAt(pt) == pat.charAt(pp))
    	skip[++pt] = ++pp;
    else if (pp == 0)
      skip[++pt] = pp;
    else
      pp = skip[pp];
  }
  
  // 검색
  pt = pp = 0;
  while (pt != txt.length() && pp != pat.length()) {
    if (txt.charAt(pt) == pat.charAt(pp)) {
      pt++;
      pp++;
    }
    else if (pp == 0)
      pt++;
    else
      pp = skip[pp];
  }
  
  if (pp == pat.length())
    return pt - pp;
  return -1;
}
```



KMP의 경우 보이어-무어에 비해 효율이 떨어져서 사실상 잘 사용되지는 않는다고 한다. 



## 08-3 Boyer-Moore 법

보이어-무어 알고리즘은 패턴의 마지막 문자부터 앞쪽으로 검사를 진행하면서 일치하지 않는 문자가 있으면 미리 준비한 표에 따라 패턴을 옮길 크기를 정한다. 

보이어-무어법의 포인트는 탐색은 앞에서부터 하되, 대조는 뒤에서부터 하는 것이다. 또, 매칭되지 않는 경우 kmp처럼 스킵을 하게 되는데, 이 스킵 방식은 대조 중인 문자가 패턴이 있는지 없는지 여부에 따라서 결정된다. 

**패턴에 들어 있지 않는 문자를 만난 경우**

1. 패턴을 옮길 크기는 패턴의 크기인 n. 앞을 쭉 탐색해봐도 당연히 매칭이 되지 않을 테니 덩어리째 뒤로 옮긴다. 

**패턴에 들어 있는 문자를 만난 경우**

1. 마지막에 나오는 위치의 인덱스가 k이면 패턴을 옮길 크기는 n-k-1. 
2. 같은 문자가 패턴 안에 중복해서 들어 있지 않다면 패턴을 옮길 크기는 n.



```java
static int bmMatch(String txt, String pat) {
  int pt;  // txt 커서
  int pp;  // pat 커서
  int txtLen = txt.length();
  int patLen = pat.length();
  int[] skip = new int[Character.MAX_VALUE + 1];
  
  // 건너뛰기 표
  for (pt = 0; pt <= Character.MAX_VALUE; pt++)
    skip[pt] = patLen;
  for (pt = 0; pt < patLen - 1; pt++)
    skip[pat.charAt(pt)] = patLen - pt - 1;
  
  // 검색
  while (pt < txtLen) {
    pp = patLen - 1;
    
    while (txt.charAt(pt) == pat.charAt(pp)) {
      if (pp == 0)
        return pt;
      pp--;
      pt--;
    }
    pt += (skip[txt.charAt(pt)] > patLen - pp) ? skip[txt.charAt(pt)] : patLen - pp;
  }
  return -1;  // 검색 실패
}
```

- Character.MAX_VALUE 는 65535다. 65535 길이의 배열이 생성되는 셈.



















