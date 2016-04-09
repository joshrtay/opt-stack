/**
 * Imports
 */

const extend = require('@f/extend')
const identity = require('@f/identity')
const isArray = require('@f/is-array')
const isObject = require('@f/is-object')
const isBoolean = require('@f/string-is-boolean')
const isNumber = require('@f/string-is-number')
const isFunction = require('@f/is-function')
const isString = require('@f/is-string')
const map = require('@f/map')
const omit = require('@f/omit')
const toNumber = require('@f/string-to-number')
const toBoolean = require('@f/string-to-boolean')
const Switch = require('@f/switch')
const camelCase = require('camel-case')
const minimist = require('minimist')
const path = require('path')
const fs = require('fs')

const join = path.join

/**
 * Exports
 */

var exports = module.exports = optStack
exports.opts = opts
exports.env = env
exports.packJson = packJson

/**
 * opt-stack
 */

function optStack (name, schema) {
  if (isArray(name)) {
    var stack = name
  } else if (isObject(name) && isUndefined(schema)) {
    var stack = [opts()]
    schema = name
  } else if (isObject(name)) {
    var stack = [name]
  } else {
    var stack = [packJson(name), opts()]
  }
  schema = schema || {}
  var o = extend.apply(null, [{}, schema].concat(stack))
  return map((val, key) => schema[key] ? checkType(schema, key, val) : val, o)
}

function opts () {
  return omit('_', minimist(process.argv))
}

function env (name) {
  name = name || ''

  const opts = {}
  Object.keys(process.env)
  .filter(key => {
    return key.indexOf(name) === 0
  })
  .forEach(key => {
    var val = process.env[key]
    if (isNumber(val)) val = toNumber(val)
    if (isBoolean(val)) val = toBoolean(val)
    key = key.slice(name.length)
    if (key[0] === '_') key = key.slice(1)
    key = camelCase(key)
    opts[key] = val
  })
  return opts
}

function packJson (name) {
  try {
    var content = fs.readFileSync(join(process.cwd(), 'package.json', 'utf8'))
    return JSON.parse(content)[name]
  } catch (e) {
    return {}
  }
}

function checkType (schema, key, val) {
  if (isFunction(val)) {
    throw new Error(`${key} required`)
  }
  var schemaType = isFunction(schema[key])
    ? typeof schema[key]()
    : typeof schema[key]
  var valType = typeof val
  if (schemaType !== valType) {
    throw new TypeError(`got ${valType} for "${key}"", expecting ${schemaType}`)
  }
  return val
}

function invalidType(type) {
  throw new Error(`${type} is not a valid option type`)
}
