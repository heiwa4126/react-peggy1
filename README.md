# react-peggy1

[Peggy](https://peggyjs.org/)
と
[ts-pegjs](https://www.npmjs.com/package/ts-pegjs)
で
パーサをジェネレートして、React で 使ってみるテスト。Bun で TypeScript で Vite

## ライブデモ

<https://heiwa4126.github.io/react-peggy1> (GitHub Pages)

## 開発

Vite で React で TypeScript + Bun なので普通に。
(たぶん npm でも pnpm でもなんでもいい)

```sh
bun i
bun parse:calc  # src/calc.peggy を元に lib/calcParser.ts を生成
bun dev
bun run build & bun preview
```
