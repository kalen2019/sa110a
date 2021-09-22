// _.xor([1, 3], [2, 3]); => [1, 2]
// _.xor([2, 1], [2, 3]); => [1, 3]
// _.xor([2, 2], [2, 3], [1, 2]) => [1, 3]
// _.xor([2, 2, 2], [2, 3, 1]) => [1, 3]
export function xor(array) {
    var result = [];
    var memory = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++){
            if(memory.indexOf(array[i][j]) == -1){
                result.push(array[i][j]);  //轉成1維陣列
                memory.push(array[i][j]);  //紀錄數字
            }
            else {
                if(result.indexOf(array[i][j]) == -1) {             //判斷是否已移除過
                    var a = 0;
                }
                else {
                    a = 1;
                }
                result.splice(result.indexOf(array[i][j]),a);    //移除重複出現的數字
            }
        }
    }
    result.sort(function(a, b){     
        return a-b;
    });         //重新小到大排列
    return result
}
