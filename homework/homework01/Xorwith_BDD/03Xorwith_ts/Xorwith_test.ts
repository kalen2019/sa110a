import { expect } from 'https://deno.land/x/expect/mod.ts'
import * as _ from "../02src/Xorwith.ts";

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

Deno.test("xorwith", () => {
  let r = _.xorwith(objects, others)
  expect(r).toEqual([{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }])
})
