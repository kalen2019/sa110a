// _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor) => [1.2, 3.4]
// _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x')  => [{ 'x': 2 }]

export function xorby(arrays:any[]) {
    var result = [];
    var memory = [];
    var iteratee = arrays.pop();
    var typ =String(typeof iteratee);
    console.log(typ);
    if(typ == "object"&&"xml"&&"undefined"){
        iteratee = undefined
    }
    else if(typ == "string"){
            var x = iteratee;
            for(var i=0;i<arrays.length;i++){
                for(var j=0;j<arrays[i].length;j++){
                    if(memory.indexOf(arrays[i][j].x) == -1){
                        memory.push(arrays[i][j].x);
                        result.push(arrays[i][j]);
                    }
                    else{
                        for(var k = 0;k<result.length;k++){
                            if(result[k].x == arrays[i][j].x){
                            result.splice(k,1);
                            }
                        }
                    }
                }
            }
        }
    else if(typ == "function"){
            var fuc = iteratee;
            for(var i=0;i<arrays.length;i++){
                for(var j=0;j<arrays[i].length;j++){
                    if(memory.indexOf(fuc(arrays[i][j])) == -1){
                        memory.push(fuc(arrays[i][j]));
                        result.push(arrays[i][j]);
                    }
                    else{
                        for(var k=0;k<result.length;k++){
                            if(fuc(result[k]) == fuc(arrays[i][j])){
                                result.splice(k,1);
                            }
                        }
                    }
                }
            }
        }
    else{
        for (var i = 0; i < arrays.length; i++) {
            for (var j = 0; j < arrays[i].length; j++){
                if(memory.indexOf(arrays[i][j]) == -1){
                    result.push(arrays[i][j]);
                    memory.push(arrays[i][j]);
                }
                else {
                    for(var k=0;k<result.length;k++){
                        if(result[k] == arrays[i][j]){
                            result.splice(k,1);
                        }
                    }
                }
            }
        }
        result.sort(function(a, b){     
            return a-b;
        }); 
    }
    return result;
}
