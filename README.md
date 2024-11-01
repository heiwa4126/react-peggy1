# react-peggy1

[Peggy](https://peggyjs.org/)
と
[ts-pegjs](https://www.npmjs.com/package/ts-pegjs)
で [PEG](https://en.wikipedia.org/wiki/Parsing_expression_grammar) (Parsing Expression Grammar) 書いて、
パーサをジェネレートして、React で 使ってみるテスト。

Bun で TypeScript で Vite

## ライブデモ

<https://heiwa4126.github.io/react-peggy1> (GitHub Pages)

## ts-pegjs は止めた

ECMAScript(.mjs) と d.ts にした。(& sourcemap)

```sh
peggy --format es -m --dts -o lib/foo.mjs peg/foo.peggy
```

ただ TypeScript(.ts) で出す設定は
package.json の run-scripts の `parser:names:ts` などに残しておく
(plugin オプションの設定が奇妙だから)。

拡張子を .mjs にしてるのは、
上のディレクトリの package.json で CommonJS が指定されてても行けるように。

## 開発

Vite で React で TypeScript で Bun なので普通に。
(Bun はたぶん npm でも pnpm でもいい)

```sh
bun i
bun parse:calc   # peg/calc.peggy を元に lib/calcParser.mjs と d.ts と .mapを生成
bun parse:names  # peg/names.peggy を元に lib/calcParser.mjs  と d.ts と .mapを生成
bun dev
bun run build & bun preview
```

## メモ

生成されたパーサ(`lib/calcParser.ts`)を見ると、警告で真っ赤。
これはしょうがないのかな...

## 参考

- [Generating a Parser](https://peggyjs.org/documentation.html#generating-a-parser)
- [PEG.js で遊ぶ](https://tars0x9752.com/posts/try-peg-js) - `src/name.peggy`と`src/names.peggy`はここからコピペさしていただきました
- [パーサーなのかパーザーなのか - osyoyu.com/blog](https://osyoyu.com/blog/2024/06/17/003916)
