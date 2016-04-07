/**
 * Imports
 */

const test = require('tape')
const optStack = require('../src')

const {env, opts, packJson} = optStack


/**
 * Tests
 */

test('should get package json', (t) => {
  t.deepEqual(Object.keys(packJson('dependencies')), ['@f/extend', '@f/omit', 'minimist'])
  t.end()
})

test('should get env', (t) => {
  process.env['FOO_BAR'] = 'bar'
  t.deepEqual(env('foo'), {bar: 'bar'})
  t.end()
})

test('should get opts', (t) => {
  process.argv = ['node', 'foo', '--bar=bar']
  t.deepEqual(opts(), {bar: 'bar'})
  t.end()
})

test('should get whole stack', (t) => {
  process.env['TEST_ENV'] = 'foo'
  process.argv = ['node', 'foo', '--cli=foo']
  t.deepEqual(optStack('test'), {'env': 'foo', 'cli': 'foo', 'pkg': 'foo'})
  t.end()
})
