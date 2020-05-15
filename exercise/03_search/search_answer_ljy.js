var floor = n => Math.floor(n);

function solution(n, times) {
    //  정렬
    times.sort((a, b) => {
        return a - b;
    });
    // 최솟값은 1, 최댓값은 모든 사람이 제일 느린 심사관에게 심사 받는 경우.
    var left = 1;
    var right =  times[times.length - 1] * n;
    var answer = right;
    while (left <= right) {
        var mid = floor((left + right) / 2);
        var sum = times.reduce((acc, cur) => {
            acc += floor(mid/cur);
            return acc;
        }, 0);
        // var sum = 0;
        // times.forEach(x => {
        //     sum += floor(mid/x);
        // })
        if (sum < n) 
            left = mid + 1;
        else {
            if (answer > mid)
                answer = mid;
            right = mid - 1;
        }
    }
    return answer;
}
