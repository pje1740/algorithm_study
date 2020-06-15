# Word Subsets

```java
import java.util.*;

class Solution {
	public int[] count(String str) {
		int[] result = new int[26];
		for (int i = 0; i < str.length(); i++) {
			result[str.charAt(i) - 'a']++;
		}
		return result;
	}
	
    public List<String> wordSubsets(String[] A, String[] B) {
        List<String> result = new ArrayList<String>();
        int[] b_max = new int[26];
        
        // b의 문자열들 모두 합치기
        for (String b : B) {
        	int[] b_count = count(b);
        	for (int i = 0; i < 26; i++) {
        		b_max[i] = Math.max(b_max[i], b_count[i]);
        	}
        }
        
        for (String a : A) {
        	// 카운트할 배열 생성
        	int[] a_count = count(a);
        	boolean is_substr = true;
    		for (int i = 0; i < 26; i++) {
        		if (a_count[i] < b_max[i]) {
        			is_substr = false;
        			break;
        		}
    		}
    		if (is_substr == false)
    			continue;
    		else if (is_substr == true)
    			result.add(a);
        }
        return result;
    }
}
```

- 시간 효율성도 테스트 하는데, 내 경우에는 매번 b를 새로 카운트하는 바람에 시간이 오버됐다. b의 스트링들을 미리 합쳐서 카운트한 정렬을 하나 놔두고 그거와 a만 비교하면 된다. 



# 백준: 찾기

https://www.acmicpc.net/problem/1786

```java
package string_search_kmp;

import java.util.*;

public class Main {
	static int kmpMatch(String txt, String pat, List<Integer> idxs) {
		int count = 0;
		int pt = 1;
		int pp = 0;
		int[] skip = new int[pat.length() + 1];
		
		skip[pt] = 0;
		while (pt != pat.length()) {
			if (pat.charAt(pt) == pat.charAt(pp))
				skip[++pt] = ++pp;
			else if (pp == 0)
				skip[++pt] = pp;
			else
				pp = skip[pp];
		}
		
		pt = pp = 0;
		while (pt != txt.length() && pp != pat.length()) {
			if (txt.charAt(pt) == pat.charAt(pp)) {
				if (pp == pat.length() - 1) {
					count++;
					idxs.add(pt - pp + 1);
//					왜 되지...?
					pp = skip[pp];
					continue;
				}
				pt++;
				pp++;
			}
			else if (pp == 0)
				pt++;
			else
				pp = skip[pp];
		}
		return count;
	}
	
	public static void main(String[] args) {
		Scanner stdin = new Scanner(System.in);
		String T = stdin.nextLine();
		String P = stdin.nextLine();
		stdin.close();
		List<Integer> idxs = new ArrayList<Integer>();
		
		int count = kmpMatch(T, P, idxs);
		System.out.println(count);
		idxs.forEach((i) -> System.out.println(i));
	}
}

```

- 뭔가 답은 맞는듯한데 메모리초과가 뜨는 코드. 그리고 보이어 무어보다 kmp가 이해가 더 안 가는 상태. 

```
banana banana
ana
```

처음에 생각 못했던 케이스. 정확히는, 생각은 했는데, 중복은 스킵한다고 생각했음. 여기서 ana는 4번 나온다고 카운트하는 것이 맞다. 