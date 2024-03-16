/**
 * @group ut
 */
import { tool } from "../src/tool";

test("should return arg", () => {
  expect(tool("hello")).toEqual("hello");
});
