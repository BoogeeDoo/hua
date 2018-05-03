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

  Usage: hua <command>


  Commands:

    char        generate `hua` from characters
    dict        generate `hua` from a specified dictionary
    help [cmd]  display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

$ hua char --help

  Usage: hua-char [options]

  Options:

    -h, --help                output usage information
    -p, --prefix <prefix>     specify a `huaming` prefix
    -s, --suffix <suffix>     specify a `huaming` suffix
    -5, --five-elements <wx>  the five elements (Wuxing) of `huaming`
    -c, --count <count>       the count of `huaming`

$ hua dict --help

  Usage: hua-dict [options]

  Options:

    -h, --help                output usage information
    -s, --source <name|path>  specify a `huaming` dictionary, `tangshi`, `shijing`, `chuci`, `songci` or a path
    -c, --count <count>       the count of `huaming`
```

### Example

```sh
$ hua char

 * 瑚阜
 * 督仓
 * 淞委
 * 肠眇
 * 艳惜
 * 翎融
 * 蜜鸳
 * 钰佣
 * 住丹
 * 况始

$ hua char --prefix 龙

 * 龙盘
 * 龙穰
 * 龙棚
 * 龙疑
 * 龙结
 * 龙荃
 * 龙堂
 * 龙贻
 * 龙聊
 * 龙凯

$ hua char --five-elements 金水

 * 入没
 * 夙微
 * 甯包
 * 措溪
 * 赦风
 * 倩步
 * 镁恒
 * 始绵
 * 孜清
 * 窗讹

$ hua dict -s tangshi -c 20

 * 野幕 -- 卢纶 《塞下曲四首之四》
 * 朝朝 -- 孟浩然 《留别王侍御维》
 * 禅寂 -- 钱起 《送僧归日本》
 * 秦地 -- 李白 《子夜四时歌》
 * 飞高 -- 卢纶 《塞下曲四首之三》
 * 鼓鼙 -- 卢纶 《晚次鄂州》
 * 秋来 -- 僧皎然 《寻陆鸿渐不遇》
 * 夕阳 -- 孟浩然 《宿业师山房待丁大不至》
 * 鸟惊 -- 杜甫 《春望》
 * 晚来 -- 韦应物 《滁州西涧》
 * 已春 -- 韦应物 《长安遇冯著》
 * 堪折 -- 杜秋娘 《金缕衣》
 * 物守 -- 韩愈 《石鼓歌》
 * 请奏 -- 李颀 《琴歌》
 * 生晓 -- 李商隐 《锦瑟》
 * 误妾 -- 李益 《江南曲》
 * 帚平 -- 王昌龄 《长信怨》
 * 归山 -- 裴迪 《送崔九》
 * 野寺 -- 刘长卿 《秋日登吴公台上寺远眺》
 * 宫妃 -- 王维 《西施咏》

$ hua dict -s songci -c 20

 * 初明 -- 晁补之 《浣溪沙（广陵被召留别）》
 * 空锁 -- 邵 博 《念奴娇》
 * 幽寻 -- 吕渭老 《如梦令》
 * 经渭 -- 曹 勋 《竹马子（柳）》
 * 紧离 -- 苏 轼 《江神子（冬景）》
 * 晴风 -- 周邦彦 《一寸金（小石江路）》
 * 娇后 -- 苏 轼 《鹧鸪天（陈公密出侍儿素娘，歌紫玉箫曲，劝老人酒。老人饮尽因为赋此词）》
 * 食清 -- 卢祖皋 《西江月》
 * 把破 -- 刘克庄 《贺新郎（九日）》
 * 欲与 -- 刘辰翁 《摸鱼儿（甲午送春）》
 * 看罗 -- 卢 炳 《念奴娇》
 * 南极 -- 卫宗武 《金缕曲（寿南塘八月生朝）》
 * 潮生 -- 陈 著 《如梦令（舟泊咸池）》
 * 花稀 -- 晏几道 《更漏子》
 * 亭别 -- 晏 殊 《踏莎行》
 * 绿鞍 -- 利 登 《菩萨蛮》
 * 燕子 -- 张 榘 《浪淘沙（再和）》
 * 斜映 -- 王安中 《浣溪沙（柳州作）》
 * 劳碌 -- 秦 观 《石州慢（九日）》
 * 暗香 -- 刘 镇 《清平乐（赵围避暑）》
```

## Library

If you want use `huaming` as an library, you may read this document.

### HuaChar

```javascript
const Hua = require("huaming").HuaChar;
const huaming = new Hua(options);
```

> `options` is an object that same as CLI mode.
>
> + `options.prefix`
> + `options.suffix`
> + `options.fiveElements`
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

### HuaSource

```javascript
const Hua = require("huaming").HuaSource;
const huaming = new Hua(options);
```

> `options` is an object that same as CLI mode.
>
> + `options.count`
> + `options.source`: it can be `"tangshi"`, `"shijing"`, `"chuci"`, `"songci"`, a JSON module, or even a dictionary path

### generateOne

```javascript
var result = huaming.generateOne();

// result -> 无萤
// result._meta -> { author: '李商隐', title: '隋宫' }
```

### generate

```javascript
huaming.generate();

// returns `options.count` random huaming(s)
```

> **Note:** You must call `init` function before using this function.

## Contribution

You're welcome to make pull requests!

Thanks to:

- [Biangbiang](https://github.com/biangbiang)
- [lisposter](https://github.com/lisposter)
- [sallen450](https://github.com/sallen450)

「雖然我覺得不怎麼可能有人會關注我」
