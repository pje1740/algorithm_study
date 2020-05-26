## 스택: baseball

```java
import java.util.*;

class Solution {
    public int calPoints(String[] ops) {
        Stack<Integer> stack = new Stack<Integer>();
        int total = 0;
        
        for (String op : ops) {
        	if (op.equals("+")) {
        		int top = stack.pop();
        		int top_sec = stack.pop();
        		stack.push(top_sec);
        		stack.push(top);
        		stack.push(top + top_sec);
        	}
        	else if (op.equals("D")) {
        		stack.push(stack.peek() * 2);
        	}
        	else if (op.equals("C")) {
        		stack.pop();
        	}
        	else {
        		stack.push(Integer.parseInt(op));
        	}
        }
        
        while (stack.size() > 0) {
        	total += stack.pop();
        }
        
        return total;
    }
}
```



## 큐: 프린터

Priority queue를 활용한 답안. Priority queue란, 집어넣은 순서대로가 아니라, 들어간 순서와 상관없이 정렬되어 나오는 클래스이다. 즉, 3, 2, 1 순서로 들어갔다면 1, 2, 3 순서로 poll 된다. 이걸 이용하면 따로 정렬을 하지 않아도 되는 편리함이 있어 사용하는 모양. 밑에 다른 풀이처럼 sort하여도 무방하다 (배열이기 때문에). 

```java
	public int solution(int[] priorities, int location) {
		// 큐를 생성. Collections.reverseOrder()로 출력 순서를 반대로 만든다. 
		PriorityQueue<Integer> pri = new PriorityQueue<Integer>(Collections.reverseOrder());
		
		// 큐를 생성하여 우선순위를 넣어준다. poll을 하면 큰 수부터 출력되게 된다.  
		for (int p : priorities) {
			pri.add(p);
		}
		
		// 큐에서 우선순위를 큰 거부터 하나씩 빼면서 priorities 배열과 비교한다. 
		// priorities 배열은 손대지 않았기 때문에 인덱스 순서대로 확인이 가능하다. 
		// for 문을 돌면서 큐의 head와 priorities[i]를 비교하고, 동일하면 poll을 이용해서 큐에서 제거한다. 
		// i 가 끝나면 그냥 다시 루프문을 시작하면 된다. 큐가 없어질 때까지.
		// 동일해지는 순간에 i가 location과 동일값이면 return
		int answer = 1;
		
		while (pri.size() > 0) {
			for (int i = 0; i < priorities.length; i++ ) {
				if (priorities[i] == pri.peek()) {
					if (i == location)
						return answer;
					pri.poll();
					answer++;
				}
			}
		}
		return answer;
	}
```



location 변수를 줄여나가면서 푸는 다른 방법. 여기서는 큐에는 입력된 순서대로 넣고, priorities를 정렬하였다. 큐를 순서대로 체크하면서 하나를 체크할 때마다 location의 값을 줄여나가는데, 이렇게 하다가 l이 0보다 작으면 원하는 인덱스의 요소를 확인 중이라 종료된다. 

```java
class Solution {
    public int solution(int[] priorities, int location) {
        int answer = 0;
        int l = location;

        Queue<Integer> que = new LinkedList<Integer>();
        for(int i : priorities){
            que.add(i);
        }

        Arrays.sort(priorities);
        int size = priorities.length-1;

        while(!que.isEmpty()){
            Integer i = que.poll();
            if(i == priorities[size - answer]){
                answer++;
                l--;
                if(l <0)
                    break;
            }else{
                que.add(i);
                l--;
                if(l<0)
                    l=que.size()-1;
            }
        }

        return answer;
    }
}
```



### 스택: 후위 표기식

```java
package binary_dhk;
import java.util.*;

public class Main {
	
	private String change(String str) {
		Stack<Character> stack = new Stack<Character>();
		
		ArrayList<Character> changed = new ArrayList<Character>();
		
		for (int i = 0; i < str.length(); i++) {
			char ch = str.charAt(i);
			int pri = check_priority(ch);
			
			switch (ch) {
				case '+':
				case '-':
				case '*':
				case '/':
					while (!stack.isEmpty()) {
						int stack_pri = check_priority(stack.peek());
						// stack.peek가 현재 연산자보다 우선순위가 같거나 크면 앞에부터 출력.
						if (stack_pri <= pri)
							changed.add(stack.pop());
						else {
							stack.push(ch);
							break;
						}
					}
					if (stack.isEmpty()) {
						stack.push(ch);
						break;
					}
					break;
				case '(':
					stack.push(ch);
					break;
				case ')':
					while (stack.peek() != '(') {
						changed.add(stack.pop());
					}
					stack.pop();
					break;
				default:
					changed.add(ch);
			}
		}
		while (!stack.isEmpty())
			changed.add(stack.pop());
	    StringBuilder builder = new StringBuilder(changed.size());
	    for(Character ch: changed)
	    {
	        builder.append(ch);
	    }
		
		return builder.toString();
	}
	
	private int check_priority(char ch) {
		switch (ch) {
		case '-':
		case '+':
			return 1;
		case '*':
		case '/':
			return 0;
		case '(':
		case ')':
			return 2;
		}
		return -1;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		String str = stdIn.nextLine();

		System.out.println(new Main().change(str));
	}
}
```



### 큐: 기능개발

조금 지저분하게 풀어서 다시 다른 코드를 보면서 풀어봐야 할듯!

```
package queue_develop_kdh;

import java.util.*;

public class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
    	ArrayList<Integer> result = new ArrayList<Integer>();
    	Queue<Integer> que = new LinkedList<Integer>();
    	
    	for (int progress: progresses)
    	{
    		que.add(progress);
    	}

    	int total_count = 0;
    	while (!que.isEmpty())
    	{
    		Queue<Integer> que_copy = que;
    		que = new LinkedList<Integer>();
    		int size = que_copy.size();
    		for (int i = 0; i < size; i++) {
    			que.add(que_copy.poll() + speeds[i + total_count]);
    		}
    		
    		int count = 0;
    		while (!que.isEmpty() && que.peek() >= 100) {
    			que.poll();
    			count++;
    			total_count++;
    		}
    		if (count > 0)
    			result.add(count);
    	}
    	
    	int[] answer = new int[result.size()];
    	for (int j = 0; j < result.size(); j++) {
    		answer[j] = result.get(j).intValue();
    	}
    	
    	return answer;
    }
    
    public static void main(String[] args) {
		int[] progresses = {93, 30, 55};
		int[] speeds = {1, 30, 5};
		
		System.out.println(Arrays.toString(new Solution().solution(progresses, speeds)));
	}
}
```

