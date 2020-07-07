## ⛳️ 완주하지 못한 선수

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

## ⛳️ 위장

- 공식을 아는 것이 중요 포인트.

```javaScript
function solution(clothes) {
    var answer = 1;
    let cloList = new Map();
    clothes.map(item => {
        if (!cloList.has(item[1])) {
            cloList.set(item[1], 2);
        } else {
            cloList.set(item[1], cloList.get(item[1]) + 1);
        }
    })
    cloList.forEach((value, key) => {
        answer *= value;
    })
    return answer - 1;
}
```

## ⛳️ 베스트앨범

- 너무 짜치는(?) 일이 많았다...

```javaScript
function solution(genres, plays) {
    let answer = [];
    let allList = new Map();
    genres.forEach((val, idx) => {
        if (allList.has(val)) {
            allList.set(val, allList.get(val) + plays[idx]);
        } else {
            allList.set(val, plays[idx]);
        }
    })
    let maxList = [...allList].sort((a, b) => {
        return b[1] - a[1];
    })
    let allGenre = [];
    maxList.forEach((val) => {
        let item = [];
        genres.forEach((x, idx) => {
            if (val[0] == x) {
                item.push([x, plays[idx], idx]);
            }
        });
        allGenre.push(item);
    })
    allGenre.forEach((val) => {
        val.sort((a, b) => b[1] - a[1]);
        for (let i = 0; i < 2; i++) {
            if (val[i]) {
                answer.push(val[i][2]);
            }
        }
    })
    return answer;
}
```
