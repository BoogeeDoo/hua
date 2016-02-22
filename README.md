# Huaming

Make you easy to name a alibaba hua-name.

> For my friend [HiccupLong](https://github.com/wxlfight) to Mogujie.

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
```

## Library

If you want use `huaming` as an library, you may read this document.

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

## Contribution

You're welcome to make pull requests!

「雖然我覺得不怎麼可能有人會關注我」
