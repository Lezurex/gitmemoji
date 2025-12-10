# gitmem🤓ji

Gitmemoji is a quiz game for learning [gitmoji](https://gitmoji.dev/).

This project is originally forked from [lalalilo/gitmemoji](https://github.com/lalalilo/gitmemoji).

## ⚙️ Setup

Install the dependencies and finally run the app by executing these commands in
the project directory. Make sure you have [Bun](https://bun.sh/) installed.

```bash
bun install
bun start
```

To run the tests, run `bun test`. Add `--watch` to keep them running.

```bash
bun test
bun test --watch
```

## ➕ Adding new gitmojis

Gitmojis are automatically fetched from the `gitmoji` package. Colors are not
included there. Therefore, we have the file in `src/emoji-colors.ts`, which
stores the background colors of the tiles. This list can be copied from the
[gitmoji repo](https://github.com/carloscuesta/gitmoji/blob/master/packages/website/src/components/GitmojiList/emojiColorsMap.ts).

## 👥 Contributing

Contributions are welcome! Request features or report bugs by opening an issue
or submit code changes by forking the repo and opening a pull request.
