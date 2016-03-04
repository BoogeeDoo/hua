# Huaming

:hibiscus: Make yourself easy to pick an alibaba flavor name (aka. 花名).

> For my friend [HiccupLong](https://github.com/wxlfight) to join Mogujie.

## Installation

```sh
$ [sudo] npm install -d -g huaming
```

Or if you prefer to use it as a library.

```sh
$ npm install -d --save huaming
```

## CLI

If you installed it as a CLI in global, you may use it like this:

```sh
$ hua --help

Usage: hua [options]

Options:
-p PREFIX, --prefix PREFIX          to specify a prefix.
-s SUFFIX, --suffix SUFFIX          to specify a suffix.
-5 WUXING, --five-elements WUXING   the file elements (Wuxing) of huaming.
-c COUNT, --count COUNT             the count of huaming  [10]
-i SOURCE, --source SOURCE          the source of huaming, you can choose `dict` or `tangshi`. If you choose `tangshi`, only `count` will effected  [dict]
```

### Example

```sh
$ hua

 * 彤摸
 * 豫墀
 * 趣工
 * 倚赚
 * 愁监
 * 竿铁
 * 错页
 * 洪讲
 * 顶馥
 * 右虹
 
$ hua --prefix 龙

 * 龙幼
 * 龙巡
 * 龙躬
 * 龙仇
 * 龙锤
 * 龙镒
 * 龙拾
 * 龙央
 * 龙些
 * 龙悠

$ hua --five-elements 金水

 * 倩娥
 * 雀效
 * 黍棓
 * 姹溶
 * 馨沙
 * 宫闲
 * 裕混
 * 俗封
 * 绸娥
 * 瑞淦

$ hua -i tangshi

 * 总是 -- 李白 《子夜四时歌［秋歌］》
 * 夜送 -- 白居易 《琵琶行并序》
 * 光集 -- 马戴 《楚江怀古》
 * 今成 -- 李白 《长相思二首之二》
 * 畏蒺 -- 王维 《老将行》
 * 客愁 -- 孟浩然 《宿建德江》
 * 盈尺 -- 李白 《蜀道难》
 * 一树 -- 李商隐 《蝉》
 * 方悟 -- 王维 《西施咏》
 * 方来 -- 韦应物 《长安遇冯著》
```

## Library

If you want use `huaming` as an library, you may read this document.

### Hua

```javascript
const Hua = require("huaming");
const huaming = new Hua(options);
```

> `options` is an object that same as CLI mode.
>
> + `options.prefix`
> + `options.suffix`
> + `options["five-elements"]`
> + `options.count`

### generateOne

```javascript
let result = huaming.generateOne();

// returns only one random huaming.
```

### generate

```javascript
let results = huaming.generate();

// returns `options.count` random huaming(s).
```

### HuaTangshi

```javascript
const Hua = require("huaming");
const huaming = new Hua.Tangshi(options);
```

> `options` is an object that same as CLI mode.
>
> + `options.count`

### init

```javascript
huaming.init(function(err) {
    // do something...
});
```

### generateOne

```javascript
huaming.generateOne(function(err, hua, meta) {
    // do something...
});
```

> **Note:** You must call `init` function before using this function.

### generate

```javascript
huaming.generate(function(err, names) {
    // names -> [
    //     { name: huaming1, meta: {} }
    //     { name: huaming2, meta: {} }
    // ]
});
```

> **Note:** You must call `init` function before using this function.

## Contribution

You're welcome to make pull requests!

「雖然我覺得不怎麼可能有人會關注我」
