
# opt-stack

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Get options from a stack of sources ... cli, env, package, defaults.

## Features

* Pull options `name` prefixed environment variables
* Pull options form `name` field in package.json
* Pull options from cli
* Coerce strings into numbers and booleans
* Supports default values
* Specify required options

## Installation

    $ npm install opt-stack

## Usage

```js
var optStack = require('opt-stack')

// WOOT_FOO=env node cli --foo=cli
optStack('woot', {foo: 'bar'}) // => {foo: 'cli'}
optStack('woot', {qux: String}) // => throw new Error('qux required')
optStack('woot', {foo: 1}) // => throw new TypeError('got string for "foo", expecting number')
```

## API

### optStack(name, schema)

- `name` - name is use for env prefix and packageJson field
- `schema` - psuedo schema, if val its a default value, if type its a required field

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
