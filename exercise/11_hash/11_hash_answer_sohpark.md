# 해시: 베스트 앨범

### 다른 사람 풀이

스트림으로만 주욱 연결해서 푼 코드라는데 해독 불가...

```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Solution {
  public class Music implements Comparable<Music>{

    private int played;
    private int id;
    private String genre;

    public Music(String genre, int played, int id) {
      this.genre = genre; 
      this.played = played;
      this.id = id;
    }

    @Override
    public int compareTo(Music other) {
      if(this.played == other.played) return this.id - other.id;
      return other.played - this.played;
    }

    public String getGenre() {return genre;}
  }

  public int[] solution(String[] genres, int[] plays) {
    return IntStream.range(0, genres.length)
    .mapToObj(i -> new Music(genres[i], plays[i], i))
    .collect(Collectors.groupingBy(Music::getGenre))
    .entrySet().stream()
    .sorted((a, b) -> sum(b.getValue()) - sum(a.getValue()))
    .flatMap(x->x.getValue().stream().sorted().limit(2))
    .mapToInt(x->x.id).toArray();
  }

  private int sum(List<Music> value) {
    int answer = 0;
    for (Music music : value) {
      answer+=music.played;
    }
    return answer;
  }
}
```

### 직접 다시 구현해본 풀이

```java
package hash_album_sohpark;

import java.util.*;

public class Solution {
    public int[] solution(String[] genres, int[] plays) {
    	class Song implements Comparable<Song> {
    		int index;
    		String genre;
    		int play;
    		
    		Song (int index, String genre, int play) {
    			this.index = index;
    			this.genre = genre;
    			this.play = play;
    		}

			@Override
			public int compareTo(Song o) {
				if (this.play == o.play)
					return this.index - o.index;
				else
					return o.play - this.play;
			}
    	}
    		
		ArrayList<Song> songList = new ArrayList<Song>();
		HashMap<String, Integer> playsCount = new HashMap<String, Integer>();
		HashMap<String, Integer> twoCount = new HashMap<String, Integer>();
		ArrayList<Integer> bestAlbum = new ArrayList<Integer>();
    		
		for (int i = 0; i < genres.length; i++) {
			String g = genres[i];
			int p = plays[i];
			songList.add(new Song(i, g, p));
			if (playsCount.get(g) == null)
				playsCount.put(g, p);
			else
				playsCount.put(g, playsCount.get(g) + p);
		}
		
		Collections.sort(songList, new Comparator<Song>() {

			@Override
			public int compare(Song o1, Song o2) {
				if (o1.genre.equals(o2.genre))
					return o1.compareTo(o2);
				else
					return playsCount.get(o2.genre) - playsCount.get(o1.genre);
			}
		});
		
		for (Song song : songList) {
			if (twoCount.get(song.genre) == null) {
				twoCount.put(song.genre, 1);
				bestAlbum.add(song.index);
			}
			else {
				twoCount.put(song.genre, twoCount.get(song.genre) + 1);
				if (twoCount.get(song.genre) <= 2) {
					bestAlbum.add(song.index);
				}
			}
		}

		int[] answer = new int[bestAlbum.size()];
		int i = 0;
		for (Integer index : bestAlbum) {
			answer[i++] = index;
		}
    	
		return answer;
    }
    
    public static void main(String[] args) {
		String[] genres = {"classic", "pop", "classic", "classic", "pop"};
		int[] plays = {500, 600, 150, 800, 2500};
		
		System.out.println(Arrays.toString(new Solution().solution(genres, plays)));
	}
}
```

- string은 equals로 비교해야되는데ㅠㅠㅠㅠ 이걸 틀려서 계속 배열 길이가 잘못됐던 모양. 신기한 건 이클립스에선 멀쩡하게 답이 나온다는 사실...?



# 해시: 완주하지 못한 선수

```java
import java.util.*;
public class Solution {
    public String solution(String[] participant, String[] completion) {
    	HashMap<String, Integer> runners = new HashMap<String, Integer>();
    	
    	for (String p : participant) {
    		if (runners.get(p) != null)
    			runners.put(p,runners.get(p) + 1); 
    		else
    			runners.put(p, 1);
    	}
    	
    	for (String c : completion) {
    		if (runners.get(c) != null)
    			runners.put(c, runners.get(c) - 1);
    		else {
    			return c;
    		}
    	}
    	
    	for (Map.Entry x : runners.entrySet()) {
    		if ((int)x.getValue() == 1)
    			return (String)x.getKey();
    	}
    	
    	return "";
    }
}
```



# 해시: 위장

```java
package hash_camouflage_yujo;

import java.util.*;

public class Solution {
    public int solution(String[][] clothes) {
    	HashMap<String, Integer> wears = new HashMap<String, Integer>();
    	
    	for (String[] cloth : clothes) {
    		if (wears.get(cloth[1]) != null)
    			wears.put(cloth[1], wears.get(cloth[1]) + 1);
    		else
    			wears.put(cloth[1], 1);
    	}
    	
    	int result = 1;
    	for (Map.Entry<String, Integer> x : wears.entrySet()) {
    		result *= (int)x.getValue() + 1;
    	}
    	return result - 1;
    }
}
```



