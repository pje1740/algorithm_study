# 해시법

- 데이터를 저장할 위치(인덱스)를 간단한 연산으로 구하는 것.
- 검색 뿐만 아니라 추가, 삭제도 효율적으로 할 수 있다.

### 용어 정리

- 해시 함수 : 키 값을 가지고 해시 값을 만드는 과정. 가능한 해시 값이 치우치지 않도록 고르게 분포된 값을 만들어야 한다.
- 버킷 : 해시 테이블의 각 요소
- 충돌 : 저장할 버킷이 중복되는 현상

### 충돌에 대한 대처

- 체인법 : 같은 해시 값을 갖는 요소를 연결 리스트로 관리한다.
- 오픈 주소법 : 빈 버킷을 찾을 때까지 해시를 반복한다.

### javascript로 hash 만들기

```jsx
var MyHashMap = function() {
	this.map = {};
};
MyHashMap.prototype.put = function(key, value) {
	this.map[key] = value;
};
MyHashMap.prototype.get = function(key) {
	if (this.map[key] == null)
		return -1;
	else
		return this.map[key];
};
MyHashMap.prototype.remove = function(key) {
	this.map[key] = null;
};

// MyHashMap hashMap = new MyHashMap();
// hashMap.put(1, 1);          
// hashMap.get(1);
// hashMap.remove(2);
```
