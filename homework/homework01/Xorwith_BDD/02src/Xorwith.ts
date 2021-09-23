// _.xorwith(objects, others)) => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
export function xorwith(objects:any[], others:any[]) {
    var result = [];
    for(var i = 0;i<others.length;i++){
        for(var j = 0;j<objects.length;j++){
            if(equal(objects[j].x,others[i].x)&&equal(objects[j].y,others[i].y)){
                objects.splice(j,1);
                others.splice(i,1);
            }
        }
    }
    result = objects.concat(others);
    return result;
}
export function equal(a:any, b:any){
    if(a==b) return true;
    else{
        return false;
    }
}