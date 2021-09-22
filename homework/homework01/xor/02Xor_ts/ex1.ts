import * as _ from './xor.ts'

console.log(" _.xor([1, 3], [2, 3])=",  _.xor([[1, 3], [2, 3]]))
// => [1, 2]
 
console.log(" _.xor([2, 2], [2, 3])=",  _.xor([[2, 2], [2, 3]]))
// => [1, 3]
console.log(" _.xor([2, 2], [2, 3], [1, 2])=",  _.xor([[2, 2], [2, 3], [1, 2]]))
// => [1, 3]
console.log(" _.xor([2, 2, 2], [2, 3, 1])=",  _.xor([[2, 2, 2], [2, 3, 1]]))
// => [1, 3]
