# 재귀: 단어 변환

```java
package recursive_psh;

import java.util.*;

public class Solution {
	static int answer = 0;
	static String[] words_used = new String[50];
	
	// 한 글자만 다른지 체크하는 함수. true면 변환 가능한 단어. 
	public boolean is_changeable(String from_words, String current_word) {
		int count = 0;
		
		for(int i = 0; i < current_word.length(); i++) {
			if (from_words.charAt(i) != current_word.charAt(i))
				count++;
		}
		
		if (count == 1)
			return true;
		else
			return false;
	}
	
	// 이미 변환에 사용한 단어의 리스트들 중에 현재 변환 시도하려는 단어가 있는지 체크. 
	// 위의 함수와 함께 체크하여 둘 다 true가 반환되어야만 변환이 가능하다. 
	public boolean contains(String[] words_used, String word, int count) {
		for (int i = 0; i < count; i++) {
			if (words_used[i].equals(word))
				return true;
		}
		return false;
	}
	
	// 메인 재귀문. 탈출 조건은 변환된 단어가 target과 동일하거나, 모든 단어를 다 체크했는데 변환이 불가할 때. 
	public void find(String[] words, String begin, String target, int count) {
		if (begin.equals(target)) {
			if (answer == 0 || answer > count) {
				answer = count;
//				for (int k = 0; k < count; k++) {
//					System.out.printf("%s ", words_used[k]);
//				}
//				System.out.println();
			}
			return;
		}
		else if (count == words.length) {
			answer = 0;
			return;
		}
		
		// 매번 words배열을 처음부터 체크해야한다.
		for (String word : words) {
			if (!contains(words_used, word, count) && is_changeable(word, begin)) {
				// words_used의 count 인덱스에 단어를 넣어준다.
				words_used[count] = word;
				find(words, word, target, count + 1);
			}
		}
	}
	
    public int solution(String begin, String target, String[] words) {
    	boolean word_exists = false;
    	for (String word : words) {
    		if (word.equals(target)) {
    			word_exists = true;
    			break;
    		}
    	}
    	if (!word_exists)
    		return 0;
    	
    	int count = 0;
    	// 사용한 단어는 여기에 담는다. 
    	
    	find(words, begin, target, count);
    	
        return answer;
    }

	public static void main(String[] args) {
//		String begin = "hit";
//		String target = "cog";
//		String[] words = {"hot", "dot", "dog", "lot", "log", "cog"};
		
		String begin = "hit";
		String target = "hhh";
		String[] words = {"hhh", "hht"};
		
		System.out.println(new Solution().solution(begin, target, words));
	}
}
```

