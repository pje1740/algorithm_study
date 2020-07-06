### Flip Columns For Maximum Number of Equal Rows

```c++
#include <vector>
#include <map>
#include <iostream>
using namespace std;

class Solution {
public:
    static bool    cmp(pair<vector<int>, int> &a, pair<vector<int>, int> &b)
    {
        return a.second > b.second;
    }
    void    flipRow(vector<int> &row)
    {
        for (auto &t : row)
            t = (t + 1) % 2;
    }
    int maxEqualRowsAfterFlips(vector<vector<int>>& matrix) {
        map<vector<int>, int> m;
        vector<pair<vector<int>, int>> temp;
        for (auto &t : matrix)
        {
            if (t[0] != 0)
                flipRow(t);
            if (m.find(t) == m.end())
                m.insert(make_pair(t, 1));
            else
                m[t] += 1;
        }
        for (auto &t : m)
            temp.push_back(t);
        sort(temp.begin(), temp.end(), cmp);
        return temp[0].second;
    }
};
```
