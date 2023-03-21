# gitmemoji

This project is originally forked from [lalalilo/gitmemoji](https://github.com/lalalilo/gitmemoji).

## Setup

Install the dependencies and finally run the app by executing these commands in the project directory.
Make sure you are using Node.js 16.

```bash
yarn
yarn start
```

## Adding new gitmoji

Gitmoji data is stored in `src/emojis.json`. The current collection of gitmoji can
be found on their [website](https://gitmoji.dev/). Gitmoji are also stored as an HTML entity.
The unicode codes can be found on the official [Unicode website](https://unicode.org/emoji/charts/full-emoji-list.html).

Additionally, colors are stored in `src/emoji-colors.ts`. These reference the gitmoji by name. The color
is taken directly from the gitmoji website.
