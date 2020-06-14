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