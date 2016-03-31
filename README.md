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

$ hua -i tangshi -c 20

 * 忽逢 -- 孟浩然 《清明日宴梅道士房》
 * 所偶 -- 綦毋潜 《春泛若耶溪》
 * 秦关 -- 韦应物 《夕次盱眙县》
 * 无萤 -- 李商隐 《隋宫》
 * 罗衣 -- 薛逢 《宫词》
 * 莺啼 -- 杜甫 《别房太尉墓》
 * 凝香 -- 李白 《清平调三首之二》
 * 泪不 -- 岑参 《逢入京使》
 * 上来 -- 李白 《将进酒》
 * 五马 -- 李白 《子夜四时歌》
 * 日登 -- 李颀 《古从军行》
 * 一灯 -- 钱起 《送僧归日本》
 * 暮寒 -- 祖咏 《终南望馀雪》
 * 望秋 -- 李白 《玉阶怨》
 * 景物 -- 杜甫 《哀江头》
 * 巴人 -- 王维 《送梓州李使君》
 * 人事 -- 杜甫 《野望》
 * 门今 -- 杜甫 《客至》
 * 间住 -- 刘长卿 《送上人》
 * 岂伊 -- 张九龄 《感遇四首之四》
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

### generateOne

```javascript
var result = huaming.generateOne();

// result -> 无萤
// result._meta -> { author: '李商隐', title: '隋宫' }
```

> **Note:** You must call `init` function before using this function.

### generate

```javascript
huaming.generate();

// returns `options.count` random huaming(s)
```

> **Note:** You must call `init` function before using this function.

## Contribution

You're welcome to make pull requests!

「雖然我覺得不怎麼可能有人會關注我」
