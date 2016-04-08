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
  t.deepEqual(Object.keys(packJson('test')), ['pkg'])
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

test('should coerce opts', (t) => {
  process.env['TEST_ENV'] = '2'
  t.deepEqual(env('test'), {env: 2})
  t.end()
})

test('should require vals', (t) => {
  t.throws(_ => {
    optStack('test', {woot: String})
  }, Error)
  t.end()
})

test('should check type', (t) => {
  process.env['TEST_WOOT'] = '2'
  t.throws(_ => {
    optStack('test', {woot: String})
  }, TypeError)
  t.end()
})
