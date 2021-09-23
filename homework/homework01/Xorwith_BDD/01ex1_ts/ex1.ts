import * as _ from "../02src/Xorwith.ts";

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

console.log("_.xorwith(objects, others)=", _.xorwith(objects, others))
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]