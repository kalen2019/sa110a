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