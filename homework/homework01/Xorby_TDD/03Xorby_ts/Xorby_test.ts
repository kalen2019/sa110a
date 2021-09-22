import { assertEquals } from "https://deno.land/std@0.63.0/testing/asserts.ts";
import * as _ from "../02src/Xorby.ts";

Deno.test("xorby", () => {
  assertEquals(_.xorby([[2.1, 1.2], [2.3, 3.4], Math.floor]), [1.2, 3.4])
  assertEquals(_.xorby([[{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x']), [{ 'x': 2 }])

})