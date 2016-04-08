/**
 * Imports
 */

const extend = require('@f/extend')
const identity = require('@f/identity')
const isBoolean = require('@f/string-is-boolean')
const isNumber = require('@f/string-is-number')
const isFunction = require('@f/is-function')
const isString = require('@f/is-string')
const map = require('@f/map')
const omit = require('@f/omit')
const toNumber = require('@f/string-to-number')
const toBoolean = require('@f/string-to-boolean')
const Switch = require('@f/switch')
const minimist = require('minimist')
const {join} = require('path')
const fs = require('fs')

/**
 * Exports
 */

const exports = module.exports = optStack
exports.opts = opts
exports.env = env
exports.packJson = packJson

/**
 * opt-stack
 */

function optStack (name, schema = {}, required = true) {
  var o = extend({}, schema, packJson(name), env(name), opts())
  return map((val, key) => schema[key] ? checkType(schema, key, val) : val, o)
}

function opts () {
  return omit('_', minimist(process.argv))
}

function env (name) {
  name = name.toLowerCase()
  const opts = {}
  Object.keys(process.env)
  .filter(key => {
    return key.split('_')[0].toLowerCase() === name
  })
  .forEach(key => {
    var val = process.env[key]
    if (isNumber(val)) val = toNumber(val)
    if (isBoolean(val)) val = toBoolean(val)
    opts[key.split('_').slice(1).join('_').toLowerCase()] = val
  })
  return opts
}

function packJson (name) {
  try {
    var content = fs.readFileSync(join(process.cwd(), 'package.json'))
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
