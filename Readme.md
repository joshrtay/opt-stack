
# opt-stack

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Get options from a stack of sources ... cli, env, package, defaults.

## Installation

    $ npm install opt-stack

## Usage

```js
var optStack = require('opt-stack')

// WOOT_FOO=env node cli --foo=cli
optStack('woot', {foo: 'bar'}) // => {foo: 'cli'}
```

## API

### optStack(name, defaults)

- `name` - name is use for env prefix and packageJson field
- `defaults` - default options

**Returns:** options

## License

MIT

[travis-image]: https://img.shields.io/travis/joshrtay/opt-stack.svg?style=flat-square
[travis-url]: https://travis-ci.org/joshrtay/opt-stack
[git-image]: https://img.shields.io/github/tag/joshrtay/opt-stack.svg
[git-url]: https://github.com/joshrtay/opt-stack
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/opt-stack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/opt-stack
