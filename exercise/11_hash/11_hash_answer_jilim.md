## 🤔완주하지 못한 선수

- 저번에 푼건데 저번에는 정렬로 풀어서 이번에는 해시로 풀었다.
- 근데 똑같은 구문인데 for of 돌린거는 안되고 reduce는 된다. 왜..?

```javaScript
function solution(participant, completion) {
    let arr = completion.reduce((acc, cur) => (acc[cur] = acc[cur] ? acc[cur]+1 : 1, acc), {});
    for (let x of participant) {
        if (arr[x])
            arr[x]--;
        else
            return x;
    }
}
```
