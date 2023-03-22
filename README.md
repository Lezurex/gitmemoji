# gitmemoji

This project is originally forked from [lalalilo/gitmemoji](https://github.com/lalalilo/gitmemoji).

## Setup

Install the dependencies and finally run the app by executing these commands in the project directory.
Make sure you are using Node.js 18.

```bash
# Optional: nvm use
yarn
yarn start
```

## Adding new gitmojis

Gitmojis are automatically fetched from the `gitmoji` package. Colors are not included there.
Therefore, we have the file in `src/emoji-colors.ts`, which stores the background colors
of the tiles. This list can be copied from the [gitmoji repo](https://github.com/carloscuesta/gitmoji/blob/master/packages/website/src/components/GitmojiList/emojiColorsMap.ts).
