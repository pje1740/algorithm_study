## 완전 탐색: 모의고사

```java
import java.util.*;

class Solution {
    public int[] solution(int[] answers) {
        ArrayList<Integer> ans = new ArrayList<Integer>();
        int ans_num = 0;

        int[] po1 = {1, 2, 3, 4, 5};
        int[] po2 = {2, 1, 2, 3, 2, 4, 2, 5};
        int[] po3 = {3, 3, 1, 1, 2, 2, 4, 4, 5, 5};

        int po1_ans = 0;
        int po2_ans = 0;
        int po3_ans = 0;

        for (int i = 0; i < answers.length; i++) {
            if (po1[i % po1.length] == answers[i])
                po1_ans++;
            if (po2[i % po2.length] == answers[i])
                po2_ans++;
            if (po3[i % po3.length] == answers[i])
                po3_ans++;
        }

        // find max
        int max = po1_ans;
        if (po2_ans > max) max = po2_ans;
        if (po3_ans > max) max = po3_ans;

        if (po1_ans == max)
            ans.add(1);
        if (po2_ans == max)
            ans.add(2);
        if (po3_ans == max)
            ans.add(3);

        int[] answer = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            answer[i] = ans.get(i);
        }

        return answer;
    }
}
```



## 이진 탐색: 

```java
public class BinarySearch_budget {
    public int solution(int[] budgets, int M) {
    	Arrays.sort(budgets);
    	int answer = 0;    	
    	int low = 0;
    	int high = M;
    	
    	long sum = 0;
    	for (int i : budgets)
    		sum += i;
    	
    	// 합을 구할 때 효율성2번이 걸리는 경우, 합이 int 오버플로우라고 한다.
    	// 테스트 결과 이것도 안 됨 8ㅅ8
    	if (sum <= M)
    		return budgets[budgets.length - 1];
    	else
    		while (high > low) {
    			int total = 0;
    			int mid = (high + low) / 2;
    			for (int i : budgets) {
    				if (i < mid) { total += i;}
    				else { total += mid; }
    			}
    			if (total > M) { high = mid; }
    			else if (total <= M) {
    				answer = mid; // 정답일 수도 있기 때문에 미리 저장
    				low = mid + 1; // total이 M과 동일했다면 +1을 안 하면 무한 반복을 돌게 된다. 
    			}
    		}
    	
        return answer;
    }
```

#### 해설 참조

https://blog.naver.com/occidere/221364545507

#### 풀이

예산 배열을 오름차순으로 정렬할 뒤 이진 탐색을 활용하게 된다. 최소 예산 0과 최대 예산을 M으로 잡고 ({0, 0, 0, M} 이런 형식도 있을 수 있으니) 이 둘의 평균과 하나하나 비교하게 된다. 이 평균은 이진 탐색의 원리에 의해 계속 조금씩 변경되는데 이러다보면 적정선을 찾을 수 있다. 원리는 이 평균값이 우리가 원하는 값이라고 생각하고 계산을 해보고, 그렇게 했을 때 예산이 초과하면 평균을 줄이고(최대 예산을 평균으로 변경) 예산이 남으면 평균을 늘린다(최소 예산을 평균보다 1 크게).

배열을 돌면서 평균보다 작은 값은 그 값을 그대로 total에 더하고, 평균보다 크면 평균을 total에 더한다. 이렇게 구해진 total과 M을 비교하면 된다. 