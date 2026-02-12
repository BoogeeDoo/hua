import assert from "assert";
const { HuaSource } = require("..");

const tangshi = new HuaSource({ source: "tangshi" });
const result: any = tangshi.generateOne();

assert.strictEqual(result.toString().length, 2, "应生成两个字作为名片");
assert.ok(result._meta && result._meta.author && result._meta.title, "应包含作者与标题元信息");

console.log(`${result} -- ${result._meta.author} 《${result._meta.title}》`);
