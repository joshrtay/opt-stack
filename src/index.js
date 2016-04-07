/**
 * Imports
 */

const extend = require('@f/extend')
const omit = require('@f/omit')
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

function optStack (name, defaults = {}) {
  return extend(defaults, packJson(name), env(name), opts())
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
    opts[key.split('_').slice(1).join('_').toLowerCase()] = process.env[key]
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
