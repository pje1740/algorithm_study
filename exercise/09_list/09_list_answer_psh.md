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