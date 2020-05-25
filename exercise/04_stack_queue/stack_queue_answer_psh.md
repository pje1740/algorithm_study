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

