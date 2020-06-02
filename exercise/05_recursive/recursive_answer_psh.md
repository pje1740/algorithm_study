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

따지고보면 단순한 문제였는데 재귀문 진입 전에 값을 대입시켜버리는 것 때문에 많이 꼬였었다. 또, 단어가 꼭 3글자가 아님에도 처음에 is_changeable에 문자가 2개가 같을 경우로 설정하는 바람에 테스트케이스 3, 4번이 자꾸 틀렸다고 나왔다. 



# 괄호변환

```java
import java.util.*;
public class Solution {
	String result = "";
	
	public boolean is_ordered(Queue<Character> que) {
		int left_count = 0;
		int right_count = 0;
		
		while (!que.isEmpty()) {
			Character temp = que.poll();
			if (temp == ')')
				right_count++;
			else if (temp == '(')
				left_count++;
			
			if (right_count > left_count)
				return false;
		}
		return true;
	}
	
    public String solution(String p) {
    	if (p.equals(""))
    		return result;

    	Queue<Character> que = new LinkedList<Character>();
    	
    	int left_count = 0;
    	int right_count = 0;
    	
    	int i = 0;
    	for (; i < p.length(); i++) {
    		if (p.charAt(i) == '(')
    			left_count++;
    		else
    			right_count++;
    		que.add(p.charAt(i));
    		if (left_count == right_count)
    			break;
    	}
    	// i까지가 u라서 i+1부터가 v
    	i++;
    	
    	if (is_ordered(que)) {
    		result += p.substring(0, i);
    		return solution(p.substring(i));
    	}
    	else {
    		result += "(";
    		solution(p.substring(i));
    		result += ")";
    		String new_u = p.substring(1, i - 1);
    		for (int j = 0; j < new_u.length(); j++) {
    			if (new_u.charAt(j) == '(')
    				result += ")";
    			else if (new_u.charAt(j) == ')')
    				result += "(";
    		}
    		return result;
    	}
    }
```



# Power of Three

```java
public class Solution {
	
    public boolean isPowerOfThree(int n) {
    	if (n == 1)
    		return true;
    	if (n % 3 != 0 || n <= 0)
        	return false;
    	return isPowerOfThree(n / 3);
    }
	
	public static void main(String[] args) {
		System.out.println(new Solution().isPowerOfThree(0));
	}
}
```



# Z

```java
import java.util.*;

public class Main {
	static int count = 0;
	static boolean is_found = false;

	public void find(int n, int row, int col, int[] answer) {
		if (is_found)
			return;
		if (n == 1) {
			if (answer[0] == 0 && answer[1] == 0) {
				count = count + 0;
				is_found = true;
				return;
			}
			else if (answer[0] == 0 && answer[1] == 1) {
				count = count + 1;
				is_found = true;
				return;
			}
			else if (answer[0] == 1 && answer[1] == 0) {
				count = count + 2;
				is_found = true;
				return;
			}
			else if (answer[0] == 1 && answer[1] == 1) {
				count = count + 3;
				is_found = true;
				return;
			}
		}
		else {
			int divider = (int) Math.pow(2, n - 1);
			int block_size = (int) Math.pow(divider, 2);
			int new_row = ((int)(answer[0] / divider));
			int new_col = ((int)(answer[1] / divider));
			
			if (new_row == 0 && new_col == 1)
				count = count + block_size;
			else if (new_row == 1 && new_col == 0)
				count = count + block_size * 2;
			else if (new_row == 1 && new_col == 1)
				count = count + block_size * 3;
			
			answer[0] -= new_row * divider;
			answer[1] -= new_col * divider;
			find(n - 1, new_row * divider, new_col * divider, answer);
		}
	}
	
	public static void main(String[] args) {
		Scanner stdin = new Scanner(System.in);
		int n = stdin.nextInt();
		int[] answer = new int[2];
		
		for (int i = 0; i < 2; i++) {
			answer[i] = stdin.nextInt();
		}
		
		Main ans = new Main();
		ans.find(n, 0, 0, answer);
		
		System.out.println(ans.count);
	}
}
```

