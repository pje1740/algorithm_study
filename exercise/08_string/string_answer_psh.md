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



# 단어 압축

```java
package string_compress_jyl;

import java.util.*;
public class Solution {
    public int solution(String s) {
    	int group = 1;
    	int len = s.length();
    	
    	while (group <= s.length() / 2) {
    		int count = 1;
    		boolean found_new_group = false;
    		String part = s.substring(0, group);
    		int sum = s.length();
    		for (int i = 0; i < s.length(); i += group) {
    			if (i + group * 2 > s.length()) {
    				if (count > 1)
    					sum += Integer.toString(count).length();
    				break;
    			}
    			String next = s.substring(i + group, i + group * 2);
    			if (part.equals(next)) {
    				sum -= group;
    				if (found_new_group == false) {
    					count++;
    					found_new_group = true;
    				}
    				else {
    					count++;
    				}
    			}
    			else {
    				part = next;
    				if (count > 1)
    					sum += Integer.toString(count).length();
    				found_new_group = false;
    				count = 1;
    			}
    		}
    		len = Math.min(len, sum);
    		group++;
    	}
    	
    	return len;    	
    }
    
    public static void main(String[] args) {
    	String s = "abcabcdede";
		System.out.println(new Solution().solution(s));
	}
}
```



# 모음

```java
package string_vowels_yhj;
import java.util.*;

public class Solution {
    public int maxVowels(String s, int k) {
        int[] cpy = new int[s.length()];
        int[] count = new int[s.length()];
        String vowels = "aeiou";
    	
        for (int i = 0; i < s.length(); i++) {
        	if (vowels.indexOf(s.charAt(i)) != -1)
        		cpy[i] = 1;
        }
    	
        int sum = 0;
    	for (int i = 0; i < cpy.length; i++) {
    		if (i - k < 0) {
    			sum += cpy[i];
    			if (i == k - 1)
    				count[i] = sum;
    			continue;
    		}
    		sum  = sum + cpy[i] - cpy[i - k];
    		count[i] = sum;
    	}
    	  	
    	return Arrays.stream(count).max().getAsInt();
    }
    
    public static void main(String[] args) {
    	String s = "tryhard";
    	int k = 4;
    	
    	System.out.println(new Solution().maxVowels(s, k));
	}
}
```

