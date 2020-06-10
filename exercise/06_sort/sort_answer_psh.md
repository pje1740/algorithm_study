# 정렬: Sort Colors

```java
import java.util.*;

public class Solution {
	
	public void swap(int[] a, int i1, int i2) {
		int temp = a[i1];
		a[i1] = a[i2];
		a[i2] = temp;
	}
	
    public void sortColors(int[] nums) {
        int len = nums.length;
        
        int zero = -1;
        int two = len;
        int one = 0;
 
        while (one < two) {
        	if (nums[one] == 1) {
        		one++;
        	}
        	else if (nums[one] == 0) {
        		// 만약 0을 만난 적이 없다면 맨 앞의 1을 가리키게 된다.
        		// 0을 만났었다면 그 다음 자리 
        		zero++;
        		swap(nums, zero, one);
        		if (nums[zero] == 0)
        			one++;
        	}
        	else if (nums[one] == 2) {
        		two--;
        		swap(nums, two, one);
        	}
        }
    }
}
```

- 참고로 자바에선 swap함수를 기본적으로는 제공하지 않는 것으로 보인다. 그래서 직접 만들었는데 왜 제공하지 않는지는 잘 모르겠다. 배열 내에선 인덱스를 이용해서 교체해주면 되는데, 일반 변수에선 포인터로 호출이 불가능하다보니 메서드에서 인자로 받아서 교체한 뒤 도로 넘겨주는 작업 자체가 불가능해서 아예 만들어두질 않은 것으로 보인다.  
- 원패스는 기본적으로 꼭 for문을 돈다기보다, 배열의 모든 요소를 딱 한번씩만 확인해야 한다는 것이 조건이라고 볼 수 있다. (스왑이 있다보니 이게 엄밀히 말해서 원패스인지는 잘 모르겠지만...) 그래서 0, 1, 2의 경계가 되는 위치를 기억하면서 이동하는 것이 포인트. 
- one이 결국 중간에 위치하는 값이기 때문에, 이걸 기준으로 두고 계속 이동하면서 0을 만날 때와 2를 만날 때로 잘 나누면 된다. 내 로직에서 조심해야 하는 부분은, swap이 발생했다고 무조건 one의 인덱스를 증가시키지 않아야 한다는 점. swap이 2와 0을 교체할 수도 있기 때문에, 이렇게 되는 경우 1이 아니라서 one은 여전히 해당 인덱스에 머물러야 한다. 