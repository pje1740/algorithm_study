# 리스트: Remove Zero Sum Cosecutive Nodes

```java
class Solution {
    public ListNode removeZeroSumSublists(ListNode head) {
//        boolean head_moved = false;
        // boolean 대신 그냥 더미 헤드를 만든다
        ListNode dummy_head = new ListNode(0);
        dummy_head.next = head;
        // 반복문 돌 때마다 시작되는 지점. 헤드는 아니다.
        ListNode curr = dummy_head;
        // 만약 끝까지 가도 합이 0이 안 나오면 계속 리스트를 하나씩 뒤로 가면서 시작점을 바꿀 것.
        // 합이 0이 되면 임시 시작점의 next를 0이 된 시점의 노드 다음 것으로 교체
        // 리스트는 늘 끝까지 다 확인한다.
        while (curr != null) {
            int sum = 0;
            while (head != null) {
                sum += head.val;
                if (sum == 0) {
                    curr.next = head.next;
                }
                head = head.next;
            }
            // 헤드는 dummy_head가 기록중이기 때문에 curr을 하나 뒤로 이동한다.
            curr = curr.next;
            // 만약 curr이 마지막 노드가 아니었다면 나머지 부분도 루프를 마저 돌아야함.
            if (curr != null){
                // curr이 아닌 이유는, 남은 뒷부분이 당연히 0이 되는 부분이 없기 때문에 앞에 하나를 빼고 다시 돌기 위함이다.
                head = curr.next;
            }
        }
        return dummy_head.next;
    }
}
```

- 자꾸 curr과 curr.next 를 혼동하면서 엄청난 삽질...
- 인스턴스는 참조값이기 때문에 복제가 아니라 참조의 복제라는 점! 그리고 currd은 작업하기 위한 노드의 참조값을 매번 덮어쓴다. 그래서 시작할 땐 dummy_head와 같지만 그 이후엔 아니다. 이 부분을 또 혼동하면서 무한 삽질....



# duplicates

```java
public class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode result = head;
        while (head != null && head.next != null) {
            if (head.val == head.next.val) {
                head.next = head.next.next;
            }
            else {
                head = head.next;
            }
        }
        return result;
    }
}
```

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        // 숫자가 바뀔 때마다 그 전 노드를 저장하는 변수가 하나 있어야 할듯?
        // 그래서 바뀐 다음, 걔를 또 비교하면서 뒤에랑 같으면 안 같은 거 나올 때까지 드랍
        // 다른 걸 만나면 그거랑 아까 저장해둔 애를 이어준다.
        if (head == null)
            return head;
        ListNode dummy_head = new ListNode(head.val - 1);
        dummy_head.next = head;
        ListNode curr = dummy_head;
        ListNode temp = dummy_head;

        while (curr != null && curr.next != null){
            if (curr.val == curr.next.val) {
                int value = curr.val;
                while (curr != null && curr.val == value) {
                    curr = curr.next;
                }
                temp.next = curr;
            }
            else if (curr.val != curr.next.val) {
                // 직전 값. 얘는 무조건 distinct해야함.
                temp = curr;
                curr = curr.next;
            }
        }

        return dummy_head.next;
    }
}
```



# 키로거

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner stdin = new Scanner(System.in);
        int num = stdin.nextInt();
        for (int i = 0; i < num; i++){
            String input = stdin.next();
            LinkedList<Character> password = new LinkedList<Character>();
            int curr = 0;
            for (int j = 0; j < input.length(); j++){
                Character ch = input.charAt(j);
                if (ch == '<') {
                    if (curr > 0) curr--;
                }
                else if (ch == '>') {
                    if (curr < password.size())	curr++;
                }
                else if (ch == '-'){
                	if (curr > 0) {
                		password.remove(curr - 1);
                		curr--;
                	}
                }
                else {
            		password.add(curr, ch);                		
                    curr++;
                }
            }
            StringBuilder result = new StringBuilder();
            for (char c : password) {
            	result.append(c);
            }
            System.out.println(result);
        }
    }
}
```

- 결국 타임아웃...
- 스택 두개로 구현하면 된다고 한다. 아니면 직접 노드 클래스를 만드는 것도 방법

https://ukyonge.tistory.com/79