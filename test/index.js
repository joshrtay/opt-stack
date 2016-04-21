/**
 * Imports
 */

const test = require('tape')
const optStack = require('..')

const env = optStack.env
const opts = optStack.opts
const packJson = optStack.packJson


/**
 * Tests
 */

test('should get package json', (t) => {
  t.deepEqual(Object.keys(packJson('test')), ['pkg'])
  t.end()
})

test('should get env', (t) => {
  process.env['FOO_BAR'] = 'bar'
  t.deepEqual(env('FOO'), {bar: 'bar'})
  t.end()
})

test('should get opts', (t) => {
  process.argv = ['node', 'foo', '--bar=bar']
  t.deepEqual(opts(), {bar: 'bar'})
  t.end()
})

test('should get default stack', (t) => {
  process.argv = ['node', 'foo', '--cli=foo']
  t.deepEqual(optStack('test'), {'cli': 'foo', 'pkg': 'foo'})
  t.end()
})

test('should coerce opts', (t) => {
  process.env['TEST_ENV'] = '2'
  t.deepEqual(env('TEST'), {env: 2})
  t.end()
})

test('should require vals', (t) => {
  t.throws(_ => {
    optStack('test', {woot: String})
  }, Error)
  t.end()
})

test('should require vals', (t) => {
  t.throws(_ => {
    optStack({foo: 'bar'}, {woot: String})
  }, Error)
  t.end()
})

test('should check type', (t) => {
  process.argv = ['node', 'foo', '--woot=2']
  t.throws(_ => {
    optStack('test', {woot: String})
  }, TypeError)
  t.end()
})
