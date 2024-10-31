# react-peggy1

[Peggy](https://peggyjs.org/)
と
[ts-pegjs](https://www.npmjs.com/package/ts-pegjs)
で
パーサをジェネレートして、React で 使ってみるテスト。Bun で TypeScript で Vite

[ts-pegjs](https://www.npmjs.com/package/ts-pegjs) は止めて、d.ts にするかも。

## ライブデモ

<https://heiwa4126.github.io/react-peggy1> (GitHub Pages)

## 開発

Vite で React で TypeScript で Bun なので普通に。
(Bun はたぶん npm でも pnpm でもいい)

```sh
bun i
bun parse:calc  # src/calc.peggy を元に lib/calcParser.ts を生成
bun dev
bun run build & bun preview
```

## メモ

生成されたパーサ(`lib/calcParser.ts`)を見ると、警告で真っ赤。
これはしょうがないのかな...

## 参考

- [PEG.js で遊ぶ](https://tars0x9752.com/posts/try-peg-js) - `src/name.peggy`と`src/names.peggy`はここからコピペさしていただきました
- [パーサーなのかパーザーなのか - osyoyu.com/blog](https://osyoyu.com/blog/2024/06/17/003916)
