# 期中報告
## 普林演算法
* 是產生最小生成樹的演算法之一
* 屬於貪婪演算法
* * 貪婪演算法:是一種在每一個步驟都做最佳選取的過程
> 以上參考"離散數學 第七版" page:667 :東華書局

> 以下複製:[Spanning Tree](http://web.ntnu.edu.tw/~algo/SpanningTree.html#3)
> 程式碼完全複製，只對部分修改以因應編譯器
> 原程式碼作註解保留

> 參考 [c語言中有自己的bool型別](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/90337/)
```
int adj[9][9];  // adjacency matrix
int d[9];       // 記錄目前的MST到圖上各點的距離
int parent[9];  // 記錄各個點在MST上的父親是誰
// bool visit[9];  記錄各個點是不是已在MST之中
_Bool visit[9];  // 在此處對bool做修改 不然會抱錯
void prim()
{    
    // for (int i=0; i<9; i++) visit[i] = false; 
    for (int i=0; i<9; i++) visit[i] = 0; //在_Bool 中無false作為否定
    for (int i=0; i<9; i++) d[i] = 1e9;
 
    // 選擇任意一點作為樹根。此處選擇第零點作為樹根。
    d[0] = 0;
    parent[0] = 0;
 
    for (int i=0; i<9; i++)
    {
        // 找不在樹上、離樹最近的點。
        int a = -1, b = -1, min = 1e9;
        for (int j=0; j<9; j++)
            if (!visit[j] && d[j] < min)
            {
                a = j;  // 持續記錄最近的點
                min = d[j];
            }
 
        // 從起點可連通的點已經找完
        if (a == -1) break;
        // visit[a] = true;
        visit[a] = 1; //在_Bool 中無true作為肯定
 
        // relaxation
        // 此處與Dijkstra's Algorithm不同
        // 離樹最近，不是離根最近。
        for (b=0; b<9; b++)
            if  (!visit[b] && adj[a][b] < d[b])
            {
                d[b] = adj[a][b];
                parent[b] = a;
            }
    }
}
```
* 以上透過隨機順序生成0~9總共10個節點，並將相鄰的節點設上路徑與距離，最後由0節點開始，每一次都選擇最短路徑，直到把所有路徑連通為止，即生成最小生成樹。

## 特點
* 此演算法可以算出最節省成本的路徑方式，成本可以是時間、金錢等，也可以將多項成本都加入權重去做比較。
* 缺點是如果出現權重相同，則最小路徑就會不只一種。
* 在應用層面上，像網路線路節點設計、電纜線節點設計或者是送貨員要送貨的路徑設計等，可以參考這演算法，不過權重(成本)的設計會影響實際結果，導致實際應用時並非如此理想，但也大致解決的許多問題。

## 參考資料

[普林演算法](https://zh.wikipedia.org/wiki/%E6%99%AE%E6%9E%97%E5%A7%86%E7%AE%97%E6%B3%95#C%E8%AF%AD%E8%A8%80%E4%BB%A3%E7%A0%81)

[c語言中有自己的bool型別](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/90337/)

[Spanning Tree](http://web.ntnu.edu.tw/~algo/SpanningTree.html#3)
