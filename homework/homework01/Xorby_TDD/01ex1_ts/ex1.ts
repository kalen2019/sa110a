import * as _ from "../02src/Xorby.ts";

  console.log("_.xorby([[2.1, 1.2], [2.3, 3.4], Math.floor])=", _.xorby([[2.1, 1.2], [2.3, 3.4], Math.floor]))
  console.log("_.xorby([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x'])=", _.xorby([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x']))
// => [1.2, 3.4]
// => [{ 'x': 2 }]